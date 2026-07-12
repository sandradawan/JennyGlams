import { type SchemaTypeDefinition } from "sanity";
import look from "./look";
import reel from "./reel";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [look, reel],
};
