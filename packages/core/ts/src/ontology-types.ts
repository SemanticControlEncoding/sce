/**
 * @module ontology-types
 * @description
 * Type definitions specific to the default {@link SemanticOntologySchema}.
 *
 * This module provides concrete type aliases derived from the generic SCE type system,
 * specialized for the standard ontology. These types offer compile-time safety when
 * working with the default schema's categories, definitions, emojis, and structure.
 *
 * The primary type exports include:
 * - {@link SemanticOntology} — The inferred type of {@link SemanticOntologySchema}
 * - {@link SemanticOntologyEmoji} — Union of all valid emoji strings in the default ontology
 * - Category-specific emoji types (e.g., {@link SemanticOntologyReasoningEmoji})
 * - {@link SemanticOntologyEmojiMapType} — The emoji map structure for the default schema
 *
 * These types are used throughout the core library and can be imported by consumers
 * who need strong typing when working with the standard SCE ontology.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyEmoji, SemanticOntologyReasoningEmoji } from '@sce/core';
 *
 * // Type-safe emoji variables
 * const analyze: SemanticOntologyEmoji = "🔍";
 * const insight: SemanticOntologyReasoningEmoji = "🧠";
 *
 * // Use in function signatures
 * function processEmoji(emoji: SemanticOntologyEmoji) {
 *   // ...
 * }
 * ```
 */

import { SemanticOntologySchema } from "./ontology";
import type {
  SceOntologyCategoryDefinitionType,
  SceOntologyCategoryEmoji,
  SceOntologyCategoryKey,
  SceOntologyEmoji,
  SceOntologyEmojiMap,
} from "./types";

/**
 * The inferred TypeScript type of the default {@link SemanticOntologySchema}.
 *
 * This type represents the complete structure of the standard SCE ontology,
 * including all categories (structure, legalPolicy, reasoning, tasks, privacy, actors, state, control)
 * and their nested definition objects.
 *
 * Use this when you need to reference the ontology type itself, rather than
 * working with individual emojis or definitions.
 *
 * @example
 * ```typescript
 * import type { SemanticOntology } from '@sce/core';
 *
 * function validateOntology(ontology: SemanticOntology) {
 *   // Type-safe access to categories
 *   const analyzeDefinition = ontology.reasoning.analyze;
 * }
 * ```
 */
export type SemanticOntology = typeof SemanticOntologySchema;

/**
 * Union type of all category keys in the default {@link SemanticOntology}.
 *
 * Represents the valid category names: `"structure"`, `"legalPolicy"`, `"reasoning"`,
 * `"tasks"`, `"privacy"`, `"actors"`, `"state"`, `"control"`.
 *
 * Use this for type-safe category references when iterating over or accessing
 * specific categories in the ontology.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyCategoryKey } from '@sce/core';
 *
 * const categoryKey: SemanticOntologyCategoryKey = "reasoning";
 * // categoryKey = "invalid"; // TypeScript error
 * ```
 */
export type SemanticOntologyCategoryKey =
  SceOntologyCategoryKey<SemanticOntology>;

/**
 * Retrieves the type of definitions within a specific category of the default ontology.
 *
 * Given a {@link SemanticOntologyCategoryKey}, this type resolves to the nested object
 * containing all symbol definitions in that category.
 *
 * @template CategoryKey - A valid category key from {@link SemanticOntologyCategoryKey}
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyDefinitionType } from '@sce/core';
 *
 * type ReasoningDefs = SemanticOntologyDefinitionType<"reasoning">;
 * // ReasoningDefs = { analyze: {...}, insight: {...}, investigate: {...} }
 *
 * type TasksDefs = SemanticOntologyDefinitionType<"tasks">;
 * // TasksDefs = { action: {...}, todo: {...}, softComplete: {...}, complete: {...}, repeat: {...} }
 * ```
 */
export type SemanticOntologyDefinitionType<
  CategoryKey extends SemanticOntologyCategoryKey
> = SceOntologyCategoryDefinitionType<SemanticOntology, CategoryKey>;

/**
 * The emoji map structure for the default {@link SemanticOntology}.
 *
 * This type represents a nested object where each category key maps to an object
 * of definition keys mapping to their emoji strings.
 *
 * Used by {@link SemanticOntologyEmojiMap} (the runtime constant) and when building
 * custom emoji maps from the default schema.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyEmojiMapType } from '@sce/core';
 *
 * const emojiMap: SemanticOntologyEmojiMapType = {
 *   reasoning: { analyze: "🔍", insight: "🧠", investigate: "🕵️" },
 *   tasks: { action: "📝", todo: "☐", complete: "✅" },
 *   // ... other categories
 * };
 *
 * const analyzeEmoji = emojiMap.reasoning.analyze; // "🔍"
 * ```
 */
export type SemanticOntologyEmojiMapType =
  SceOntologyEmojiMap<SemanticOntology>;

/**
 * Union type of all emojis in the `structure` category of the default ontology.
 *
 * Includes emojis for structural elements such as sections, pinned facts, and references.
 * Valid values: `"🗂️"` (section), `"📌"` (pinned), `"📎"` (reference).
 *
 * Use this for type-safe handling of structure-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyStructureEmoji } from '@sce/core';
 *
 * const sectionEmoji: SemanticOntologyStructureEmoji = "🗂️";
 * const pinnedEmoji: SemanticOntologyStructureEmoji = "📌";
 * // const invalid: SemanticOntologyStructureEmoji = "🔍"; // TypeScript error (reasoning emoji)
 * ```
 */
