# 🧩 SCE — Semantic Communication Encoding

_SCE (Semantic Communication Encoding)_ is a lightweight symbolic ontology that enables **humans, LLMs, and automated systems** to communicate meaning using a compact set of standardized emoji-based semantic operators.

Instead of relying solely on natural language — which is ambiguous, verbose, and difficult for machines to interpret consistently — SCE provides a structured vocabulary where each emoji carries an explicit role, definition, and usage rule.

> 🧠 Think of SCE as **a cross-lingual shorthand layer between reasoning and expression** — useful in prompting, annotation, classification, compliance workflows, legal review, decision trees, and automated reasoning systems.

---

## 🚀 Why SCE Exists

Existing large language systems understand emojis implicitly — but there is **no global shared semantic contract** that defines what they _mean_.

SCE solves that problem by providing:

- A **machine-readable ontology** (TypeScript schema)
- A **runtime interpreter** that can parse and resolve meanings from text
- A **validation layer** to ensure semantic consistency
- A **lookup and extraction API** for tool builders

This makes semantic signals:

- **Readable by humans**
- **Interpretable by LLMs**
- **Executable by downstream tools**

---

## 📦 Core Features

| Capability                                       |    Supported     |
| ------------------------------------------------ | :--------------: |
| Extract emojis from text                         |        ✅        |
| Map emojis → formal definition                   |        ✅        |
| Validate ontology uniqueness & structure         |        ✅        |
| Use ontology programmatically (TypeScript types) |        ✅        |
| Generate emoji → meaning lookup table            |        ✅        |
| Extend or replace the ontology                   | 🔧 Yes (modular) |

---

## 📚 Ontology Structure

The ontology is divided into semantic domains, each containing symbol definitions:

```ts
export const SemanticOntologySchema = {
  structure: { ... },
  legalPolicy: { ... },
  reasoning: { ... },
  tasks: { ... },
  privacy: { ... },
  actors: { ... },
  state: { ... },
  control: { ... },
} as const;
```

Each definition adheres to:

```ts
interface SceSymbolDefinition {
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

## 🔍 Runtime API

Import the interpreter:

```ts
import { interpreter, getDefinitionsFromText } from "semanticencoding";
```

### Extract meaning from free-form text

```ts
const text = "📝 Notify parents of outcome. ⏳ Pending response.";
const result = getDefinitionsFromText(text);

console.log(result);
```

➡️ This returns structured semantic metadata for each symbol found.

### Parse raw emoji arrays

```ts
interpreter().forEmojis(["📎", "⏳"]);
```

---

## 🧪 Ontology Validation

Validate your ontology instance to ensure:

- No duplicate emojis
- Required metadata exists
- allowedContext values are valid

```ts
import { validateOntology } from "semanticencoding";

console.log(validateOntology());
// → [] if no issues
```

---

## 🧭 Emoji Map Utility

Useful when embedding semantic references in front-end UIs or prompts:

```ts
import { SemanticOntologyEmojiMap } from "semanticencoding";

console.log(SemanticOntologyEmojiMap.tasks);
// → { action: '📝', todo: '☐', complete: '✅', ... }
```

---

## 🧱 Extending SCE

SCE is intentionally modular and can be extended or forked:

```ts
import { interpreter } from "semanticencoding";

const CustomOntology = {
  ...SemanticOntologySchema,
  domain: { debug: { emoji: "🛠️", ... } }
};

const customInterpreter = interpreter(CustomOntology);
```

---

## 📍 Intended Use Cases

- Prompt engineering & LLM semantic signaling
- Document annotation / legal review workflows
- AI-assisted compliance and investigation tooling
- Knowledge representation / reasoning frameworks
- Case management and structured task systems
- Human–AI collaborative decision making
- Machine reasoning pipelines

---

## 🗺 Roadmap

| Stage                                       | Status          |
| ------------------------------------------- | --------------- |
| v1 Core Ontology                            | ✔️ Complete     |
| Validator + Interpreter                     | ✔️ Complete     |
| Prompt-side decoding utility                | 🚧 In progress  |
| AI-assisted ontology expansion              | 🧪 Experimental |
| Plugin format (VSCode / Obsidian / ChatGPT) | Planned         |
| Community symbol proposals                  | Planned         |

---

## 💡 Vision

SCE aims to become **an open semantic layer** enabling LLM-native communication protocols — similar to:

- Markdown (structure)
- Unicode (universality)
- RFC communication standards

…but optimized for **compressed meaning**, **machine parsing**, and **human ergonomics**.

---

## 📄 License

[SCE Ethical Use License](LICENSE)

---

## 🤝 Contributing

Contribution guidelines and governance are available [online](https://semanticencoding.github.io/sce/CONTRIBUTING/) or
in the repository documentation - [CONTRIBUTING](docs/CONTRIBUTING.md) [GOVERNANCE](docs/GOVERNANCE.md)

Initial plans include:

- Symbol Proposal Process (SPP)
- Backward-compatibility guarantees
- Domain stewardship model

---

## 🏁 Quick Demo

> Input:

```
📌 Student harmed on 11/06/24
🔍 Investigate witness list
☐ Notify OCR
⏳ Await reply
```

> Parsed output:

```json
[
  { "emoji": "📌", "role": "STRUCTURE", "meaning": "Pinned fact..." },
  { "emoji": "🔍", "role": "REASONING", "meaning": "Analysis step..." },
  { "emoji": "☐", "role": "TASK", "meaning": "Uncompleted action..." },
  { "emoji": "⏳", "role": "STATE", "meaning": "Pending action..." }
]
```

---

## 🧠 Project Status: **Active Prototype**

You are looking at a **working draft of a standard**.

If this resonates — help shape it. More information is available [online](https://semanticencoding.github.io/sce) and at our [repository](https://github.com/SemanticEncoding/sce).
