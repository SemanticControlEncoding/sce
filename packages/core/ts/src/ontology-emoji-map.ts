/**
 * @module ontology-emoji-map
 * @description
 * Provides utilities for building structured emoji maps from SCE ontology schemas.
 *
 * This module extracts emoji strings from ontology definitions and organizes them
 * into a nested object structure that mirrors the ontology's category and definition hierarchy.
 * The resulting map provides compile-time type-safe access to emoji strings by category and key.
 *
 * The primary exports are:
 * - {@link buildEmojiMap} — Generic function to build an emoji map from any ontology
 * - {@link SemanticOntologyEmojiMap} — Pre-built emoji map for the default {@link SemanticOntologySchema}
 *
 * @example
 * ```typescript
 * import { SemanticOntologyEmojiMap, buildEmojiMap } from '@semanticencoding/core';
 *
 * // Use the default emoji map
 * const analyzeEmoji = SemanticOntologyEmojiMap.reasoning.analyze; // "🔍"
 *
 * // Build a custom emoji map
 * const customMap = buildEmojiMap(myCustomOntology);
 * const customEmoji = customMap.myCategory.myDefinition;
 * ```
 */

import { SemanticOntologySchema } from "./ontology";

import type { SceOntologyBase, SceOntologyEmojiMap } from "./types";
import type { SemanticOntologyEmojiMapType } from "./ontology-types";

/**
 * Type representing the emoji map structure for the default {@link SemanticOntology}.
 *
 * This is a nested object type where each category contains a mapping from
 * definition keys to their corresponding emoji strings.
 *
 * Re-exported from `ontology-types` for convenience.
 *
 * @example
 * ```typescript
 * const map: SemanticOntologyEmojiMapType = {
 *   reasoning: { analyze: "🔍", insight: "🧠" },
 *   tasks: { action: "📝", complete: "✅" },
 *   // ... other categories
 * };
 * ```
 */
export type { SemanticOntologyEmojiMapType };

/**
 * Builds a structured emoji map from an ontology schema.
 *
 * Traverses all categories and definitions in the provided ontology,
 * extracting emoji strings and organizing them into a nested object structure
 * that mirrors the schema's hierarchy.
 *
 * The resulting map provides type-safe access to emoji strings:
 * `map[categoryKey][definitionKey]` returns the emoji string.
 *
 * @template T - The ontology type extending {@link SceOntologyBase}
 * @param schema - The ontology schema to extract emojis from
 * @returns A nested object mapping category keys → definition keys → emoji strings
 *
 * @example
 * ```typescript
 * import { buildEmojiMap } from '@semanticencoding/core';
 *
 * const emojiMap = buildEmojiMap(SemanticOntologySchema);
 * console.log(emojiMap.reasoning.analyze); // "🔍"
 * console.log(emojiMap.tasks.action);      // "📝"
 *
 * // Use with custom ontologies
 * const customMap = buildEmojiMap(myCustomOntology);
 * const emoji = customMap.myCategory.myDefinition;
 * ```
 */
export const buildEmojiMap = <T extends SceOntologyBase>(
  schema: T
): SceOntologyEmojiMap<T> => {
  const ret = Object.entries(schema).reduce(
    (categoryAcc, [categoryKey, categoryValue]) => {
      const defMap = Object.entries(categoryValue).reduce(
        (defAcc, [defKey, defValue]) => {
          if (defValue && typeof defValue === "object" && "emoji" in defValue) {
            defAcc[defKey] = defValue.emoji as string;
          }
          return defAcc;
        },
        {} as { [defKey: string]: string }
      );
      categoryAcc[categoryKey] = defMap;
      return categoryAcc;
    },
    {} as { [categoryKey: string]: { [defKey: string]: string } }
  );
  return ret as SceOntologyEmojiMap<T>;
};

/**
 * Pre-built emoji map for the default {@link SemanticOntologySchema}.
 *
 * Provides compile-time type-safe access to all emoji strings in the standard ontology,
 * organized by category and definition key.
 *
 * This constant is built once at module load time using {@link buildEmojiMap},
 * making it efficient for repeated access throughout your application.
 *
 * @example
 * ```typescript
 * import { SemanticOntologyEmojiMap } from '@semanticencoding/core';
 *
 * // Access emojis by category and key
 * const analyzeEmoji = SemanticOntologyEmojiMap.reasoning.analyze;     // "🔍"
 * const insightEmoji = SemanticOntologyEmojiMap.reasoning.insight;     // "🧠"
 * const actionEmoji = SemanticOntologyEmojiMap.tasks.action;           // "📝"
 * const completeEmoji = SemanticOntologyEmojiMap.tasks.complete;       // "✅"
 * const pinnedEmoji = SemanticOntologyEmojiMap.structure.pinned;       // "📌"
 *
 * // Use in UI components, validators, or text builders
 * const message = `${analyzeEmoji} Review the findings`;
 * ```
 */
export const SemanticOntologyEmojiMap: SemanticOntologyEmojiMapType =
  buildEmojiMap(SemanticOntologySchema);
