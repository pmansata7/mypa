#!/usr/bin/env python3
"""
Fetch the latest meeting from Granola's local cache and write it as a markdown file
to 00-Inbox/Meetings/. Uses only stdlib (no MCP or requests). Requires Granola app
to be installed and cache at ~/Library/Application Support/Granola/cache-v3.json.
"""
import json
import os
import re
import sys
from datetime import datetime, timedelta
from pathlib import Path
from typing import Any, Dict, List, Optional

PROJECT_ROOT = Path(__file__).resolve().parent.parent


def get_granola_cache_path() -> Path:
    if os.name == "posix" and sys.platform == "darwin":
        return Path.home() / "Library" / "Application Support" / "Granola" / "cache-v3.json"
    if sys.platform == "win32":
        roaming = Path(os.environ.get("APPDATA", Path.home() / "AppData" / "Roaming"))
        local = Path(os.environ.get("LOCALAPPDATA", Path.home() / "AppData" / "Local"))
        for base in [roaming, local]:
            p = base / "Granola" / "cache-v3.json"
            if p.exists():
                return p
        return roaming / "Granola" / "cache-v3.json"
    return Path.home() / ".config" / "Granola" / "cache-v3.json"


def read_granola_cache() -> Optional[Dict[str, Any]]:
    path = get_granola_cache_path()
    if not path.exists():
        return None
    try:
        raw = path.read_text()
        wrapper = json.loads(raw)
        data = json.loads(wrapper.get("cache", "{}"))
        state = data.get("state", {})
        return {
            "documents": state.get("documents", {}),
            "transcripts": state.get("transcripts", {}),
        }
    except Exception:
        return None


def extract_meeting_info(cache: Dict, meeting_id: str, doc: Dict) -> Dict[str, Any]:
    transcript_entries = cache["transcripts"].get(meeting_id, [])
    transcript = ""
    if transcript_entries:
        transcript = " ".join(
            t.get("text", "")
            for t in sorted(transcript_entries, key=lambda x: x.get("start_timestamp", ""))
        ).strip()

    participants = []
    for att in doc.get("people", {}).get("attendees", []):
        name = (
            (att.get("details") or {}).get("person", {}).get("name", {}).get("fullName")
            or att.get("name")
            or att.get("email")
        )
        if name:
            participants.append({"name": name, "email": att.get("email")})

    created_at = doc.get("created_at", "")
    meeting_date = created_at.split("T")[0] if created_at else None
    notes = doc.get("notes_markdown", "")

    action_items = []
    for line in notes.split("\n"):
        line = line.strip()
        if line.startswith("- [ ]") or line.startswith("* [ ]"):
            action_items.append(line[5:].strip())

    return {
        "id": meeting_id,
        "title": doc.get("title", "Untitled Meeting"),
        "date": meeting_date,
        "created_at": created_at,
        "notes": notes,
        "transcript": transcript,
        "action_items": action_items,
        "participants": participants,
    }


def get_recent_meetings_from_cache(cache: Dict, days_back: int = 14, limit: int = 10) -> List[Dict[str, Any]]:
    cutoff = datetime.now() - timedelta(days=days_back)
    meetings = []
    for meeting_id, doc in cache["documents"].items():
        if doc.get("type") != "meeting" or doc.get("deleted_at"):
            continue
        created_at = doc.get("created_at", "")
        if created_at:
            try:
                dt = datetime.fromisoformat(created_at.replace("Z", "+00:00"))
                if dt.replace(tzinfo=None) < cutoff:
                    continue
            except Exception:
                pass
        info = extract_meeting_info(cache, meeting_id, doc)
        meetings.append(info)
    meetings.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return meetings[:limit]


def slug(s: str, max_len: int = 60) -> str:
    s = re.sub(r"[^\w\s-]", "", s)
    s = re.sub(r"[-\s]+", "_", s).strip("_")
    return s[:max_len] if s else "Meeting"


def main() -> int:
    cache = read_granola_cache()
    if not cache:
        print("Granola cache not found. Is Granola installed and have you had any meetings?", file=sys.stderr)
        print("Expected path:", get_granola_cache_path(), file=sys.stderr)
        return 1

    meetings = get_recent_meetings_from_cache(cache, days_back=14, limit=5)
    if not meetings:
        print("No recent meetings in Granola cache.", file=sys.stderr)
        return 1

    details = meetings[0]
    title = details.get("title") or "Untitled Meeting"
    date_str = details.get("date") or "unknown"
    participants = details.get("participants") or []
    notes = (details.get("notes") or "").strip()
    action_items = details.get("action_items") or []
    transcript = (details.get("transcript") or "").strip()

    lines = [
        f"# {title}",
        "",
        f"**Date:** {date_str}",
        "",
    ]
    if participants:
        lines.append("## Attendees")
        lines.append("")
        for p in participants:
            name = p.get("name") or p.get("email") or "—"
            email = p.get("email")
            lines.append(f"- {name} ({email})" if email else f"- {name}")
        lines.append("")
    if notes:
        lines.append("## Notes")
        lines.append("")
        lines.append(notes)
        lines.append("")
    if action_items:
        lines.append("## Action items")
        lines.append("")
        for item in action_items:
            lines.append(f"- [ ] {item}")
        lines.append("")
    if transcript:
        lines.append("## Transcript")
        lines.append("")
        lines.append(transcript)
        lines.append("")

    md_content = "\n".join(lines).strip() + "\n"
    meeting_dir = PROJECT_ROOT / "00-Inbox" / "Meetings" / date_str
    meeting_dir.mkdir(parents=True, exist_ok=True)
    safe_title = slug(title)
    filename = f"{date_str} - {safe_title}.md" if safe_title != "Meeting" else f"{date_str} - Meeting.md"
    out_path = meeting_dir / filename
    out_path.write_text(md_content, encoding="utf-8")
    print(str(out_path))
    return 0


if __name__ == "__main__":
    sys.exit(main())
