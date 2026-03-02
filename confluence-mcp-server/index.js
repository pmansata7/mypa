#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const CONFLUENCE_HOST = process.env.CONFLUENCE_HOST;
const CONFLUENCE_PAT = process.env.CONFLUENCE_PAT;

if (!CONFLUENCE_HOST || !CONFLUENCE_PAT) {
  console.error("Missing required environment variables: CONFLUENCE_HOST, CONFLUENCE_PAT");
  process.exit(1);
}

const BASE_URL = CONFLUENCE_HOST.replace(/\/$/, "");

async function confluenceRequest(endpoint) {
  const url = endpoint.startsWith("http") ? endpoint : `${BASE_URL}/rest/api${endpoint}`;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${CONFLUENCE_PAT}`,
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Confluence API error (${response.status}): ${errorText}`);
  }

  return response.json();
}

function stripHtml(html) {
  if (!html) return "";
  return html
    .replace(/<ac:structured-macro[^>]*>[\s\S]*?<\/ac:structured-macro>/gi, "[macro]")
    .replace(/<ac:link[^>]*>[\s\S]*?<\/ac:link>/gi, (match) => {
      const body = match.match(/<ac:link-body>([\s\S]*?)<\/ac:link-body>/i);
      const plain = match.match(/<ac:plain-text-link-body><!\[CDATA\[(.*?)\]\]><\/ac:plain-text-link-body>/i);
      return plain ? plain[1] : body ? stripHtml(body[1]) : "[link]";
    })
    .replace(/<ac:image[^>]*>[\s\S]*?<\/ac:image>/gi, "[image]")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "• ")
    .replace(/<\/tr>/gi, "\n")
    .replace(/<td[^>]*>/gi, " | ")
    .replace(/<th[^>]*>/gi, " | ")
    .replace(/<hr[^>]*>/gi, "\n---\n")
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parseConfluenceUrl(url) {
  // Format: /display/SPACE/Page+Title
  const displayMatch = url.match(/\/display\/([^/]+)\/(.+?)(?:\?|$)/);
  if (displayMatch) {
    return {
      spaceKey: displayMatch[1],
      title: decodeURIComponent(displayMatch[2].replace(/\+/g, " ")),
    };
  }

  // Format: /pages/viewpage.action?pageId=123
  const pageIdMatch = url.match(/pageId=(\d+)/);
  if (pageIdMatch) {
    return { pageId: pageIdMatch[1] };
  }

  return null;
}

async function getPageById(pageId) {
  return confluenceRequest(`/content/${pageId}?expand=body.storage,version,space,metadata.labels,children.comment`);
}

async function getPageBySpaceAndTitle(spaceKey, title) {
  const encoded = encodeURIComponent(title);
  const result = await confluenceRequest(`/content?spaceKey=${spaceKey}&title=${encoded}&expand=body.storage,version,space,metadata.labels`);
  if (!result.results || result.results.length === 0) {
    throw new Error(`Page not found: "${title}" in space ${spaceKey}`);
  }
  return result.results[0];
}

function formatPage(page) {
  const content = stripHtml(page.body?.storage?.value || "");
  const labels = (page.metadata?.labels?.results || []).map(l => l.name);
  return {
    id: page.id,
    title: page.title,
    space: page.space?.key,
    space_name: page.space?.name,
    url: `${BASE_URL}${page._links?.webui || `/pages/viewpage.action?pageId=${page.id}`}`,
    version: page.version?.number,
    last_updated: page.version?.when,
    last_updated_by: page.version?.by?.displayName,
    labels,
    content,
  };
}

