import { SemanticOntologySchema } from "./ontology";
import { SemanticOntology, SemanticOntologyEmoji } from "./ontology-types";
import type {
  SceSymbolDefinition,
  SceOntologyBase,
  SceOntologyCategory,
  SceOntologyEmoji,
  OntologyInterpreter,
} from "./types";

const buildEmojiIndex = <T extends SceOntologyBase>(ontology: T) => {
  const map = new Map<SceOntologyEmoji<T>, SceSymbolDefinition>();

  for (const category of Object.values(ontology) as SceOntologyCategory[]) {
    for (const def of Object.values(category) as SceSymbolDefinition[]) {
      map.set(def.emoji as SceOntologyEmoji<T>, def);
    }
  }

  return map;
};

export type SceOntologyEmojiIndexType<T extends SceOntologyBase> = ReturnType<
  typeof buildEmojiIndex<T>
>;

class SceOntologyInterpreter<T extends SceOntologyBase>
  implements OntologyInterpreter<T>
{
  static #defaultInstance: SceOntologyInterpreter<SemanticOntology> | null =
    null;
  static get Default(): SceOntologyInterpreter<SemanticOntology> {
    if (!this.#defaultInstance) {
      this.#defaultInstance = new SceOntologyInterpreter(
        SemanticOntologySchema
      );
    }
    return this.#defaultInstance;
  }

  readonly #index: SceOntologyEmojiIndexType<T>;
  constructor(ontology: T) {
    this.#index = buildEmojiIndex(ontology);
  }

  copyIndex(): SceOntologyEmojiIndexType<T> {
    const source = Array.from(this.#index.entries()).map(
      ([key, category]) =>
        [key, { ...category }] as [SceOntologyEmoji<T>, SceSymbolDefinition]
    );
    return new Map(source);
  }

  forEmojis(emojis: Array<SceOntologyEmoji<T>>): SceSymbolDefinition[] {
    const result: SceSymbolDefinition[] = [];

    for (const emoji of emojis) {
      const def = this.#index.get(emoji);
      if (def) {
        result.push(def);
      }
    }

    return result;
  }

  forText(text: string): SceSymbolDefinition[] {
    const emojis = this.emojiFromText(text);
    return this.forEmojis(emojis);
  }

  emojiFromText(text: string): SceOntologyEmoji<T>[] {
    const found = new Set<SceOntologyEmoji<T>>();

    for (const emoji of this.#index.keys()) {
      if (text.includes(String(emoji))) {
        found.add(emoji);
      }
    }

    return Array.from(found);
  }
}

interface InterpreterOverloads {
  <T extends SceOntologyBase>(ontology: T): SceOntologyInterpreter<T>;
  (): SceOntologyInterpreter<SemanticOntology>;
}

export const interpreter: InterpreterOverloads = <
  T extends SceOntologyBase = SemanticOntology
>(
  ontology?: T
) =>
  ontology
    ? new SceOntologyInterpreter(ontology)
    : SceOntologyInterpreter.Default;

/**
 * Given an array of emojis, return the SCE symbol definitions
 * for each emoji that exists in the ontology.
 */
export const getDefinitionsForEmojis = (emojis: SemanticOntologyEmoji[]) =>
  SceOntologyInterpreter.Default.forEmojis(emojis);

/**
 * Extract all known SCE emojis found in a freeform string.
 * This is done by scanning for each known emoji, which is cheap at this scale.
 */
export const extractEmojisFromText = (text: string) =>
  SceOntologyInterpreter.Default.emojiFromText(text);

/**
 * One-shot helper:
 * Given freeform text, return the SCE symbol definitions
 * for all known emojis used in the text.
 */
export const getDefinitionsFromText = (text: string) =>
  SceOntologyInterpreter.Default.forText(text);
