#!/usr/bin/env node
/**
 * @module cli
 * @description
 * Command-line interface for the SCE (Semantic Control Encoding) system.
 *
 * This CLI tool enables users to extract and inspect SCE emoji symbols from freeform text
 * via the command line, supporting both interactive and piped workflows.
 *
 * **Features:**
 * - Extract and explain SCE symbols from text arguments or stdin
 * - Output formats: pretty-printed human-readable or JSON
 * - Pipe-friendly for integration with other command-line tools
 * - Built-in help and usage documentation
 *
 * **Commands:**
 * - `explain` — Pretty-print recognized symbols with full metadata
 * - `json` — Output raw JSON array of symbol definitions
 * - `help` — Display usage information
 *
 * **Input Sources:**
 * - Command-line arguments: `sce explain "Task 📝 is pending ⏳"`
 * - Standard input (piped): `echo "Review 🔍 the data" | sce explain`
 *
 * @example
 * ```bash
 * # Pretty-print symbols from text argument
 * sce explain "Task 📝 is pending ⏳ and requires review 🔍."
 *
 * # Output JSON format
 * sce json "Task 📝 is pending ⏳"
 *
 * # Read from stdin (pipe)
 * echo "Task 📝 is pending ⏳" | sce explain
 *
 * # Display help
 * sce --help
 * ```
 */

import { getDefinitionsFromText } from "./interpreter.js";

/**
 * Output format options for CLI display.
 *
 * - `pretty` — Human-readable formatted output with symbol metadata
 * - `json` — Raw JSON array of symbol definitions
 */
type OutputFormat = "pretty" | "json";

/**
 * Parsed command-line options.
 *
 * @property command - The CLI command to execute
 * @property text - Optional input text (from arguments; if undefined, read from stdin)
 * @property format - Desired output format
 */
interface CliOptions {
  command: "explain" | "json" | "help";
  text?: string;
  format: OutputFormat;
}

/**
 * Parses command-line arguments into structured CLI options.
 *
 * Supports multiple invocation patterns:
 * - Explicit command: `sce explain "text"`, `sce json "text"`
 * - Help flags: `sce --help`, `sce -h`, `sce help`
 * - Implicit explain: `sce "text"` (defaults to explain command)
 * - No arguments: shows help
 *
 * @param argv - Process arguments array (typically `process.argv`)
 * @returns Parsed {@link CliOptions} object
 *
 * @example
 * ```typescript
 * // Explicit explain
 * parseArgs(['node', 'cli.js', 'explain', 'Task 📝']);
 * // { command: 'explain', text: 'Task 📝', format: 'pretty' }
 *
 * // JSON output
 * parseArgs(['node', 'cli.js', 'json', 'Task 📝']);
 * // { command: 'json', text: 'Task 📝', format: 'json' }
 *
 * // Implicit explain (no command)
 * parseArgs(['node', 'cli.js', 'Task 📝']);
 * // { command: 'explain', text: 'Task 📝', format: 'pretty' }
 *
 * // Help
 * parseArgs(['node', 'cli.js', '--help']);
 * // { command: 'help', format: 'pretty' }
 * ```
 */
function parseArgs(argv: string[]): CliOptions {
  const args = argv.slice(2); // skip node + script
  if (args.length === 0) {
    return { command: "help", format: "pretty" };
  }

  const [commandRaw, ...rest] = args;
  const command = (commandRaw || "").toLowerCase();

  if (command === "explain" || command === "json") {
    const textArg = rest.join(" ").trim() || undefined;
    return {
      command: command as "explain" | "json",
      text: textArg,
      format: command === "json" ? "json" : "pretty",
    };
  }

  if (command === "-h" || command === "--help" || command === "help") {
    return { command: "help", format: "pretty" };
  }

  // Default to explain if they omit the subcommand
  return {
    command: "explain",
    text: [commandRaw, ...rest].join(" "),
    format: "pretty",
  };
}

/**
 * Reads input text from standard input (stdin).
 *
 * Returns immediately with an empty string if stdin is a TTY (interactive terminal),
 * otherwise reads all available data from the stream.
 *
 * Useful for piped input: `echo "text" | sce explain`
 *
 * @returns Promise resolving to the complete stdin content as a string
 *
 * @example
 * ```typescript
 * // When piped: echo "Task 📝" | node cli.js
 * const text = await readStdin();
 * console.log(text); // "Task 📝\n"
 *
 * // When interactive (TTY)
 * const text = await readStdin();
 * console.log(text); // ""
 * ```
 */
function readStdin(): Promise<string> {
  return new Promise((resolve) => {
    let data = "";
    if (process.stdin.isTTY) {
      return resolve("");
    }
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => (data += chunk));
    process.stdin.on("end", () => resolve(data));
  });
}

