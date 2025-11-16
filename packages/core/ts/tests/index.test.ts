import { getDefinitionsForEmojis } from "../src/interpreter";

test("getDefinitionsForEmojis returns definitions for a known emoji", () => {
  const defs = getDefinitionsForEmojis(["🔍"]);
  expect(defs.length).toBeGreaterThan(0);
  expect(defs[0]).toHaveProperty("emoji", "🔍");
});
