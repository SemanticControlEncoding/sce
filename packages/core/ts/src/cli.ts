#!/usr/bin/env node
/**
 * SCE CLI
 *
 * Usage:
 *   sce explain "Task 📝 is pending ⏳ and requires review 🔍."
 *   echo "Task 📝 is pending ⏳" | sce explain
 *   sce json "Task 📝 is pending ⏳"
 */

import { getDefinitionsFromText } from "./interpreter.js";

type OutputFormat = "pretty" | "json";

interface CliOptions {
  command: "explain" | "json" | "help";
  text?: string;
  format: OutputFormat;
}

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
