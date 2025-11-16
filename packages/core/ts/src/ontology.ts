/**
 * @module ontology
 * @description
 * Defines the canonical Semantic Control Encoding (SCE) ontology schema.
 *
 * This module contains {@link SemanticOntologySchema}, a comprehensive, structured
 * vocabulary of emoji-based semantic symbols organized into eight categories:
 * - **structure** — Document organization (sections, pinned facts, references)
 * - **legalPolicy** — Legal frameworks, citations, compliance records, authorities
 * - **reasoning** — Analysis, insights, investigations
 * - **tasks** — Actionable items and completion states
 * - **privacy** — Data sensitivity and access control
 * - **actors** — People, roles, and organizations
 * - **state** — Process states and status indicators
 * - **control** — Workflow control flow and navigation
 *
 * Each symbol definition includes:
 * - `emoji` — The Unicode emoji representing the symbol
 * - `role` — The category role (STRUCTURE, LEGAL, REASONING, TASK, PRIVACY, ACTOR, STATE, CONTROL)
 * - `meaning` — Human-readable explanation of the symbol's purpose
 * - `allowedContext` — Where the symbol can be used (HUMAN, LLM, TOOL)
 * - `usage` — Whether the symbol is REQUIRED, OPTIONAL, or CONDITIONAL
 * - `conflictsWith` — List of emojis that should not appear with this one
 * - `example` — Real-world usage example
 *
 * The schema is declared with `as const satisfies SceOntologyBase` to ensure:
 * - Strict type safety with literal types
 * - Compile-time validation against the base ontology structure
 * - Accurate type inference for all derived utilities
 *
 * @example
 * ```typescript
 * import { SemanticOntologySchema } from '@sce/core';
 *
 * // Access category definitions
 * const analyzeSymbol = SemanticOntologySchema.reasoning.analyze;
 * console.log(analyzeSymbol.emoji);    // "🔍"
 * console.log(analyzeSymbol.meaning);  // "Analysis, search, or inspection of facts or records"
 *
 * // Iterate over categories
 * for (const [categoryName, category] of Object.entries(SemanticOntologySchema)) {
 *   console.log(`Category: ${categoryName}`);
 *   for (const [key, def] of Object.entries(category)) {
 *     console.log(`  ${def.emoji} ${key}: ${def.meaning}`);
 *   }
 * }
 * ```
 */

import type { SceOntologyBase } from "./types";

/**
 * The canonical SCE (Semantic Control Encoding) ontology schema.
 *
 * This constant defines the complete vocabulary of emoji-based semantic symbols
 * used for structured communication in legal, educational, and compliance contexts.
 *
 * The schema is organized into eight top-level categories, each containing
 * multiple symbol definitions with rich metadata about their usage, context,
 * conflicts, and examples.
 *
 * **Design Principles:**
 * - Each emoji maps to exactly one semantic meaning
 * - Symbols are organized by functional category
 * - Context restrictions ensure appropriate usage
 * - Conflict rules prevent semantic ambiguity
 * - Examples demonstrate real-world application
 *
 * **Type Safety:**
 * Declared as `const` with `satisfies SceOntologyBase` to provide:
 * - Literal type inference for all emoji strings
 * - Compile-time validation of structure
 * - Strong typing for derived utilities
 *
 * @example
 * ```typescript
 * import { SemanticOntologySchema } from '@sce/core';
 *
 * // Type-safe category access
 * const reasoning = SemanticOntologySchema.reasoning;
 * const analyzeEmoji = reasoning.analyze.emoji; // "🔍"
 *
 * // Discover symbol metadata
 * const action = SemanticOntologySchema.tasks.action;
 * console.log(`${action.emoji} is ${action.usage}`);        // "📝 is REQUIRED"
 * console.log(`Context: ${action.allowedContext.join(', ')}`); // "HUMAN, LLM, TOOL"
 * console.log(`Conflicts: ${action.conflictsWith.join(', ')}`); // "📌"
 * ```
 */
