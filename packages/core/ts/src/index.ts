export type {
  SceRole,
  SceContext,
  SceUsage,
  SceSymbolDefinition,
  SceOntologyCategory,
  SceOntologyBase,
  SceOntologyCategoryDefinitionType,
  SceOntologyCategoryKey,
  SceOntologyCategoryEmoji,
  SceOntologyEmojiMap,
  SceOntologyCategoryEmojiMap,
  SceOntologyEmoji,
} from "./types";

export type {
  SemanticOntology,
  SemanticOntologyCategoryKey,
  SemanticOntologyDefinitionType,
  SemanticOntologyStructureEmoji,
  SemanticOntologyLegalPolicyEmoji,
  SemanticOntologyReasoningEmoji,
  SemanticOntologyTasksEmoji,
  SemanticOntologyPrivacyEmoji,
  SemanticOntologyActorsEmoji,
  SemanticOntologyStateEmoji,
  SemanticOntologyControlEmoji,
  SemanticOntologyEmoji,
} from "./ontology-types";

export { SemanticOntologySchema } from "./ontology";

export { validateOntology } from "./validator";

export {
  interpreter,
  getDefinitionsForEmojis,
  extractEmojisFromText,
  getDefinitionsFromText,
} from "./interpreter";
