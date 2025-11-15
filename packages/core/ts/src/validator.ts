import { SemanticOntologySchema } from "./ontology";
import type {
  SceSymbolDefinition,
  SceOntologyBase,
  SceOntologyCategory,
} from "./types";

export const validateOntology = <T extends SceOntologyBase>(
  ontology: T = SemanticOntologySchema as unknown as T
): string[] => {
  const errors: string[] = [];
  const seenEmojis = new Map<string, string>(); // emoji -> "category.key"

  for (const [categoryName, category] of Object.entries(ontology) as [
    string,
    SceOntologyCategory
  ][]) {
    for (const [key, def] of Object.entries(category) as [
      string,
      SceSymbolDefinition
    ][]) {
      const path = `${categoryName}.${key}`;

      // Basic checks
      if (!def.emoji) {
        errors.push(`Missing emoji at ${path}`);
      }

      if (seenEmojis.has(def.emoji)) {
        errors.push(
          `Duplicate emoji ${
            def.emoji
          } at ${path}, already used at ${seenEmojis.get(def.emoji)}`
        );
      } else {
        seenEmojis.set(def.emoji, path);
      }

      if (
        !Array.isArray(def.allowedContext) ||
        def.allowedContext.length === 0
      ) {
        errors.push(`allowedContext must be non-empty array at ${path}`);
      }
    }
  }

  return errors;
};
