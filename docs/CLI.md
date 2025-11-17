# CLI Reference

The SCE command-line interface provides direct access to symbol extraction, validation, and ontology inspection from your terminal.

---

## Installation

### Global installation (recommended)

```bash
npm install -g semanticencoding
```

Once installed, the `sce` command is available system-wide:

```bash
sce explain "Task 📝 is pending ⏳"
```

### One-time usage with npx

```bash
npx semanticencoding explain "Task 📝 is pending ⏳"
```

### Local development

```bash
# From the monorepo root
pnpm install
pnpm run build

# Run the CLI
pnpm sce explain "Task 📝 is pending ⏳"
```

---

## Commands

### `explain` — Extract and interpret symbols

Extracts all SCE symbols from input text and displays their definitions in a human-readable format.

**Usage:**

```bash
sce explain "Task 📝 is pending ⏳ and requires review 🔍."
```

**Output:**

```
📝  Action required / task item
  role:     TASK
  context:  HUMAN, LLM, TOOL
  usage:    REQUIRED
  conflicts: ☑️ ✅
  example:  📝 Schedule follow-up meeting with counsel.

⏳  Pending / in-progress state
  role:     STATE
  context:  HUMAN, LLM, TOOL
  usage:    OPTIONAL
  conflicts: ✅ ❌
  example:  ⏳ Awaiting disciplinary response.

🔍  Analysis, search, or inspection
  role:     REASONING
  context:  HUMAN, LLM, TOOL
  usage:    OPTIONAL
  conflicts: ✅ ☑️
  example:  🔍 Verify whether all witnesses were interviewed.
```

**Reading from stdin:**

```bash
echo "Review 🔍 the incident data" | sce explain
```

```bash
cat incident-report.txt | sce explain
```

---

### `json` — Output structured JSON

Returns a JSON array of symbol definitions, suitable for automation pipelines and programmatic parsing.

**Usage:**

```bash
sce json "Task 📝 is pending ⏳"
```

**Output:**

```json
[
  {
    "emoji": "📝",
    "role": "TASK",
    "meaning": "Action required / task item",
    "allowedContext": ["HUMAN", "LLM", "TOOL"],
    "usage": "REQUIRED",
    "conflictsWith": ["☑️", "✅"],
    "example": "📝 Schedule follow-up meeting with counsel."
  },
  {
    "emoji": "⏳",
    "role": "STATE",
    "meaning": "Pending / in-progress state",
    "allowedContext": ["HUMAN", "LLM", "TOOL"],
    "usage": "OPTIONAL",
    "conflictsWith": ["✅", "❌"],
    "example": "⏳ Awaiting disciplinary response."
  }
]
```

**Piping to other tools:**

```bash
sce json "Task 📝 is pending ⏳" | jq '.[].emoji'
# Output: "📝" "⏳"
```

---

### `help` — Display usage information

```bash
sce help
# or
sce --help
# or
sce -h
```

**Output:**

```
SCE — Semantic Communication Encoding CLI

Usage:
  sce explain "Task 📝 is pending ⏳ and requires review 🔍."
  echo "Task 📝 is pending ⏳" | sce explain
  sce json "Task 📝 is pending ⏳ and requires review 🔍."

Commands:
  explain    Pretty-print all recognized SCE symbols in the input text.
  json       Output raw JSON array of symbol definitions.

If no text argument is provided, the CLI will read from stdin.
```

---

## Input methods

### Command-line arguments

Pass text directly as arguments:

```bash
sce explain "Task 📝 requires approval"
```

### Standard input (stdin)

Pipe text from another command or file:

```bash
# From echo
echo "Review 🔍 complete" | sce explain

# From file
cat notes.txt | sce explain

# From heredoc
sce explain << EOF
📌 Deadline: November 30
⏳ Pending review
📝 Follow up with legal team
EOF
```

---

## Common workflows

### Validating ontology during development

```bash
# Check for issues in the ontology
sce validate

# Example output (if issues exist):
# ❌ Ontology issues found (2)
#
# • ⚠️ Duplicate emoji: "☑️"
# • 🔍 Missing example field for "🕵️"
```

