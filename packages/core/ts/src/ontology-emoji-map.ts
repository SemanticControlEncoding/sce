import { SemanticOntologySchema } from "./ontology";

import type { SceOntologyBase, SceOntologyEmojiMap } from "./types";
import type { SemanticOntologyEmojiMapType } from "./ontology-types";

export type { SemanticOntologyEmojiMapType };

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

export const SemanticOntologyEmojiMap: SemanticOntologyEmojiMapType =
  buildEmojiMap(SemanticOntologySchema);
