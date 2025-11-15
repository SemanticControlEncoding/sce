import type { SceOntologyBase } from "./types";

export const SemanticOntologySchema = {
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
