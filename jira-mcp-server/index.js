#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Read credentials from environment variables
const JIRA_HOST = process.env.JIRA_HOST;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;
const JIRA_PROJECT_KEY = process.env.JIRA_PROJECT_KEY;

if (!JIRA_HOST || !JIRA_API_TOKEN) {
  console.error("Missing required environment variables: JIRA_HOST, JIRA_API_TOKEN");
  process.exit(1);
}

// Helper function to make Jira API requests
async function jiraRequest(endpoint, options = {}) {
  const url = `${JIRA_HOST}/rest/api/2${endpoint}`;
  
  const response = await fetch(url, {
    ...options,
    headers: {
      "Authorization": `Bearer ${JIRA_API_TOKEN}`,
      "Content-Type": "application/json",
      "Accept": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Jira API error (${response.status}): ${errorText}`);
  }

  const text = await response.text();
  return text ? JSON.parse(text) : null;
}

// Create the MCP server
const server = new Server(
  {
    name: "jira-mcp-server",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "jira_get_issue",
        description: "Get details of a Jira issue by key (e.g., PROJ-123)",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The Jira issue key (e.g., PROJ-123)",
            },
          },
          required: ["issue_key"],
        },
      },
      {
        name: "jira_search_issues",
        description: "Search for Jira issues using JQL (Jira Query Language)",
        inputSchema: {
          type: "object",
          properties: {
            jql: {
              type: "string",
              description: "JQL query string (e.g., 'project = PROJ AND status = Open')",
            },
            max_results: {
              type: "number",
              description: "Maximum number of results to return (default: 10)",
            },
          },
          required: ["jql"],
        },
      },
      {
        name: "jira_create_issue",
        description: "Create a new Jira issue",
        inputSchema: {
          type: "object",
          properties: {
            project_key: {
              type: "string",
              description: "The project key (e.g., PROJ). Uses JIRA_PROJECT_KEY env var if not specified.",
            },
            summary: {
              type: "string",
              description: "Issue summary/title",
            },
            description: {
              type: "string",
              description: "Issue description",
            },
            issue_type: {
              type: "string",
              description: "Issue type (e.g., Bug, Task, Story). Default: Task",
            },
          },
          required: ["summary"],
        },
      },
      {
        name: "jira_add_comment",
        description: "Add a comment to an existing Jira issue",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The Jira issue key (e.g., PROJ-123)",
            },
            comment: {
              type: "string",
              description: "The comment text to add",
            },
          },
          required: ["issue_key", "comment"],
        },
      },
      {
        name: "jira_transition_issue",
        description: "Transition a Jira issue to a new status",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The Jira issue key (e.g., PROJ-123)",
            },
            transition_name: {
              type: "string",
              description: "The name of the transition (e.g., 'In Progress', 'Done')",
            },
          },
          required: ["issue_key", "transition_name"],
        },
      },
      {
        name: "jira_get_transitions",
        description: "Get available transitions for a Jira issue",
        inputSchema: {
          type: "object",
          properties: {
            issue_key: {
              type: "string",
              description: "The Jira issue key (e.g., PROJ-123)",
            },
          },
          required: ["issue_key"],
        },
      },
      {
        name: "jira_list_projects",
        description: "List all accessible Jira projects",
        inputSchema: {
          type: "object",
          properties: {},
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case "jira_get_issue": {
        const issue = await jiraRequest(`/issue/${args.issue_key}`);
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                key: issue.key,
                summary: issue.fields.summary,
                status: issue.fields.status?.name,
                assignee: issue.fields.assignee?.displayName || "Unassigned",
                reporter: issue.fields.reporter?.displayName,
                priority: issue.fields.priority?.name,
                issue_type: issue.fields.issuetype?.name,
                description: issue.fields.description,
                created: issue.fields.created,
                updated: issue.fields.updated,
                labels: issue.fields.labels,
                components: issue.fields.components?.map(c => c.name),
              }, null, 2),
            },
          ],
        };
      }

      case "jira_search_issues": {
        const maxResults = args.max_results || 10;
        const result = await jiraRequest(
          `/search?jql=${encodeURIComponent(args.jql)}&maxResults=${maxResults}`
        );
        
        const issues = result.issues.map(issue => ({
          key: issue.key,
          summary: issue.fields.summary,
          status: issue.fields.status?.name,
          assignee: issue.fields.assignee?.displayName || "Unassigned",
          priority: issue.fields.priority?.name,
          issue_type: issue.fields.issuetype?.name,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                total: result.total,
                showing: issues.length,
                issues,
              }, null, 2),
            },
          ],
        };
      }

      case "jira_create_issue": {
        const projectKey = args.project_key || JIRA_PROJECT_KEY;
        if (!projectKey) {
          throw new Error("project_key is required (or set JIRA_PROJECT_KEY env var)");
        }

        const issueData = {
          fields: {
            project: { key: projectKey },
            summary: args.summary,
            description: args.description || "",
            issuetype: { name: args.issue_type || "Task" },
          },
        };

        const result = await jiraRequest("/issue", {
          method: "POST",
          body: JSON.stringify(issueData),
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                key: result.key,
                id: result.id,
                url: `${JIRA_HOST}/browse/${result.key}`,
              }, null, 2),
            },
          ],
        };
      }

      case "jira_add_comment": {
        const result = await jiraRequest(`/issue/${args.issue_key}/comment`, {
          method: "POST",
          body: JSON.stringify({ body: args.comment }),
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                comment_id: result.id,
                created: result.created,
              }, null, 2),
            },
          ],
        };
      }

      case "jira_get_transitions": {
        const result = await jiraRequest(`/issue/${args.issue_key}/transitions`);
        
        const transitions = result.transitions.map(t => ({
          id: t.id,
          name: t.name,
          to_status: t.to?.name,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ transitions }, null, 2),
            },
          ],
        };
      }

      case "jira_transition_issue": {
        // First, get available transitions
        const transitionsResult = await jiraRequest(`/issue/${args.issue_key}/transitions`);
        
        const transition = transitionsResult.transitions.find(
          t => t.name.toLowerCase() === args.transition_name.toLowerCase()
        );

        if (!transition) {
          const available = transitionsResult.transitions.map(t => t.name).join(", ");
          throw new Error(
            `Transition "${args.transition_name}" not found. Available: ${available}`
          );
        }

        await jiraRequest(`/issue/${args.issue_key}/transitions`, {
          method: "POST",
          body: JSON.stringify({ transition: { id: transition.id } }),
        });

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({
                success: true,
                issue_key: args.issue_key,
                transitioned_to: transition.to?.name || args.transition_name,
              }, null, 2),
            },
          ],
        };
      }

      case "jira_list_projects": {
        const projects = await jiraRequest("/project");
        
        const projectList = projects.map(p => ({
          key: p.key,
          name: p.name,
          id: p.id,
        }));

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify({ projects: projectList }, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify({ error: error.message }, null, 2),
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Jira MCP server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
