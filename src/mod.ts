import { buildParser } from "./gen.ts";

export type Options = {
  numEnums : boolean;
  enableMemo: boolean
};

export const defaultOptions : Options = {
  numEnums: false,
  enableMemo: false
};

export function generateParser(
  grammarFile: string,
  outputFile: string,
  options: Partial<Options> = {}
) {

  const opts : Options = {
    ...defaultOptions,
    ...options
  };

  const inGrammar = Deno.readTextFileSync(grammarFile);
  const parser = buildParser(inGrammar, opts.numEnums, opts.enableMemo);
  Deno.writeTextFileSync(outputFile, parser);
}
