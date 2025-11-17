# Getting started

## Installation

```bash
npm install semanticencoding
```

or from a local clone

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
```

## Basic usage

You can use SCE from Node or TypeScript applications.

```ts
import { getDefinitionsFromText, validateOntology } from "semanticencoding";

const text =
  "📌 First report was on 2024-11-06. ⏳ Investigation is still pending. ⚠️ Parent has raised safety concerns.";

const defs = getDefinitionsFromText(text);

console.log(defs);
/*
[
  {
    emoji: "📌",
    role: "STRUCTURE",
    meaning: "Pinned fact or non-negotiable constraint",
    allowedContext: ["HUMAN", "LLM"],
    usage: "REQUIRED",
    conflictsWith: ["📝", "🧠"],
    example: "📌 Timeline is determined by first reported contact (11/06/24)."
  },
  {
    emoji: "⏳",
    role: "STATE",
    meaning: "Pending / not yet resolved",
    ...
  },
  {
    emoji: "⚠️",
    role: "STATE",
    meaning: "Warning or risk detected",
    ...
  }
]
*/
```

This gives you a structured, machine-readable interpretation of SCE symbols found inside arbitrary text.

### Ontology validation

SCE includes a built-in validator that checks whether the ontology is internally consistent.  
This is useful in CI, when extending the ontology, or before releasing updates.

```ts
import { validateOntology } from "semanticencoding";

const issues = validateOntology();

if (issues.length > 0) {
  console.error("❌ Ontology issues detected:");
  console.table(issues);
  process.exit(1);
} else {
  console.log("✅ Ontology validation passed — no conflicts found.");
}
```

Validation checks include:

- duplicate emojis
- missing required metadata fields
- unresolved role/category references
- conflicting or cyclic `conflictsWith` definitions
- inconsistent usage rules

### MCP integration

SCE includes a built-in **Model Context Protocol (MCP)** server that exposes the ontology and interpreter over stdio.  
This allows LLMs, agent frameworks, and automation tools to use SCE as a shared symbolic layer.

#### Run the server

```bash
npm run build
node dist/sce-mcp-server.js

# or, if configured in package.json:
sce-mcp
```

Once running, any MCP-compatible client can detect and call SCE tools.

The server exposes three capabilities:

| Tool                    | Purpose                                                  |
| ----------------------- | -------------------------------------------------------- |
| `sce_explain`           | Extract and interpret SCE symbols found in freeform text |
| `sce_validate_ontology` | Check ontology for structural or semantic issues         |
| `sce_suggest_symbols`   | Recommend symbols based on natural language intent       |

All tools support a structured formatting configuration:

```jsonc
{
  "format": {
    "type": "auto | pretty | json | hybrid",
    "color": true
  }
}
```

- `auto` (default):
  - **TTY → pretty**
  - **non-TTY → json**
- `pretty`: human-friendly text (with optional ANSI color)
- `json`: strict machine-friendly output
- `hybrid`: readable summary + JSON detail block

### Example MCP calls

Below are examples of how the exposed MCP tools behave depending on formatting mode and input.

---

#### `sce_explain`

Extracts and interprets symbols found in text.

**Pretty (default in terminals):**

```jsonc
>>> sce_explain("📌 Timeline established. ⏳ Pending review.")
📌  Pinned / Non-negotiable fact
    → Example: "📌 Timeline is determined by first reported contact."

⏳  Pending / In-progress state
    → Example: "⏳ Awaiting disciplinary response."
```

**Forced JSON:**

```jsonc
>>> sce_explain("📌 Timeline established.", { "format": { "type": "json" } })
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

#### `sce_validate_ontology`

```
>>> sce_validate_ontology
✅ Ontology validation passed — no conflicts detected.
```

If errors exist:

```
❌ Ontology issues found (3)

• ⚠️ Duplicate emoji: "☑️"
• 🔍 Missing example field for "🕵️"
• ⛔ Conflicting definitions detected between "⏳" and "❌"
```

---

#### `sce_suggest_symbols`

Suggests symbols based on meaning in plain text.

```jsonc
>>> sce_suggest_symbols("review incomplete and requires action")
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

### Format profiles

SCE output formatting can be controlled using the `format` configuration block.  
This ensures the same tool behaves appropriately in:

- human-facing CLI usage
- automated pipelines
- LLM-driven tool calls
- hybrid debugging and review

#### Available modes

| Mode             | Output Type                          | Best For                     |
| ---------------- | ------------------------------------ | ---------------------------- |
| `auto` (default) | Detects TTY → pretty, otherwise JSON | most cases                   |
| `pretty`         | Human-readable, optionally colored   | CLI, debugging               |
| `json`           | Strict machine output                | automation, LLM parsers      |
| `hybrid`         | Pretty summary + JSON block          | auditing, mixed environments |

---

#### Examples

**Auto (recommended default):**

```jsonc
{
  "text": "📌 Required. ⏳ Delayed.",
  "format": { "type": "auto" }
}
```

CLI renders human readable output.  
LLMs receive structured JSON.

---

**Pretty with color disabled:**

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

---

**Explicit JSON:**

```jsonc
{
  "text": "❌ Not allowed.",
  "format": { "type": "json" }
}
```

Guarantees stable structured output.

---

**Hybrid format:**

```jsonc
{
  "text": "📝 Follow up. ⏳ Pending.",
  "format": {
    "type": "hybrid",
    "color": true
  }
}
```

Output:

```
📝 Action required
⏳ Status pending

--- JSON DETAIL ---
[
  { "emoji": "📝", "role": "TASK", ... },
  { "emoji": "⏳", "role": "STATE", ... }
]
```

---

Hybrid mode is particularly useful when:

- humans review output
- LLMs ingest the same response
- context must be preserved for audit or compliance workflows
