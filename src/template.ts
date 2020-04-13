import { Block } from "./util";
export function expandTemplate(input: string, header: Block, kinds: Block,
                               ruleClasses: Block, ruleParseFns: Block, parseResult: Block): Block {
        return [
    "/* AutoGenerated Code, changes may be overwritten",
    "* INPUT GRAMMAR:",
    ...input.split(/\r?\n/).filter((x) => x !== "").map((x) => "* " + x),
    "*/",
    ...header,
    "type Nullable<T> = T | null;",
    "type $$RuleType<T> = (log?: (msg: string) => void) => Nullable<T>;",
    "export interface ContextRecorder {",
    [
        "record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]): void;",
    ],
    "}",
    "interface ASTNodeIntf {",
    [
        "kind: ASTKinds;",
    ],
    "}",
    ...kinds,
    ...ruleClasses,
    "export class Parser {",
    [
        "private readonly input: string;",
        "private pos: PosInfo;",
        "private negating: boolean = false;",
        "constructor(input: string) {",
        [
            "this.pos = {overallPos: 0, line: 1, offset: 0};",
            "this.input = input;",
        ],
        "}",
        "public reset(pos: PosInfo) {",
        [
            "this.pos = pos;",
        ],
        "}",
        "public finished(): boolean {",
        [
            "return this.pos.overallPos === this.input.length;",
        ],
        "}",
        ...ruleParseFns,
        "private mark(): PosInfo {",
        [
            "return this.pos;",
        ],
        "}",
        "private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {",
        [
            "const mrk = this.mark();",
            "const res: T[] = [];",
            "for (;;) {",
            [
                "const t = func();",
                "if (t === null) {",
                [
                    "break;",
                ],
                "}",
                "res.push(t);",
            ],
            "}",
            "if (star || res.length > 0) {",
            [
                "return res;",
            ],
            "}",
            "this.reset(mrk);",
            "return null;",
        ],
        "}",
        "private runner<T>($$dpth: number, fn: $$RuleType<T>, cr?: ContextRecorder): $$RuleType<T> {",
        [
            "return () => {",
            [
                "const mrk = this.mark();",
                "const res = cr ? (() => {",
                [
                    "const extraInfo: string[] = [];",
                    "const result = fn((msg: string) => extraInfo.push(msg));",
                    "cr.record(mrk, $$dpth, result, this.negating, extraInfo);",
                    "return result;",
                ],
                "})() : fn();",
                "if (res !== null) {",
                [
                    "return res;",
                ],
                "}",
                "this.reset(mrk);",
                "return null;",
            ],
            "};",
        ],
        "}",

        "private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {",
        [
            "for (const f of fns) {",
            [
                "const res = f();",
                "if (res !== null) {",
                [
                    "return res;",
                ],
                "}",
            ],
            "}",
            "return null;",
        ],
        "}",
        "private regexAccept(match: string, dpth: number, cr?: ContextRecorder): Nullable<string> {",
        [
            "return this.runner<string>(dpth,",
            [
                "(log) => {",
                [
                    "if (log) {",
                    [
                        "if (this.negating) {",
                        [
                            "log(\"$$!StrMatch\");",
                        ],
                        "} else {",
                        [
                            "log(\"$$StrMatch\");",
                        ],
                        "}",
                        "log(match);",
                    ],
                    "}",
                    "const reg = new RegExp(match, \"y\");",
                    "reg.lastIndex = this.mark().overallPos;",
                    "const res = reg.exec(this.input);",
                    "if (res) {",
                    [
                        "let lineJmp = 0;",
                        "let lind = -1;",
                        "for (let i = 0; i < res[0].length; ++i) {",
                        [
                            "if (res[0][i] === \"\\n\") {",
                            [
                                "++lineJmp;",
                                "lind = i;",
                            ],
                            "}",
                        ],
                        "}",
                        "this.pos = {",
                        [
                            "overallPos: reg.lastIndex,",
                            "line: this.pos.line + lineJmp,",
                            "offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind - 1)",
                        ],
                        "};",
                        "return res[0];",
                    ],
                    "}",
                    "return null;",
                ],
                "}, cr)();",
            ],
        ],
        "}",
        "private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {",
        [
            "const mrk = this.mark();",
            "const res = fn();",
            "this.reset(mrk);",
            "return res;",
        ],
        "}",
        "private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {",
        [
            "const mrk = this.mark();",
            "const oneg = this.negating;",
            "this.negating = !oneg;",
            "const res = fn();",
            "this.negating = oneg;",
            "this.reset(mrk);",
            "return res === null ? true : null;",
        ],
        "}",
    ],
    "}",

    "export function parse(s: string): ParseResult {",
    [
        "const p = new Parser(s);",
        "return p.parse();"
    ],
    "}",

    ...parseResult,

    "export interface PosInfo {",
    [
        "readonly overallPos: number;",
        "readonly line: number;",
        "readonly offset: number;",
    ],
    "}",
    "export class SyntaxErr {",
    [
        "public pos: PosInfo;",
        "public exprules: string[];",
        "public expmatches: string[];",
        "constructor(pos: PosInfo, exprules: Set<string>, expmatches: Set<string>) {",
        [
            "this.pos = pos;",
            "this.exprules = [...exprules];",
            "this.expmatches = [...expmatches];",
        ],
        "}",
        "public toString(): string {",
        [
            "return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Tried to match rules ${this.exprules.join(\", \")}. Expected one of ${this.expmatches.map((x) => ` '${x}'`)}`;",
        ],
        "}",
    ],
    "}",
    "class ErrorTracker implements ContextRecorder {",
    [
        "private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};",
        "private mnd: number = -1;",
        "private prules: Set<string> = new Set();",
        "private pmatches: Set<string> = new Set();",
        "public record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]) {",
        [
            "if ((result === null) === negating) {",
            [
                "return;",
            ],
            "}",
            "if (pos.overallPos > this.mxpos.overallPos) {",
            [
                "this.mxpos = pos;",
                "this.mnd = depth;",
                "this.pmatches.clear();",
                "this.prules.clear();",
            ],
            "} else if (pos.overallPos === this.mxpos.overallPos && depth < this.mnd) {",
            [
                "this.mnd = depth;",
                "this.prules.clear();",
            ],
            "}",
            "if (this.mxpos.overallPos === pos.overallPos && extraInfo.length >= 2) {",
            [
                "if (extraInfo[0] === \"$$StrMatch\") {",
                [
                    "this.pmatches.add(extraInfo[1]);",
                ],
                "}",
                "if (extraInfo[0] === \"$$!StrMatch\") {",
                [
                    "this.pmatches.add(`not ${extraInfo[1]}`);",
                ],
                "}",
            ],
            "}",
            "if (this.mxpos.overallPos === pos.overallPos && this.mnd === depth) {",
            [
                "extraInfo.forEach((x) => { if (x !== \"$$StrMatch\" && x !== \"$$!StrMatch\") { this.prules.add(x); } });",
            ],
            "}",
        ],
        "}",
        "public getErr(): SyntaxErr | null {",
        [
            "if (this.mxpos.overallPos !== -1) {",
            [
                "return new SyntaxErr(this.mxpos, this.prules, this.pmatches);",
            ],
            "}",
            "return null;",
        ],
        "}",
    ],
    "}",
];
}
