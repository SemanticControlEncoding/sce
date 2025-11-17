# Ontology & API

The Semantic Communication Encoding (**SCE**) ontology defines a governed set of Unicode emoji symbols with explicit meaning, usage rules, and domain roles. It ensures humans, tools, and LLMs interpret symbols consistently.

---

## Ontology structure

The canonical ontology exists in:

```
packages/core/ts/src/ontology.ts
```

This file is considered **normative** for the current version of SCE.

Each symbol definition includes:

| Field            | Purpose                                                  |
| ---------------- | -------------------------------------------------------- |
| `emoji`          | The Unicode grapheme representing the symbol             |
| `role`           | The semantic category (e.g., STRUCTURE, TASK, STATE)     |
| `meaning`        | Human-readable definition                                |
| `allowedContext` | Where this symbol may be used (HUMAN, LLM, TOOL)         |
| `usage`          | REQUIRED, OPTIONAL, or CONDITIONAL                       |
| `conflictsWith`  | Symbols that cannot appear in the same semantic position |
| `example`        | A canonical usage reference                              |

### Type Signature

```ts
export interface SceSymbolDefinition {
  emoji: string;
  role: SceRole;
  meaning: string;
  allowedContext: SceContext[];
  usage: SceUsage;
  conflictsWith: string[];
  example: string;
}
```

---

## Domain model

SCE symbols are grouped into eight role domains:

| Domain      | Examples       | Usage                              |
| ----------- | -------------- | ---------------------------------- |
| structure   | 🗂️ 📌 📎       | Sections, pinned facts, anchors    |
| legalPolicy | ⚖️ 📜 🧾 🏛️    | Legal rules, citation, evidence    |
| reasoning   | 🔍 🧠 🕵️       | Analysis, inference, investigation |
| tasks       | 📝 ☐ ☑️ ✅ 🔁  | Work items, completion state       |
| privacy     | 🔐 🗝️ 🔓       | Access control and authorization   |
| actors      | 👤 🧑‍🎓 🧑‍🏫 🧑‍⚖️ 🏢 | Persons and institutions           |
| state       | ⏳ ❓ ⚠️ ❌    | Status, uncertainty, warnings      |
| control     | 🔀 ⏭️ ⏮️       | Flow and decision indicators       |

Each symbol belongs to **exactly one domain**.

---

## Programmatic access

### Importing the ontology

```ts
import { SemanticOntology } from "semanticencoding";

console.log(SemanticOntology.structure.pinned);
/*
{
  emoji: "📌",
  role: "STRUCTURE",
  meaning: "Pinned fact or non-negotiable constraint",
  allowedContext: ["HUMAN", "LLM"],
  usage: "REQUIRED",
  conflictsWith: [...],
  example: "📌 The date of first notification is fixed."
}
*/
```

---

## Runtime utilities

### Extract symbol definitions from text

```ts
import { getDefinitionsFromText } from "semanticencoding";

const result = getDefinitionsFromText("⚠️ Issue ⏳ still unresolved");
console.log(result);
```

### Validate ontology

```ts
import { validateOntology } from "semanticencoding";

const issues = validateOntology();
if (issues.length > 0) {
  console.table(issues);
}
```

### Suggest symbols

```ts
import { suggestSymbols } from "semanticencoding";

console.log(suggestSymbols("requires follow-up and pending review"));
```

---

## Stability and governance

The ontology is versioned and governed according to:

- `GOVERNANCE.md`
- `/rfcs/`
- `LICENSE.md` (Ethical Use)

Breaking changes require an approved RFC.

---

## Next steps

- See [`mcp.md`](MCP.md) to integrate SCE with Model Context Protocol.
- See [`GETTING-STARTED.md`](GETTING-STARTED.md) for examples and project templates.