const server = new Server(
  { name: "confluence-mcp-server", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "confluence_get_page",
        description: "Fetch a Confluence page by URL, title+space, or page ID. Returns the page content as clean text for summarization and Q&A.",
        inputSchema: {
          type: "object",
          properties: {
            url: {
              type: "string",
              description: "Full Confluence page URL (e.g., https://wiki.corp.adobe.com/display/ecom/Page+Title)",
            },
            title: {
              type: "string",
              description: "Page title to search for (use with space_key)",
            },
            space_key: {
              type: "string",
              description: "Confluence space key (e.g., 'ecom'). Required when using title.",
            },
            page_id: {
              type: "string",
              description: "Numeric page ID if known",
            },
          },
        },
      },
      {
        name: "confluence_search",
        description: "Search Confluence pages using keywords. Optionally filter by space. Returns page titles, spaces, and excerpts.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Search keywords (e.g., 'soft cancel resubscribe')",
            },
            space_key: {
              type: "string",
              description: "Optional: limit search to a specific space (e.g., 'ecom')",
            },
            limit: {
              type: "number",
              description: "Max results to return (default: 10, max: 25)",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "confluence_get_comments",
        description: "Get comments/discussion on a Confluence page by page ID or URL.",
        inputSchema: {
          type: "object",
          properties: {
            page_id: {
              type: "string",
              description: "Numeric page ID",
            },
            url: {
              type: "string",
              description: "Full Confluence page URL (will resolve to page ID)",
            },
          },
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "confluence_get_page": {
        let page;

        if (args.url) {
          const parsed = parseConfluenceUrl(args.url);
          if (!parsed) throw new Error(`Could not parse Confluence URL: ${args.url}`);
          page = parsed.pageId
            ? await getPageById(parsed.pageId)
            : await getPageBySpaceAndTitle(parsed.spaceKey, parsed.title);
        } else if (args.page_id) {
          page = await getPageById(args.page_id);
        } else if (args.title && args.space_key) {
          page = await getPageBySpaceAndTitle(args.space_key, args.title);
        } else {
          throw new Error("Provide one of: url, page_id, or title + space_key");
        }

        return {
          content: [{ type: "text", text: JSON.stringify(formatPage(page), null, 2) }],
        };
      }

      case "confluence_search": {
        const limit = Math.min(args.limit || 10, 25);
        let cql = `type=page AND text~"${args.query}"`;
        if (args.space_key) {
          cql += ` AND space="${args.space_key}"`;
        }

        const result = await confluenceRequest(
          `/content/search?cql=${encodeURIComponent(cql)}&limit=${limit}&expand=space,version,metadata.labels`
        );

        const pages = (result.results || []).map(page => ({
          id: page.id,
          title: page.title,
          space: page.space?.key,
          space_name: page.space?.name,
          url: `${BASE_URL}${page._links?.webui || ""}`,
          last_updated: page.version?.when,
          last_updated_by: page.version?.by?.displayName,
          labels: (page.metadata?.labels?.results || []).map(l => l.name),
        }));

        return {
          content: [{
            type: "text",
            text: JSON.stringify({ total: result.totalSize || pages.length, showing: pages.length, pages }, null, 2),
          }],
        };
      }

      case "confluence_get_comments": {
        let pageId = args.page_id;

        if (!pageId && args.url) {
          const parsed = parseConfluenceUrl(args.url);
          if (!parsed) throw new Error(`Could not parse Confluence URL: ${args.url}`);
          if (parsed.pageId) {
            pageId = parsed.pageId;
          } else {
            const page = await getPageBySpaceAndTitle(parsed.spaceKey, parsed.title);
            pageId = page.id;
          }
        }

        if (!pageId) throw new Error("Provide page_id or url");

        const result = await confluenceRequest(
          `/content/${pageId}/child/comment?expand=body.storage,version&limit=50`
        );

        const comments = (result.results || []).map(c => ({
          id: c.id,
          author: c.version?.by?.displayName,
          date: c.version?.when,
          body: stripHtml(c.body?.storage?.value || ""),
        }));

        return {
          content: [{
            type: "text",
            text: JSON.stringify({ page_id: pageId, total: comments.length, comments }, null, 2),
          }],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [{ type: "text", text: JSON.stringify({ error: error.message }, null, 2) }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Confluence MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