/**
 * Prints usage and help information to the console.
 *
 * Displays:
 * - CLI name and purpose
 * - Usage examples for each command
 * - Available commands and their descriptions
 * - Information about stdin input support
 *
 * @example
 * ```typescript
 * printHelp();
 * // Outputs:
 * // SCE — Semantic Communication Encoding CLI
 * //
 * // Usage:
 * //   sce explain "Task 📝 is pending ⏳ and requires review 🔍."
 * //   ...
 * ```
 */
function printHelp() {
  const help = `
SCE — Semantic Communication Encoding CLI

Usage:
  sce explain "Task 📝 is pending ⏳ and requires review 🔍."
  echo "Task 📝 is pending ⏳" | sce explain
  sce json "Task 📝 is pending ⏳ and requires review 🔍."

Commands:
  explain    Pretty-print all recognized SCE symbols in the input text.
  json       Output raw JSON array of symbol definitions.

If no text argument is provided, the CLI will read from stdin.
  `.trim();

  console.log(help);
}

/**
 * Prints symbol definitions in a human-readable format.
 *
 * Each symbol is displayed with:
 * - Emoji and meaning (always shown)
 * - Role category (if present)
 * - Allowed contexts (if present)
 * - Usage requirement level (if present)
 * - Conflicting emojis (if any)
 * - Usage example (if present)
 *
 * If no definitions are provided, prints a "No SCE symbols found" message.
 *
 * @param defs - Array of symbol definition objects (typically from {@link getDefinitionsFromText})
 *
 * @example
 * ```typescript
 * const defs = [
 *   {
 *     emoji: "🔍",
 *     meaning: "Analysis, search, or inspection",
 *     role: "REASONING",
 *     allowedContext: ["HUMAN", "LLM", "TOOL"],
 *     usage: "OPTIONAL",
 *     conflictsWith: ["✅", "☑️"],
 *     example: "🔍 Verify whether all witnesses were interviewed."
 *   }
 * ];
 *
 * printPretty(defs);
 * // Outputs:
 * // 🔍  Analysis, search, or inspection
 * //   role:     REASONING
 * //   context:  HUMAN, LLM, TOOL
 * //   usage:    OPTIONAL
 * //   conflicts: ✅ ☑️
 * //   example:  🔍 Verify whether all witnesses were interviewed.
 * ```
 */
function printPretty(defs: any[]) {
  if (defs.length === 0) {
    console.log("No SCE symbols found.");
    return;
  }

  for (const def of defs) {
    console.log(`\n${def.emoji}  ${def.meaning}`);
    if (def.role) {
      console.log(`  role:     ${def.role}`);
    }
    if (Array.isArray(def.allowedContext)) {
      console.log(`  context:  ${def.allowedContext.join(", ")}`);
    }
    if (def.usage) {
      console.log(`  usage:    ${def.usage}`);
    }
    if (Array.isArray(def.conflictsWith) && def.conflictsWith.length > 0) {
      console.log(`  conflicts: ${def.conflictsWith.join(" ")}`);
    }
    if (def.example) {
      console.log(`  example:  ${def.example}`);
    }
  }
}

/**
 * Main CLI entry point.
 *
 * Orchestrates the CLI workflow:
 * 1. Parse command-line arguments into {@link CliOptions}
 * 2. Handle help command if requested
 * 3. Gather input text from arguments or stdin
 * 4. Extract SCE symbol definitions using {@link getDefinitionsFromText}
 * 5. Output results in the requested format (JSON or pretty-printed)
 *
 * Sets `process.exitCode = 1` on error (missing input, exceptions).
 *
 * @async
 * @returns Promise that resolves when CLI execution completes
 *
 * @example
 * ```typescript
 * // Invoked automatically when script runs
 * // node cli.js explain "Task 📝 is pending ⏳"
 *
 * await main();
 * // Outputs pretty-printed symbol definitions
 * ```
 */
async function main() {
  const opts = parseArgs(process.argv);

  if (opts.command === "help") {
    printHelp();
    return;
  }

  let text = opts.text;
  if (!text) {
    text = (await readStdin()).trim();
  }

  if (!text) {
    console.error("No input text provided (argument or stdin).");
    printHelp();
    process.exitCode = 1;
    return;
  }

  const defs = getDefinitionsFromText(text);

  if (opts.format === "json" || opts.command === "json") {
    console.log(JSON.stringify(defs, null, 2));
  } else {
    printPretty(defs);
  }
}

main().catch((err) => {
  console.error("Error:", err);
  process.exitCode = 1;
});
