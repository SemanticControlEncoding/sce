# Getting started

## Installation

```bash
npm install semanticencoding

# or optionally, to install the CLI globally
npm install -g semanticencoding
```

Alternatively, you can access the MCP server with the following Claude-style configuration entry:

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

Once installed globally, you can use the `sce` command from any terminal. See the [CLI Reference](CLI.md) for detailed usage.

For tips on using SCE symbols in your prompts to reduce tokens and increase clarity, see the [**Prompting Guide**](PROMPTING.md).

Or from a local clone:

```bash
git clone https://github.com/SementicEncoding/sce.git
cd sce
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

SCE includes a built-in **Model Context Protocol (MCP)** server that exposes SCE's ontology and interpreter to LLMs, agent frameworks, and automation tools. The MCP server enables:

- **Symbol extraction and interpretation** from freeform text
- **Ontology validation** for development and CI workflows
- **Symbol suggestions** based on natural language intent

The server supports flexible output formatting (auto/pretty/json/hybrid) to work seamlessly in CLI, automation pipelines, and LLM-driven environments.

**For detailed MCP documentation, see [MCP.md](MCP.md).**
