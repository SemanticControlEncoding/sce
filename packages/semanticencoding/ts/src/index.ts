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
} from "@semanticencoding/core";

export { SemanticOntologySchema } from "@semanticencoding/core";

export { validateOntology } from "@semanticencoding/core";

export {
  interpreter,
  getDefinitionsForEmojis,
  extractEmojisFromText,
  getDefinitionsFromText,
} from "@semanticencoding/core";
