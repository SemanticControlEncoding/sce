# MCP Integration

SCE includes a built-in **Model Context Protocol (MCP)** server that exposes the ontology and interpreter over stdio. This allows LLMs, agent frameworks, and automation tools to use SCE as a shared symbolic layer for semantic communication.

The MCP server enables SCE to function as a bridge between:

- Human instructions
- LLM reasoning and tool use
- Structured automation systems

---

## Running the MCP server

### Client configuration (recommended)

The easiest way to use the MCP server is through MCP clients like Claude Desktop. Add this to your client's configuration file:

```json
{
  "mcpServers": {
    "semanticencoding": {
      "command": "npx",
      "args": [
				"--package=semanticencoding",
				"-y",
				"sce-mcp"
			],
			"type": "stdio"
    }
  }
}
```

Configuration file locations:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

The client will automatically download and run the latest published version. Restart your MCP client after updating the configuration.

### Installing or building

Install the package globally:

```bash
npm install -g semanticencoding
```

Or build from source:

```bash
pnpm install
pnpm run build
```

### Running manually

For development, testing, or use with other MCP clients:

```bash
# Via the published package:
npx -y semanticencoding sce-mcp

# Or from source after building:
node packages/semanticencoding/ts/dist/sce-mcp-server.js

# Or in a monorepo workspace:
pnpm sce-mcp
```

Once running, any MCP-compatible client can detect and call SCE tools.

---

## Available MCP tools

The server exposes three capabilities that enable efficient, symbol-aware communication:

| Tool Name               | Purpose                                                  | Key Benefit                                                               |
| ----------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------- |
| `sce_explain`           | Extract and interpret SCE symbols found in freeform text | Models query only the symbols they need, reducing token usage and noise   |
| `sce_validate_ontology` | Check ontology for structural or semantic issues         | Ensures symbol consistency across conversations and agents                |
| `sce_suggest_symbols`   | Recommend symbols based on natural language intent       | Guides users and models toward precise, reusable symbolic representations |

### Why `sce_explain` matters

Instead of embedding the entire ontology in every prompt, models can **selectively query** only the symbols they encounter:

- **Token efficiency**: Only retrieve definitions for symbols actually present in the conversation
- **Information density**: Each symbol carries precise semantic meaning without verbose natural language
- **Better alignment**: Shared symbolic vocabulary reduces ambiguity between human intent and model interpretation
- **Scalable context**: As the ontology grows, prompts don't — models pull only what they need, when they need it

This "just-in-time" symbol resolution enables models to work with rich semantic context while maintaining minimal token overhead.

---

## Output formatting

All tools support a structured formatting configuration:

```jsonc
{
  "format": {
    "type": "auto | pretty | json | hybrid",
    "color": true
  }
}
```

### Format modes

| Mode             | Output Type                          | Best For                     |
| ---------------- | ------------------------------------ | ---------------------------- |
| `auto` (default) | Detects TTY → pretty, otherwise JSON | Most cases                   |
| `pretty`         | Human-readable, optionally colored   | CLI, debugging               |
| `json`           | Strict machine output                | Automation, LLM parsers      |
| `hybrid`         | Pretty summary + JSON block          | Auditing, mixed environments |

**Format behavior details:**

- `auto` (default):
  - **TTY → pretty** (human-friendly in terminals)
  - **non-TTY → json** (machine-friendly in pipelines)
- `pretty`: human-friendly text with optional ANSI color
- `json`: strict machine-friendly output
- `hybrid`: readable summary + JSON detail block

SCE output formatting ensures the same tool behaves appropriately in:

- Human-facing CLI usage
- Automated pipelines
- LLM-driven tool calls
- Hybrid debugging and review

---

## Tool reference

### `sce_explain`

Extracts and interprets SCE symbols found in freeform text.

#### Example input

```json
{
  "text": "📌 Timeline established. ⏳ Pending review."
}
```

#### Example output (pretty)

```
📌  Pinned / Non-negotiable fact
    → Example: "📌 Timeline is determined by first reported contact."

⏳  Pending / In-progress state
    → Example: "⏳ Awaiting disciplinary response."
```

#### Example output (JSON)

```json
[
  {
    "emoji": "📌",
    "role": "STRUCTURE",
    "meaning": "Pinned fact or non-negotiable constraint",
    "allowedContext": ["HUMAN", "LLM"],
    "usage": "REQUIRED",
    "conflictsWith": ["📝", "🧠"],
    "example": "📌 Timeline is determined by first reported contact (11/06/24)."
  }
]
```

---

### `sce_validate_ontology`

Checks ontology integrity during development, CI, or runtime. This is useful when extending the core ontology to fit
domain-specific use cases.

**Example output (success):**

```
✅ Ontology validation passed — no conflicts detected.
```

**Example output (with issues):**

```
❌ Ontology issues found (3)

• ⚠️ Duplicate emoji: "☑️"
• 🔍 Missing example field for "🕵️"
• ⛔ Conflicting definitions detected between "⏳" and "❌"
```

---

### `sce_suggest_symbols`

Suggests symbols based on inferred meaning in plain text.

#### Example input

```json
{
  "text": "review incomplete and requires action"
}
```

#### Example output

```json
[
  {
    "emoji": "⏳",
    "role": "STATE",
    "reason": "Indicates incomplete or pending status"
  },
  {
    "emoji": "📝",
    "role": "TASK",
    "reason": "Indicates required follow-up or next steps"
  }
]
```

---

## Format configuration examples

### Auto (recommended default)

```jsonc
{
  "text": "📌 Required. ⏳ Delayed.",
  "format": { "type": "auto" }
}
```

CLI renders human readable output. LLMs receive structured JSON.

### Pretty with color disabled

```jsonc
{
  "text": "⚠️ Missing guardian notification.",
  "format": {
    "type": "pretty",
    "color": false
  }
}
```

Useful when piping output or writing to log files.

### Explicit JSON

```jsonc
{
  "text": "❌ Not allowed.",
  "format": { "type": "json" }
}
```

Guarantees stable structured output.

### Hybrid format

```jsonc
{
  "text": "📝 Follow up. ⏳ Pending.",
  "format": {
    "type": "hybrid",
    "color": true
  }
}
```

**Example hybrid output:**

````
📝 Action required
⏳ Status pending

JSON detail:
```json
[
  { "emoji": "📝", "role": "TASK", ... },
  { "emoji": "⏳", "role": "STATE", ... }
]
````

Hybrid mode is particularly useful when:

- Humans review output
- LLMs ingest the same response
- Context must be preserved for audit or compliance workflows

---

## Client compatibility

SCE MCP server works with:

- Claude Desktop
- OpenAI / ReAct agents
- LM Studio + MCP plugins
- Visual Studio Co-Pilot
- Custom toolchains and workflow engines

---

## Versioning

MCP protocol compatibility follows [semantic versioning](https://semver.org/).

Breaking changes require an RFC prior to inclusion.

---

## Next steps

- Read the [`GETTING-STARTED.md`](GETTING-STARTED.md) guide
- Review the core model in [`ONTOLOGY-API.md`](ONTOLOGY-API.md)
- Explore runnable examples in `/examples`
