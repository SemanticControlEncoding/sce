export type SceRole =
  | "STRUCTURE"
  | "LEGAL"
  | "REASONING"
  | "TASK"
  | "PRIVACY"
  | "ACTOR"
  | "STATE"
  | "CONTROL";

export type SceContext = "HUMAN" | "LLM" | "TOOL";

export type SceUsage = "REQUIRED" | "OPTIONAL" | "CONDITIONAL";

export interface SceSymbolDefinition {
  emoji: string;
  role: SceRole;
  meaning: string;
  allowedContext: SceContext[];
  usage: SceUsage;
  conflictsWith: string[];
  example: string;
}

export interface SceOntologyCategory {
  [key: string]: SceSymbolDefinition;
}

export interface SceOntologyBase {
  structure: SceOntologyCategory;
  legalPolicy: SceOntologyCategory;
  reasoning: SceOntologyCategory;
  tasks: SceOntologyCategory;
  privacy: SceOntologyCategory;
  actors: SceOntologyCategory;
  state: SceOntologyCategory;
  control: SceOntologyCategory;
}

export type SceOntologyCategoryKey<
  TOntology extends SceOntologyBase = SceOntologyBase
> = keyof TOntology;

export type SceOntologyCategoryDefinitionType<
  TOntology extends SceOntologyBase,
  CategoryKey extends SceOntologyCategoryKey<TOntology>
> = Pick<TOntology, CategoryKey>[CategoryKey];

export type SceOntologyEmojiMap<TOntology extends SceOntologyBase> = {
  [CategoryKey in SceOntologyCategoryKey<TOntology>]: {
    [DefinitionKey in keyof SceOntologyCategoryDefinitionType<
      TOntology,
      CategoryKey
    >]: SceOntologyCategoryDefinitionType<
      TOntology,
      CategoryKey
    >[DefinitionKey] extends {
      emoji: infer E;
    }
      ? E
      : never;
  };
};

export type SceOntologyCategoryEmojiMap<TOntology extends SceOntologyBase> = {
  [CategoryKey in SceOntologyCategoryKey<TOntology>]: SceOntologyEmojiMap<TOntology>[CategoryKey][keyof SceOntologyEmojiMap<TOntology>[CategoryKey]];
};

export type SceOntologyCategoryEmoji<
  TOntology extends SceOntologyBase,
  CategoryKey extends SceOntologyCategoryKey<TOntology>
> = SceOntologyEmojiMap<TOntology>[CategoryKey][keyof SceOntologyEmojiMap<TOntology>[CategoryKey]];

export type SceOntologyEmoji<TOntology extends SceOntologyBase> =
  SceOntologyCategoryEmojiMap<TOntology>[SceOntologyCategoryKey<TOntology>];

/**
 * Runtime interface for an ontology interpreter.
 * Implementations should provide methods to lookup definitions by emoji,
 * extract emojis from text, and map text to definitions.
 */
export interface OntologyInterpreter<T extends SceOntologyBase> {
  forEmojis(emojis: Array<SceOntologyEmoji<T>>): SceSymbolDefinition[];
  forText(text: string): SceSymbolDefinition[];
  emojiFromText(text: string): SceOntologyEmoji<T>[];
}
