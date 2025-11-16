import { validateOntology } from "../src/validator";

describe("validateOntology (default schema)", () => {
  it("returns no errors for the provided SemanticOntologySchema", () => {
    const errors = validateOntology();
    expect(Array.isArray(errors)).toBe(true);
    expect(errors).toHaveLength(0);
  });
});

describe("validateOntology (custom ontologies)", () => {
  it("detects missing emoji and empty allowedContext", () => {
    const bad = {
      structure: {
        block: {
          emoji: "",
          role: "STRUCTURE",
          meaning: "Broken",
          allowedContext: [],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      legalPolicy: {
        rule: {
          emoji: "📘",
          role: "LEGAL",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      reasoning: {
        analyze: {
          emoji: "🧐",
          role: "REASONING",
          meaning: "OK",
          allowedContext: ["LLM"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      tasks: {
        action: {
          emoji: "📝",
          role: "TASK",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "REQUIRED",
          conflictsWith: [],
          example: "",
        },
      },
      privacy: {
        private: {
          emoji: "🔐",
          role: "PRIVACY",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "CONDITIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      actors: {
        generic: {
          emoji: "👤",
          role: "ACTOR",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      state: {
        pending: {
          emoji: "⏳",
          role: "STATE",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "CONDITIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      control: {
        next: {
          emoji: "⏭️",
          role: "CONTROL",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
    } as const;

    const errors = validateOntology(bad as any);
    expect(
      errors.some((e) => /Missing emoji at structure\.block/.test(e))
    ).toBe(true);
    expect(
      errors.some((e) =>
        /allowedContext must be non-empty array at structure\.block/.test(e)
      )
    ).toBe(true);
  });

  it("detects duplicate emoji usage across categories", () => {
    // Reuse one emoji twice to trigger duplicate detection
    const duplicateEmoji = "🔍";

    const dup = {
      structure: {
        first: {
          emoji: duplicateEmoji,
          role: "STRUCTURE",
          meaning: "First",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      legalPolicy: {
        rule: {
          emoji: "📘",
          role: "LEGAL",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      reasoning: {
        analyze: {
          emoji: duplicateEmoji,
          role: "REASONING",
          meaning: "Duplicate",
          allowedContext: ["LLM"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      tasks: {
        action: {
          emoji: "📝",
          role: "TASK",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "REQUIRED",
          conflictsWith: [],
          example: "",
        },
      },
      privacy: {
        private: {
          emoji: "🔐",
          role: "PRIVACY",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "CONDITIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      actors: {
        generic: {
          emoji: "👤",
          role: "ACTOR",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      state: {
        pending: {
          emoji: "⏳",
          role: "STATE",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "CONDITIONAL",
          conflictsWith: [],
          example: "",
        },
      },
      control: {
        next: {
          emoji: "⏭️",
          role: "CONTROL",
          meaning: "OK",
          allowedContext: ["HUMAN"],
          usage: "OPTIONAL",
          conflictsWith: [],
          example: "",
        },
      },
    } as const;

    const errors = validateOntology(dup as any);
    // Expect at least one duplicate emoji error mentioning both paths
    const dupMsg = errors.find((e) => /Duplicate emoji/.test(e));
    expect(dupMsg).toBeDefined();
    expect(dupMsg).toMatch(
      /Duplicate emoji .* at reasoning\.analyze, already used at structure\.first/
    );
  });
});
