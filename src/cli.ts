import { SyntaxErrs, buildParser } from "./gen.ts";
import { CheckError } from "./checks.ts";

import yargs from 'https://deno.land/x/yargs@v16.2.0-deno/deno.ts'
import { Arguments } from 'https://deno.land/x/yargs@v16.2.0-deno/deno-types.ts'

// TODO format syntax errors better

yargs(Deno.args).command("$0 <grammar> <output_file>", "build parser from grammar",
    // deno-lint-ignore no-explicit-any
    (_yargs : any) => _yargs.options({
        "num-enums": {
            type: "boolean",
            default: false,
            desc: "Use numeric enums for AST kinds",
        },
        "enable-memo": {
            type: "boolean",
            default: false,
            desc: "Enable memoisation, get better performance for increased memory usage",
        },
    }),

    // deno-lint-ignore no-explicit-any
    (argv : any) => {
        const grammarFile = argv.grammar as string;
        const outputFile = argv.output_file as string;
        try {
            const inGram = Deno.readTextFileSync(grammarFile);
            const parser = buildParser(inGram, argv["num-enums"], argv["enable-memo"]);
            Deno.writeTextFileSync(outputFile, parser);
        } catch(err) {
            if(err instanceof CheckError) {
                console.error(err.message);
            } else if(err instanceof SyntaxErrs) {
                for(const se of err.errs)
                    console.log(se.toString());
            } else {
                console.error(err);
            }
        }
    })
    .strict()
    .scriptName("tspeg")
    .help()
    .parse();