export type SemanticOntologyStructureEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "structure"
>;

/**
 * Union type of all emojis in the `legalPolicy` category of the default ontology.
 *
 * Includes emojis for legal frameworks, citations, compliance records, and institutional authorities.
 * Valid values: `"⚖️"` (law), `"📜"` (citation), `"🧾"` (complianceRecord), `"🏛️"` (institutionAuthority).
 *
 * Use this for type-safe handling of legal and policy-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyLegalPolicyEmoji } from '@sce/core';
 *
 * const lawEmoji: SemanticOntologyLegalPolicyEmoji = "⚖️";
 * const citationEmoji: SemanticOntologyLegalPolicyEmoji = "📜";
 * ```
 */
export type SemanticOntologyLegalPolicyEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "legalPolicy"
>;

/**
 * Union type of all emojis in the `reasoning` category of the default ontology.
 *
 * Includes emojis for analytical and investigative operations.
 * Valid values: `"🔍"` (analyze), `"🧠"` (insight), `"🕵️"` (investigate).
 *
 * Use this for type-safe handling of reasoning-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyReasoningEmoji } from '@sce/core';
 *
 * const analyzeEmoji: SemanticOntologyReasoningEmoji = "🔍";
 * const insightEmoji: SemanticOntologyReasoningEmoji = "🧠";
 * ```
 */
export type SemanticOntologyReasoningEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "reasoning"
>;

/**
 * Union type of all emojis in the `tasks` category of the default ontology.
 *
 * Includes emojis for actionable tasks and their completion states.
 * Valid values: `"📝"` (action), `"☐"` (todo), `"☑️"` (softComplete), `"✅"` (complete), `"🔁"` (repeat).
 *
 * Use this for type-safe handling of task-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyTasksEmoji } from '@sce/core';
 *
 * const actionEmoji: SemanticOntologyTasksEmoji = "📝";
 * const completeEmoji: SemanticOntologyTasksEmoji = "✅";
 * ```
 */
export type SemanticOntologyTasksEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "tasks"
>;

/**
 * Union type of all emojis in the `privacy` category of the default ontology.
 *
 * Includes emojis for privacy states and data access control.
 * Valid values: `"🔐"` (private), `"🗝️"` (authorized), `"🔓"` (open).
 *
 * Use this for type-safe handling of privacy-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyPrivacyEmoji } from '@sce/core';
 *
 * const privateEmoji: SemanticOntologyPrivacyEmoji = "🔐";
 * const authorizedEmoji: SemanticOntologyPrivacyEmoji = "🗝️";
 * ```
 */
export type SemanticOntologyPrivacyEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "privacy"
>;

/**
 * Union type of all emojis in the `actors` category of the default ontology.
 *
 * Includes emojis representing people, roles, and organizations involved in processes.
 * Valid values: `"👤"` (generic), `"🧑‍🎓"` (student), `"🧑‍🏫"` (teacher), `"🧑‍⚖️"` (legalAuthority), `"🏢"` (organization).
 *
 * Use this for type-safe handling of actor-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyActorsEmoji } from '@sce/core';
 *
 * const studentEmoji: SemanticOntologyActorsEmoji = "🧑‍🎓";
 * const organizationEmoji: SemanticOntologyActorsEmoji = "🏢";
 * ```
 */
export type SemanticOntologyActorsEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "actors"
>;

/**
 * Union type of all emojis in the `state` category of the default ontology.
 *
 * Includes emojis representing process states, conditions, and status indicators.
 * Valid values: `"⏳"` (pending), `"❓"` (unclear), `"⚠️"` (warning), `"❌"` (prohibited).
 *
 * Use this for type-safe handling of state-related emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyStateEmoji } from '@sce/core';
 *
 * const pendingEmoji: SemanticOntologyStateEmoji = "⏳";
 * const warningEmoji: SemanticOntologyStateEmoji = "⚠️";
 * ```
 */
export type SemanticOntologyStateEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "state"
>;

/**
 * Union type of all emojis in the `control` category of the default ontology.
 *
 * Includes emojis for workflow control flow and navigation.
 * Valid values: `"🔀"` (decisionPoint), `"⏭️"` (next), `"⏮️"` (back).
 *
 * Use this for type-safe handling of control flow emojis.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyControlEmoji } from '@sce/core';
 *
 * const decisionEmoji: SemanticOntologyControlEmoji = "🔀";
 * const nextEmoji: SemanticOntologyControlEmoji = "⏭️";
 * ```
 */
export type SemanticOntologyControlEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "control"
>;

/**
 * Union type of all valid emoji strings across all categories in the default ontology.
 *
 * This is the most commonly used emoji type, representing any emoji defined in
 * {@link SemanticOntologySchema}. It's the union of all category-specific emoji types.
 *
 * Use this for general emoji parameters and return values when you don't need to
 * restrict to a specific category.
 *
 * @example
 * ```typescript
 * import type { SemanticOntologyEmoji } from '@sce/core';
 *
 * // Any valid emoji from the default ontology
 * const emojis: SemanticOntologyEmoji[] = ["🔍", "📝", "👤", "⏳"];
 *
 * function processEmoji(emoji: SemanticOntologyEmoji) {
 *   // Type-safe handling of any ontology emoji
 * }
 *
 * processEmoji("🧠"); // OK
 * // processEmoji("😀"); // TypeScript error if not in ontology
 * ```
 */
export type SemanticOntologyEmoji = SceOntologyEmoji<SemanticOntology>;
