import { SemanticOntologySchema } from "./ontology";
import type {
  SceOntologyCategoryDefinitionType,
  SceOntologyCategoryEmoji,
  SceOntologyCategoryKey,
  SceOntologyEmoji,
  SceOntologyEmojiMap,
} from "./types";

export type SemanticOntology = typeof SemanticOntologySchema;

export type SemanticOntologyCategoryKey =
  SceOntologyCategoryKey<SemanticOntology>;

export type SemanticOntologyDefinitionType<
  CategoryKey extends SemanticOntologyCategoryKey
> = SceOntologyCategoryDefinitionType<SemanticOntology, CategoryKey>;

export type SemanticOntologyEmojiMapType =
  SceOntologyEmojiMap<SemanticOntology>;

export type SemanticOntologyStructureEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "structure"
>;

export type SemanticOntologyLegalPolicyEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "legalPolicy"
>;

export type SemanticOntologyReasoningEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "reasoning"
>;

export type SemanticOntologyTasksEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "tasks"
>;

export type SemanticOntologyPrivacyEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "privacy"
>;

export type SemanticOntologyActorsEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "actors"
>;

export type SemanticOntologyStateEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "state"
>;

export type SemanticOntologyControlEmoji = SceOntologyCategoryEmoji<
  SemanticOntology,
  "control"
>;

export type SemanticOntologyEmoji = SceOntologyEmoji<SemanticOntology>;