export const SemanticOntologySchema = {
  /**
   * **Structure Category**
   *
   * Symbols for organizing documents and prompts into logical sections,
   * marking pinned facts, and referencing external sources.
   *
   * Contains:
   * - `section` (🗂️) — Major document/prompt segment dividers
   * - `pinned` (📌) — Non-negotiable constraints and established facts
   * - `reference` (📎) — Citations and source references
   */
  structure: {
    section: {
      emoji: "🗂️",
      role: "STRUCTURE",
      meaning: "Section divider for major document or prompt segments",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["📌", "📎"],
      example: "🗂️ Investigation Timeline",
    },
    pinned: {
      emoji: "📌",
      role: "STRUCTURE",
      meaning: "Pinned fact or non-negotiable constraint that must remain true",
      allowedContext: ["HUMAN", "LLM"],
      usage: "REQUIRED",
      conflictsWith: ["🗂️", "📎"],
      example: "📌 Student was injured on 11/06/24 while on school grounds.",
    },
    reference: {
      emoji: "📎",
      role: "STRUCTURE",
      meaning: "Reference or citation marker to a document, exhibit, or source",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "OPTIONAL",
      conflictsWith: ["🗂️", "📌"],
      example: "📎 See Incident Report #14 for witness statements.",
    },
  },

  /**
   * **Legal & Policy Category**
   *
   * Symbols for legal frameworks, regulatory citations, compliance evidence,
   * and institutional authorities.
   *
   * Contains:
   * - `law` (⚖️) — Legal frameworks and governing authorities
   * - `citation` (📜) — Statutory, regulatory, or policy citations
   * - `complianceRecord` (🧾) — Evidence of compliance actions
   * - `institutionAuthority` (🏛️) — Enforcement bodies and institutions
   */
  legalPolicy: {
    law: {
      emoji: "⚖️",
      role: "LEGAL",
      meaning: "Legal framework or authority governing the analysis",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: [],
      example: "⚖️ Title IX §106.45 governs the grievance process.",
    },
    citation: {
      emoji: "📜",
      role: "LEGAL",
      meaning: "Citation of a statute, regulation, or formal policy text",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "📜 34 C.F.R. § 99.10 describes the right to inspect education records.",
    },
    complianceRecord: {
      emoji: "🧾",
      role: "LEGAL",
      meaning:
        "Evidence of compliance, notification, or record of an action taken",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "🧾 Written notice of allegations was sent to the complainant on 11/20/24.",
    },
    institutionAuthority: {
      emoji: "🏛️",
      role: "LEGAL",
      meaning:
        "Institution, enforcement body, or formal authority involved in the matter",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "🏛️ The Office for Civil Rights (OCR) may review the district’s conduct.",
    },
  },

  /**
   * **Reasoning Category**
   *
   * Symbols for analytical processes, insights, and investigations.
   *
   * Contains:
   * - `analyze` (🔍) — Analysis, search, or fact inspection
   * - `insight` (🧠) — Reasoning and interpretation based on facts
   * - `investigate` (🕵️) — Investigative steps and unresolved questions
   */
  reasoning: {
    analyze: {
      emoji: "🔍",
      role: "REASONING",
      meaning: "Analysis, search, or inspection of facts or records",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "OPTIONAL",
      conflictsWith: ["✅", "☑️"],
      example:
        "🔍 Verify whether all witnesses identified by the complainant were interviewed.",
    },
    insight: {
      emoji: "🧠",
      role: "REASONING",
      meaning:
        "Reasoning, interpretation, or insight based on established facts",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["📌"],
      example:
        "🧠 The delay in providing records suggests potential non-compliance with FERPA timelines.",
    },
    investigate: {
      emoji: "🕵️",
      role: "REASONING",
      meaning:
        "Investigative step, determination required, or unresolved question",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "CONDITIONAL",
      conflictsWith: ["✅"],
      example:
        "🕵️ Determine whether a mandated reporter submitted a maltreatment report after the incident.",
    },
  },

  /**
   * **Tasks Category**
   *
   * Symbols for actionable items, task states, and completion tracking.
   *
   * Contains:
   * - `action` (📝) — Actionable instructions or required tasks
   * - `todo` (☐) — Unchecked items not yet started
   * - `softComplete` (☑️) — Completed but not formally verified
   * - `complete` (✅) — Fully completed and verified
   * - `repeat` (🔁) — Recurring or retry steps
   */
  tasks: {
    action: {
      emoji: "📝",
      role: "TASK",
      meaning: "Actionable instruction or task that should be performed",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "REQUIRED",
      conflictsWith: ["📌"],
      example:
        "📝 Notify the complainant in writing of available supportive measures.",
    },
    todo: {
      emoji: "☐",
      role: "TASK",
      meaning: "Unchecked task or item that has not yet been started",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: ["☑️", "✅"],
      example: "☐ Document all interim measures offered to the complainant.",
    },
    softComplete: {
      emoji: "☑️",
      role: "TASK",
      meaning: "Task marked as completed but not yet formally verified",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: ["☐", "✅"],
      example:
        "☑️ Drafted written notice of allegations (awaiting legal review).",
    },
    complete: {
      emoji: "✅",
      role: "TASK",
      meaning: "Task fully completed and verified as compliant",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "CONDITIONAL",
      conflictsWith: ["☐", "☑️", "🕵️"],
      example: "✅ Provided final written determination to both parties.",
    },
    repeat: {
      emoji: "🔁",
      role: "TASK",
      meaning: "Repeat, retry, or recurring procedural step",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "🔁 Review supportive measures every 30 days for continued adequacy.",
    },
  },

  /**
   * **Privacy Category**
   *
   * Symbols for data sensitivity, access control, and privacy states.
   *
   * Contains:
   * - `private` (🔐) — Protected information subject to privacy laws
   * - `authorized` (🗝️) — Authorized access under privacy rules
   * - `open` (🔓) — Public or non-sensitive information
   */
  privacy: {
    private: {
      emoji: "🔐",
      role: "PRIVACY",
      meaning: "Protected or sensitive information subject to privacy laws",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "CONDITIONAL",
      conflictsWith: ["🔓"],
      example: "🔐 Do not store student medical information in this task list.",
    },
    authorized: {
      emoji: "🗝️",
      role: "PRIVACY",
      meaning: "Authorized access exists under applicable privacy rules",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example: "🗝️ Parent access is permitted under FERPA and MN Statute 13.",
    },
    open: {
      emoji: "🔓",
      role: "PRIVACY",
      meaning: "Information is open, non-sensitive, or publicly available",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "CONDITIONAL",
      conflictsWith: ["🔐"],
      example: "🔓 Public policies may be quoted or stored without redaction.",
    },
  },

  /**
   * **Actors Category**
   *
   * Symbols representing people, roles, and organizational entities.
   *
   * Contains:
   * - `generic` (👤) — Unspecified person or actor
   * - `student` (🧑‍🎓) — Student (complainant, respondent, or peer)
   * - `teacher` (🧑‍🏫) — Teachers, staff, or school employees
   * - `legalAuthority` (🧑‍⚖️) — Investigators, decision-makers, adjudicators
   * - `organization` (🏢) — Organizations, districts, schools, institutions
   */
  actors: {
    generic: {
      emoji: "👤",
      role: "ACTOR",
      meaning: "Generic person or actor with unspecified role",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["🧑‍🎓", "🧑‍🏫", "🧑‍⚖️"],
      example: "👤 A witness reported seeing the incident.",
    },
    student: {
      emoji: "🧑‍🎓",
      role: "ACTOR",
      meaning: "Student (complainant, respondent, or peer)",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: ["👤"],
      example: "🧑‍🎓 The complainant reported ongoing unwanted touching.",
    },
    teacher: {
      emoji: "🧑‍🏫",
      role: "ACTOR",
      meaning: "Teacher, staff member, or school employee",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: ["👤"],
      example: "🧑‍🏫 The supervising teacher reports not observing the incident.",
    },
    legalAuthority: {
      emoji: "🧑‍⚖️",
      role: "ACTOR",
      meaning: "Investigatior, decision-maker, or adjudicator",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["👤"],
      example: "🧑‍⚖️ The decision-maker must evaluate the evidence impartially.",
    },
    organization: {
      emoji: "🏢",
      role: "ACTOR",
      meaning: "Organization, district, school, or institution",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "🏢 The district is responsible for maintaining investigation records.",
    },
  },

  /**
   * **State Category**
   *
   * Symbols for process states, conditions, and status indicators.
   *
   * Contains:
   * - `pending` (⏳) — Pending, in-progress, or awaiting dependencies
   * - `unclear` (❓) — Unclear, incomplete, or requiring clarification
   * - `warning` (⚠️) — Risks, concerns, or exceptions requiring attention
   * - `prohibited` (❌) — Prohibited, non-compliant, or invalid conditions
   */
  state: {
    pending: {
      emoji: "⏳",
      role: "STATE",
      meaning: "Pending, in-progress, or awaiting dependency",
      allowedContext: ["HUMAN", "LLM", "TOOL"],
      usage: "CONDITIONAL",
      conflictsWith: ["❌", "✅"],
      example: "⏳ Awaiting response from the Title IX coordinator.",
    },
    unclear: {
      emoji: "❓",
      role: "STATE",
      meaning: "Unclear, incomplete, or requiring clarification",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: [],
      example: "❓ It is unclear whether a mandated report was filed.",
    },
    warning: {
      emoji: "⚠️",
      role: "STATE",
      meaning: "Risk, concern, or exception requiring attention",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: [],
      example: "⚠️ No safety plan was implemented despite ongoing contact.",
    },
    prohibited: {
      emoji: "❌",
      role: "STATE",
      meaning: "Prohibited, non-compliant, or invalid action or condition",
      allowedContext: ["HUMAN", "LLM"],
      usage: "CONDITIONAL",
      conflictsWith: ["✅"],
      example:
        "❌ Dismissing the complaint without reviewing evidence violates procedure.",
    },
  },

  /**
   * **Control Category**
   *
   * Symbols for workflow control flow and navigation.
   *
   * Contains:
   * - `decisionPoint` (🔀) — Decision points or branching logic
   * - `next` (⏭️) — Move to next step, phase, or workflow position
   * - `back` (⏮️) — Return to previous step or earlier context
   */
  control: {
    decisionPoint: {
      emoji: "🔀",
      role: "CONTROL",
      meaning: "Decision point or branching logic in a process",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: [],
      example:
        "🔀 If the respondent cannot be identified, follow alternative safety procedures.",
    },
    next: {
      emoji: "⏭️",
      role: "CONTROL",
      meaning: "Move to the next step, phase, or workflow position",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["⏮️"],
      example: "⏭️ Continue to evaluate access to evidence.",
    },
    back: {
      emoji: "⏮️",
      role: "CONTROL",
      meaning: "Return to a previous step or earlier context",
      allowedContext: ["HUMAN", "LLM"],
      usage: "OPTIONAL",
      conflictsWith: ["⏭️"],
      example: "⏮️ Revisit the original complaint before continuing.",
    },
  },
} as const satisfies SceOntologyBase;
