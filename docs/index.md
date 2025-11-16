<p align="center">
  <span style="sce-header">
  🧠 Semantic Communication Encoding · <strong>DRAFT v1</strong>
  </span>
</p>

---

# Semantic Communication Encoding (SCE)

> 🧠 A small, governed emoji ontology for humans, tools, and LLMs.

Semantic Communication Encoding (**SCE**) is a way to use **Unicode emoji as semantic operators** — a compact, standardized “mini-language” that both humans and machines can understand.

Instead of long, fragile instructions like:

> “This is a non-negotiable fact that must not be contradicted…”

you can write:

> `📌 Student was first enrolled on 2024-11-06.`

…and everyone knows that:

- `📌` means **pinned, non-negotiable fact**
- it belongs to the **structure** domain
- its behavior and conflicts are defined in a formal ontology

SCE is designed for:

- 🧭 **LLM prompts & tools** – structure, control flow, and state
- ⚖️ **Compliance & legal workflows** – Title IX, FERPA, data access, audit trails
- 🧑‍💻 **Agent frameworks** – shared symbolic “vocabulary” across tools
- 📝 **Human collaboration** – readable, skimmable, explainable annotations

---

## Why SCE?

Modern systems mix:

- Narrative context
- Legal / policy constraints
- Workflow & task state
- Roles and actors
- Privacy & access rules

SCE gives you a small, opinionated, **governed vocabulary** for those concepts:

| Domain      | Example symbols | Purpose                               |
| ----------- | --------------- | ------------------------------------- |
| structure   | 🗂️ 📌 📎        | Sections, pinned facts, references    |
| legalPolicy | ⚖️ 📜 🧾 🏛️     | Law, citation, evidence, authority    |
| reasoning   | 🔍 🧠 🕵️        | Analysis, insight, investigation      |
| tasks       | 📝 ☐ ☑️ ✅ 🔁   | Actions, task state                   |
| privacy     | 🔐 🗝️ 🔓        | Restricted / authorized / open        |
| actors      | 👤 🧑‍🎓 🧑‍🏫 🧑‍⚖️ 🏢  | People & institutions                 |
| state       | ⏳ ❓ ⚠️ ❌     | Pending, unknown, warning, prohibited |
| control     | 🔀 ⏭️ ⏮️        | Decision points, next, back           |

Each symbol has a **machine-readable definition** with:

- `emoji` – the actual Unicode grapheme
- `role` – category / domain role
- `meaning` – authoritative definition
- `allowedContext` – HUMAN / LLM / TOOL
- `usage` – REQUIRED / OPTIONAL / CONDITIONAL
- `conflictsWith` – mutually exclusive symbols
- `example` – canonical example usage

---

## What’s in this repo?

SCE ships with a complete “stack”:

- 🧬 **Core ontology** – `ontology.ts` is the normative symbol set
- 🔎 **Interpreter** – emoji → JSON symbol definitions
- ✅ **Validator** – checks for conflicts, duplicates, structural issues
- 🧰 **TypeScript API** – drop-in library for your own tools
- 🖥️ **CLI** – inspect symbols and validate the ontology from the terminal
- 🔌 **MCP server** – stdio Model Context Protocol server exposing SCE tools

---

## Quick start

### 1. Install

```bash
# once published
npm install @semanticencoding/core

# or from a cloned repo
npm install .
```

### 2. Interpret symbols in text

```ts
import { getDefinitionsFromText } from "@semanticencoding/core";

const text =
  "📌 First report was on 2024-11-06. ⏳ Investigation is still pending. ⚠️ Parent has raised safety concerns.";

const defs = getDefinitionsFromText(text);

console.log(defs[0]);
/*
{
  emoji: "📌",
  role: "STRUCTURE",
  meaning: "Pinned fact or non-negotiable constraint",
  allowedContext: ["HUMAN", "LLM"],
  usage: "REQUIRED",
  conflictsWith: ["📝", "🧠"],
  example: "📌 Timeline is determined by first reported contact (11/06/24)."
}
*/
```

### 3. Validate the ontology

```ts
import { validateOntology } from "@semanticencoding/core";

const issues = validateOntology();
if (issues.length > 0) {
  console.error("Ontology has issues:", issues);
  process.exit(1);
}
```

---

## MCP integration

SCE includes a stdio MCP server with three tools:

- `sce_explain` – extract & explain SCE symbols from text
- `sce_validate_ontology` – validate ontology structure & conflicts
- `sce_suggest_symbols` – suggest SCE symbols for freeform text

### Run the server

```bash
npm run build
node dist/sce-mcp-server.js
# or, if mapped in package.json:
sce-mcp
```

Each tool supports a structured `format` override:

```jsonc
{
  "format": {
    "type": "auto | pretty | json | hybrid",
    "color": true
  }
}
```

- `auto` (default) – TTY → pretty, non-TTY → JSON
- `pretty` – human output (optionally colored)
- `json` – machine-first, strict JSON text
- `hybrid` – pretty summary + JSON block

---

## Learn more

- 👉 [Getting started](GETTING-STARTED.md) – install, basic usage, examples
- 📜 [Specification](SPEC.md) – SCE standard v1 (draft)
- 🧬 [Ontology & API](ONTOLOGY-API.md) – core symbol set & TypeScript types
- 🔌 [MCP integration](mcp.md) – using SCE with MCP-aware tools
- 🤝 [Contributing & Governance](CONTRIBUTING.md) – RFCs, symbol proposals, ethics
- 🛣️ [Roadmap](ROADMAP.md) - Where we're going next
- [Repository](https://github.com/SemanticEncoding/sce) - Where we are right now

---

## Status

> <span class="sce-badge">🏷️ SCE · v0.1: Draft</span>

SCE is stable enough for:

- real prompt engineering
- compliance / legal workflows
- MCP / agent framework integrations

…but will continue to evolve based on practical usage and contributor feedback.
