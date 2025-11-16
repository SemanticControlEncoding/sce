import type { OutputFormat } from "../src/sce-mcp-server";

const mockGetDefinitionsFromText = jest.fn();
const mockValidateOntology = jest.fn();

jest.mock("../src/interpreter.js", () => ({
  getDefinitionsFromText: (...args: unknown[]) =>
    mockGetDefinitionsFromText(...args),
}));

jest.mock("../src/validator.js", () => ({
  validateOntology: () => mockValidateOntology(),
}));

describe("sce-mcp-server helpers", () => {
  let module: typeof import("../src/sce-mcp-server");
  const originalDescriptor = Object.getOwnPropertyDescriptor(
    process.stdout,
    "isTTY"
  );

  const setIsTTY = (value: boolean) => {
    Object.defineProperty(process.stdout, "isTTY", {
      configurable: true,
      enumerable: originalDescriptor?.enumerable ?? true,
      writable: true,
      value,
    });
  };

  beforeAll(async () => {
    process.env.SCE_MCP_SKIP_MAIN = "1";
    module = await import("../src/sce-mcp-server");
  });

  afterAll(() => {
    if (originalDescriptor) {
      Object.defineProperty(process.stdout, "isTTY", originalDescriptor);
    }
    delete process.env.SCE_MCP_SKIP_MAIN;
  });

  beforeEach(() => {
    mockGetDefinitionsFromText.mockReset();
    mockValidateOntology.mockReset();
    setIsTTY(true);
  });

  describe("resolveFormatType", () => {
    it("returns explicit format when provided", () => {
      expect(module.resolveFormatType({ type: "json" } as OutputFormat)).toBe(
        "json"
      );
    });

    it("detects pretty for TTY auto mode", () => {
      setIsTTY(true);
      expect(module.resolveFormatType(undefined)).toBe("pretty");
    });

    it("detects json for non-TTY auto mode", () => {
      setIsTTY(false);
      expect(module.resolveFormatType({ type: "auto" } as OutputFormat)).toBe(
        "json"
      );
    });
  });

  describe("shouldUseColor", () => {
    it("enables color by default when TTY", () => {
      setIsTTY(true);
      expect(module.shouldUseColor(undefined)).toBe(true);
    });

    it("disables color when requested or non-TTY", () => {
      setIsTTY(true);
      expect(module.shouldUseColor({ color: false })).toBe(false);
      setIsTTY(false);
      expect(module.shouldUseColor(undefined)).toBe(false);
    });
  });

  describe("renderPrettyExplain", () => {
    it("renders fallback when no symbols found", () => {
      const output = module.renderPrettyExplain("sample", [], true);
      expect(output).toContain("No SCE symbols found");
      expect(output).toContain("\u001b[2msample");
    });

    it("renders detailed symbol output", () => {
      const defs = [
        {
          emoji: "📝",
          meaning: "Task",
          role: "TASK",
          allowedContext: ["HUMAN"],
          usage: "REQUIRED",
          conflictsWith: ["⚠️"],
          example: "Complete the form.",
        },
      ];

      const output = module.renderPrettyExplain("Do this", defs, false);
      expect(output).toContain("SCE Symbols Detected");
      expect(output).toContain("- 📝  Task");
      expect(output).toContain("usage:   REQUIRED");
      expect(output).toContain("example: Complete the form.");
    });
  });

  describe("renderPrettyValidation", () => {
    it("confirms OK when no issues", () => {
      const output = module.renderPrettyValidation([], false);
      expect(output).toContain("Ontology validation: OK");
    });

    it("lists issues with ANSI when enabled", () => {
      const issues = [
        {
          message: "Missing emoji",
          path: ["structure", "heading"],
          severity: "error",
        },
      ];

      const output = module.renderPrettyValidation(issues, true);
      expect(output).toContain("\u001b[33m#1");
      expect(output).toContain("Missing emoji");
      expect(output).toContain('path:   ["structure","heading"]');
    });
  });

  describe("suggestSymbolsForText", () => {
    it("matches heuristics and deduplicates", () => {
      const text = "The student students must comply with law and should act.";
      const suggestions = module.suggestSymbolsForText(text);
      const emojis = suggestions.map((s) => s.emoji);
      expect(emojis).toContain("🧑‍🎓");
      expect(emojis).toContain("⚖️");
      expect(emojis).toContain("📝");
      // student repeated but only one suggestion
      expect(suggestions.filter((s) => s.emoji === "🧑‍🎓")).toHaveLength(1);
    });
  });

  describe("renderPrettySuggestions", () => {
    it("handles empty suggestion list", () => {
      const output = module.renderPrettySuggestions("input", [], true);
      expect(output).toContain("No SCE suggestions generated");
      expect(output).toContain("\u001b[2minput");
    });

    it("renders formatted suggestions", () => {
      const suggestions = [
        { emoji: "🧑‍🎓", role: "actors.student", reason: "student" },
      ];

      const output = module.renderPrettySuggestions(
        "The student should act",
        suggestions,
        false
      );
      expect(output).toContain("SCE Symbol Suggestions");
      expect(output).toContain("- 🧑‍🎓  actors.student");
      expect(output).toContain("reason: student");
    });
  });

  describe("handleExplainTool", () => {
    it("returns JSON payload and calls interpreter", async () => {
      mockGetDefinitionsFromText.mockReturnValue([
        { emoji: "📝", meaning: "Task" },
      ]);

      const result = await module.handleExplainTool({
        text: "Do this",
        format: { type: "json" },
      });

      expect(mockGetDefinitionsFromText).toHaveBeenCalledWith("Do this");
      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.symbolCount).toBe(1);
      expect(parsed.symbols[0].emoji).toBe("📝");
    });

    it("renders pretty output when requested", async () => {
      mockGetDefinitionsFromText.mockReturnValue([]);

      const result = await module.handleExplainTool({
        text: "None",
        format: { type: "pretty", color: false },
      });

      expect(result.content[0].text).toContain("No SCE symbols found");
    });

    it("combines pretty and JSON when hybrid format requested", async () => {
      mockGetDefinitionsFromText.mockReturnValue([
        { emoji: "🧑‍🎓", meaning: "Student" },
      ]);

      const result = await module.handleExplainTool({
        text: "Student symbol",
        format: { type: "hybrid", color: true },
      });

      const output = result.content[0].text;
      expect(output).toContain("SCE Symbols Detected");
      expect(output).toContain("JSON detail:");
      expect(output).toContain("\"emoji\": \"🧑‍🎓\"");
    });

    it("auto-selects json format when stdout is not a TTY", async () => {
      setIsTTY(false);
      mockGetDefinitionsFromText.mockReturnValue([]);

      const result = await module.handleExplainTool({
        text: "pipeline run",
      });

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.input).toBe("pipeline run");
      expect(parsed.symbolCount).toBe(0);
    });
  });

  describe("handleValidateTool", () => {
    it("serializes issues as JSON", async () => {
      mockValidateOntology.mockReturnValue([{ message: "Missing" }]);

      const result = await module.handleValidateTool({
        format: { type: "json" },
      });

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.valid).toBe(false);
      expect(parsed.issueCount).toBe(1);
    });

    it("produces pretty output", async () => {
      mockValidateOntology.mockReturnValue([]);

      const result = await module.handleValidateTool({
        format: { type: "pretty", color: false },
      });

      expect(result.content[0].text).toContain("Ontology validation: OK");
    });

    it("returns hybrid payload with JSON detail", async () => {
      mockValidateOntology.mockReturnValue([
        { message: "Missing emoji", path: ["structure", "heading"] },
      ]);

      const result = await module.handleValidateTool({
        format: { type: "hybrid", color: true },
      });

      const output = result.content[0].text;
      expect(output).toContain("Ontology validation: issues detected");
      expect(output).toContain("JSON detail:");
      expect(output).toContain('path:   ["structure","heading"]');

      const hybridJson = output.split("```json\n")[1]?.split("\n```")[0];
      expect(hybridJson).toBeDefined();
      const parsed = JSON.parse(hybridJson ?? "{}");
      expect(parsed.issueCount).toBe(1);
      expect(parsed.issues[0].path).toEqual(["structure", "heading"]);
    });

    it("uses json output in auto mode when stdout is not a TTY", async () => {
      setIsTTY(false);
      mockValidateOntology.mockReturnValue([]);

      const result = await module.handleValidateTool({});

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.valid).toBe(true);
      expect(parsed.issueCount).toBe(0);
    });
  });

  describe("handleSuggestTool (aka handleSupportTool)", () => {
    it("limits suggestions and returns JSON payload", async () => {
      const result = await module.handleSuggestTool({
        text: "The student must comply with policy and should act",
        maxSuggestions: 2,
        format: { type: "json" },
      });

      const parsed = JSON.parse(result.content[0].text);
      expect(parsed.suggestionCount).toBeLessThanOrEqual(2);
      expect(parsed.suggestions.length).toBe(parsed.suggestionCount);
    });

    it("renders pretty suggestions output", async () => {
      const result = await module.handleSuggestTool({
        text: "The student must act",
        maxSuggestions: 5,
        format: { type: "pretty", color: false },
      });

      expect(result.content[0].text).toContain("SCE Symbol Suggestions");
    });

    it("defaults maxSuggestions and returns hybrid payload", async () => {
      const result = await module.handleSuggestTool({
        text: "The student and teacher must follow policy, pending action",
        format: { type: "hybrid", color: true },
      });

      const output = result.content[0].text;
      expect(output).toContain("SCE Symbol Suggestions");
      expect(output).toContain("JSON detail:");

      const jsonBlock = output.split("```json\n")[1]?.split("\n```")[0];
      expect(jsonBlock).toBeDefined();
      const parsed = JSON.parse(jsonBlock ?? "{}");
      expect(parsed.suggestionCount).toBeGreaterThan(0);
      expect(parsed.suggestions.length).toBe(parsed.suggestionCount);
    });
  });
});
