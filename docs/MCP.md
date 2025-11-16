# MCP Integration

SCE ships with a **Model Context Protocol (MCP)** server exposing symbolic reasoning tools for LLM-powered applications.

These capabilities allow SCE to function as a shared semantic layer between:

- human instructions
- LLM reasoning
- structured automation systems

---

## Running the MCP server

After building the project:

```bash
npm run build
node dist/sce-mcp-server.js
```

Or if configured as a workspace binary:

```bash
pnpm sce-mcp
```

---

## Available MCP tools

| Tool Name               | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `sce_explain`           | Interpret SCE symbols in text and return structured meaning |
| `sce_validate_ontology` | Verify ontology consistency                                 |
| `sce_suggest_symbols`   | Recommend symbols based on natural language context         |

---

## Shared input format

Each tool may include an optional formatting profile:

```jsonc
{
  "format": {
    "type": "auto | pretty | json | hybrid",
    "color": true
  }
}
```

### Format behavior

| Mode     | Output                                  | Best use           |
| -------- | --------------------------------------- | ------------------ |
| `auto`   | Pretty in terminals, JSON in automation | Default            |
| `pretty` | Human oriented, markdown-style display  | Debugging          |
| `json`   | Strict structured response              | LLM or pipelines   |
| `hybrid` | Pretty + JSON block                     | Audit and dual use |

---

## Tool reference

### `sce_explain`

Extracts and interprets SCE symbols found in freeform text.

#### Example input

```json
{
  "text": "📌 Required ⏳ Pending ⚠️ Risk"
}
```

#### Example output (pretty)

```
📌  Pinned fact
⏳  Pending state
⚠️  Warning or elevated risk
```

#### Example output (JSON)

```json
[
  {
    "emoji": "📌",
    "role": "STRUCTURE",
    "meaning": "Pinned fact or non-negotiable constraint"
  },
  {
    "emoji": "⏳",
    "role": "STATE",
    "meaning": "Pending / unresolved"
  },
  {
    "emoji": "⚠️",
    "role": "STATE",
    "meaning": "Warning, risk, or elevated priority"
  }
]
```

---

### `sce_validate_ontology`

Checks ontology integrity during development, CI, or runtime.

Example output:

```
✅ Ontology valid — no conflicts detected.
```

If issues:

```
❌ Detected 2 conflicts:
 - 🧠 missing required example field
 - 🧾 conflictsWith references undefined symbol
```

---

### `sce_suggest_symbols`

Suggests symbols based on inferred meaning.

#### Example input

```json
{ "text": "investigation incomplete and requires follow-up" }
```

#### Example output

```json
[
  { "emoji": "⏳", "reason": "Represents incomplete or pending state" },
  { "emoji": "📝", "reason": "Represents a task requiring action" }
]
```

---

## Client compatibility

SCE MCP server works with:

- Claude Desktop
- OpenAI / ReAct agents
- LM Studio + MCP plugins
- Visual Studio Co-Pilot
- custom toolchains and workflow engines

---

## Versioning

MCP protocol compatibility follows [semantic versioning](https://semver.org/).

Breaking changes require an RFC prior to inclusion.

---

## Next steps

- Read the [`GETTING-STARTED.md`](GETTING-STARTED.md) guide
- Review the core model in [`ONTOLOGY-API.md`](ONTOLOGY-API.md)
- Explore runnable examples in `/examples`