### Extracting symbols from meeting notes

```bash
cat meeting-notes.md | sce json > extracted-symbols.json
```

### Reviewing symbols in a document

```bash
sce explain "$(cat project-plan.md)"
```

### Pipeline integration

```bash
# Extract emojis, filter by role, and count
sce json "📌 Required. ⏳ Delayed. 📝 Action needed." \
  | jq '[.[] | select(.role == "TASK")] | length'
# Output: 1
```

---

## Tips and best practices

### Use quotes for multi-word input

```bash
# ✅ Correct
sce explain "Task 📝 is pending ⏳"

# ❌ Incorrect (shell will split arguments)
sce explain Task 📝 is pending ⏳
```

### Pipe for processing large files

```bash
# Efficient for large documents
cat large-document.txt | sce json
```

### Combine with shell tools

```bash
# Count unique symbols in a document
cat document.txt | sce json | jq -r '.[].emoji' | sort -u | wc -l

# Find all STATE role symbols
cat notes.txt | sce json | jq '.[] | select(.role == "STATE")'
```

### Use in scripts

```bash
#!/bin/bash
# extract-symbols.sh

if [ -f "$1" ]; then
  sce json "$(cat "$1")" > "${1%.txt}-symbols.json"
  echo "Symbols extracted to ${1%.txt}-symbols.json"
else
  echo "Usage: $0 <file.txt>"
  exit 1
fi
```

---

## Exit codes

| Code | Meaning                                     |
| ---- | ------------------------------------------- |
| `0`  | Success — symbols found and extracted       |
| `0`  | Success (no symbols found, but valid input) |
| `1`  | Error — missing input or invalid command    |
| `1`  | Error — exception during execution          |

---

## Integration with other tools

### VS Code tasks

Add to `.vscode/tasks.json`:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Extract SCE symbols",
      "type": "shell",
      "command": "sce",
      "args": ["explain", "${input:text}"],
      "presentation": {
        "reveal": "always",
        "panel": "new"
      }
    }
  ],
  "inputs": [
    {
      "id": "text",
      "type": "promptString",
      "description": "Enter text to analyze for SCE symbols"
    }
  ]
}
```

### Git hooks

Validate commit messages for symbol consistency:

```bash
#!/bin/bash
# .git/hooks/commit-msg

COMMIT_MSG=$(cat "$1")
SYMBOLS=$(echo "$COMMIT_MSG" | sce json)

if echo "$SYMBOLS" | jq -e '.[] | select(.role == "INVALID")' > /dev/null; then
  echo "❌ Invalid SCE symbols detected in commit message"
  exit 1
fi
```

### MCP integration

The CLI shares the same interpreter engine as the MCP server. For LLM-driven workflows, see the [MCP documentation](MCP.md).

---

## Troubleshooting

### "command not found: sce"

**Solution:** Install globally or use `npx`:

```bash
npm install -g semanticencoding
# or
npx semanticencoding explain "text"
```

### No symbols detected

**Check that:**

- Text contains valid SCE emoji symbols
- Symbols are defined in the current ontology version
- Input text is properly quoted

```bash
# ✅ This works
sce explain "Task 📝 complete"

# ❌ This may not work (shell interpretation)
sce explain Task 📝 complete
```

### JSON output is malformed

**Verify:**

- Using the `json` command (not `explain`)
- Output isn't being truncated by the terminal
- No error messages mixed with JSON output

```bash
# Redirect stderr to separate errors from JSON
sce json "text" 2> errors.log > output.json
```

---

## Related documentation

- [Getting Started](GETTING-STARTED.md) — Quick introduction to SCE
- [MCP Integration](MCP.md) — Using SCE with LLM clients
- [Ontology API](ONTOLOGY-API.md) — Programmatic usage in TypeScript
- [Contributing](CONTRIBUTING.md) — How to extend or modify the CLI

---

## Next steps

- Explore the [MCP server](MCP.md) for LLM integration
- Review the [ontology structure](ONTOLOGY-API.md) to understand symbol definitions
- Try the [examples](https://github.com/SemanticEncoding/sce/tree/main/examples/ts) for real-world usage patterns
