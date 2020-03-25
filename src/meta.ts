/* AutoGenerated Code, changes may be overwritten
* INPUT GRAMMAR:
* ---
* // Meta grammar for parser
* ---
* GRAM      := header=HDR? rules=RULEDEF+
* HDR       := '---' content='((?!---)(.|\n))*' '---'
* RULEDEF   := _ name=NAME _ ':=' _ rule=RULE _
* RULE      := head=ALT tail={_ '\|' _ alt=ALT }*
*           .list = ALT[] { return [this.head, ...this.tail.map((x) => x.alt)]; }
* ALT       := matches=MATCHSPEC+ attrs=ATTR*
* MATCHSPEC := _ named={name=NAME _ '=' _}? rule=POSTOP
* POSTOP    := pre=PREOP op='\+|\*|\?'?
*             .optional = boolean { return this.op !== null && this.op === '?'}
*             | op='@'
* PREOP     := op='\&|!'? at=ATOM
* ATOM      := name=NAME !'\s*:='
*            | match=STRLIT
*            | '{' _ sub=RULE _ '}'
* ATTR      := _ '\.' name=NAME _ '=' _ type='[^\s\{]+' _ '\{'
*     action='([^\{\}\\]|(\\.))*'
* '\}'
* NAME      := '[a-zA-Z_]+'
* STRLIT    := start=@ '\'' val='([^\'\\]|(\\.))*' '\''
* _         := '\s*'
*/

// Meta grammar for parser

type Nullable<T> = T | null;
type $$RuleType<T> = (log?: (msg: string) => void) => Nullable<T>;
export interface ContextRecorder {
    record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]): void;
}
interface ASTNodeIntf {
    kind: ASTKinds;
}
export enum ASTKinds {
    GRAM,
    HDR,
    RULEDEF,
    RULE,
    RULE_$0,
    ALT,
    MATCHSPEC,
    MATCHSPEC_$0,
    POSTOP_1,
    POSTOP_2,
    PREOP,
    ATOM_1,
    ATOM_2,
    ATOM_3,
    ATTR,
    NAME,
    STRLIT,
    _,
}
export interface GRAM {
    kind: ASTKinds.GRAM;
    header: Nullable<HDR>;
    rules: RULEDEF[];
}
export interface HDR {
    kind: ASTKinds.HDR;
    content: string;
}
export interface RULEDEF {
    kind: ASTKinds.RULEDEF;
    name: NAME;
    rule: RULE;
}
export class RULE {
    public kind: ASTKinds.RULE = ASTKinds.RULE
    public head: ALT;
    public tail: RULE_$0[];
    public list: ALT[]
    constructor(head : ALT, tail : RULE_$0[]){
        this.head = head;
        this.tail = tail;
        this.list = (() => {
        return [this.head, ...this.tail.map((x) => x.alt)];
        })()
    }
}
export interface RULE_$0 {
    kind: ASTKinds.RULE_$0;
    alt: ALT;
}
export interface ALT {
    kind: ASTKinds.ALT;
    matches: MATCHSPEC[];
    attrs: ATTR[];
}
export interface MATCHSPEC {
    kind: ASTKinds.MATCHSPEC;
    named: Nullable<MATCHSPEC_$0>;
    rule: POSTOP;
}
export interface MATCHSPEC_$0 {
    kind: ASTKinds.MATCHSPEC_$0;
    name: NAME;
}
export type POSTOP = POSTOP_1 | POSTOP_2;
export class POSTOP_1 {
    public kind: ASTKinds.POSTOP_1 = ASTKinds.POSTOP_1
    public pre: PREOP;
    public op: Nullable<string>;
    public optional: boolean
    constructor(pre : PREOP, op : Nullable<string>){
        this.pre = pre;
        this.op = op;
        this.optional = (() => {
        return this.op !== null && this.op === '?'
        })()
    }
}
export interface POSTOP_2 {
    kind: ASTKinds.POSTOP_2;
    op: string;
}
export interface PREOP {
    kind: ASTKinds.PREOP;
    op: Nullable<string>;
    at: ATOM;
}
export type ATOM = ATOM_1 | ATOM_2 | ATOM_3;
export interface ATOM_1 {
    kind: ASTKinds.ATOM_1;
    name: NAME;
}
export interface ATOM_2 {
    kind: ASTKinds.ATOM_2;
    match: STRLIT;
}
export interface ATOM_3 {
    kind: ASTKinds.ATOM_3;
    sub: RULE;
}
export interface ATTR {
    kind: ASTKinds.ATTR;
    name: NAME;
    type: string;
    action: string;
}
export type NAME = string;
export interface STRLIT {
    kind: ASTKinds.STRLIT;
    start: PosInfo;
    val: string;
}
export type _ = string;
export class Parser {
    private readonly input: string;
    private pos: PosInfo;
    private negating: boolean = false;
    constructor(input: string) {
        this.pos = {overallPos: 0, line: 1, offset: 0};
        this.input = input;
    }
    public reset(pos: PosInfo) {
        this.pos = pos;
    }
    public finished(): boolean {
        return this.pos.overallPos === this.input.length;
    }
    public matchGRAM($$dpth: number, cr?: ContextRecorder): Nullable<GRAM> {
        return this.runner<GRAM>($$dpth,
            (log) => {
                if (log) {
                    log("GRAM");
                }
                let header: Nullable<Nullable<HDR>>;
                let rules: Nullable<RULEDEF[]>;
                let res: Nullable<GRAM> = null;
                if (true
                    && ((header = this.matchHDR($$dpth + 1, cr)) || true)
                    && (rules = this.loop<RULEDEF>(() => this.matchRULEDEF($$dpth + 1, cr), false)) !== null
                ) {
                    res = {kind: ASTKinds.GRAM, header, rules};
                }
                return res;
            }, cr)();
    }
    public matchHDR($$dpth: number, cr?: ContextRecorder): Nullable<HDR> {
        return this.runner<HDR>($$dpth,
            (log) => {
                if (log) {
                    log("HDR");
                }
                let content: Nullable<string>;
                let res: Nullable<HDR> = null;
                if (true
                    && this.regexAccept(String.raw`---`, $$dpth + 1, cr) !== null
                    && (content = this.regexAccept(String.raw`((?!---)(.|\n))*`, $$dpth + 1, cr)) !== null
                    && this.regexAccept(String.raw`---`, $$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.HDR, content};
                }
                return res;
            }, cr)();
    }
    public matchRULEDEF($$dpth: number, cr?: ContextRecorder): Nullable<RULEDEF> {
        return this.runner<RULEDEF>($$dpth,
            (log) => {
                if (log) {
                    log("RULEDEF");
                }
                let name: Nullable<NAME>;
                let rule: Nullable<RULE>;
                let res: Nullable<RULEDEF> = null;
                if (true
                    && this.match_($$dpth + 1, cr) !== null
                    && (name = this.matchNAME($$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`:=`, $$dpth + 1, cr) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && (rule = this.matchRULE($$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.RULEDEF, name, rule};
                }
                return res;
            }, cr)();
    }
    public matchRULE($$dpth: number, cr?: ContextRecorder): Nullable<RULE> {
        return this.runner<RULE>($$dpth,
            (log) => {
                if (log) {
                    log("RULE");
                }
                let head: Nullable<ALT>;
                let tail: Nullable<RULE_$0[]>;
                let res: Nullable<RULE> = null;
                if (true
                    && (head = this.matchALT($$dpth + 1, cr)) !== null
                    && (tail = this.loop<RULE_$0>(() => this.matchRULE_$0($$dpth + 1, cr), true)) !== null
                ) {
                    res = new RULE(head, tail);
                }
                return res;
            }, cr)();
    }
    public matchRULE_$0($$dpth: number, cr?: ContextRecorder): Nullable<RULE_$0> {
        return this.runner<RULE_$0>($$dpth,
            (log) => {
                if (log) {
                    log("RULE_$0");
                }
                let alt: Nullable<ALT>;
                let res: Nullable<RULE_$0> = null;
                if (true
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`\|`, $$dpth + 1, cr) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && (alt = this.matchALT($$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.RULE_$0, alt};
                }
                return res;
            }, cr)();
    }
    public matchALT($$dpth: number, cr?: ContextRecorder): Nullable<ALT> {
        return this.runner<ALT>($$dpth,
            (log) => {
                if (log) {
                    log("ALT");
                }
                let matches: Nullable<MATCHSPEC[]>;
                let attrs: Nullable<ATTR[]>;
                let res: Nullable<ALT> = null;
                if (true
                    && (matches = this.loop<MATCHSPEC>(() => this.matchMATCHSPEC($$dpth + 1, cr), false)) !== null
                    && (attrs = this.loop<ATTR>(() => this.matchATTR($$dpth + 1, cr), true)) !== null
                ) {
                    res = {kind: ASTKinds.ALT, matches, attrs};
                }
                return res;
            }, cr)();
    }
    public matchMATCHSPEC($$dpth: number, cr?: ContextRecorder): Nullable<MATCHSPEC> {
        return this.runner<MATCHSPEC>($$dpth,
            (log) => {
                if (log) {
                    log("MATCHSPEC");
                }
                let named: Nullable<Nullable<MATCHSPEC_$0>>;
                let rule: Nullable<POSTOP>;
                let res: Nullable<MATCHSPEC> = null;
                if (true
                    && this.match_($$dpth + 1, cr) !== null
                    && ((named = this.matchMATCHSPEC_$0($$dpth + 1, cr)) || true)
                    && (rule = this.matchPOSTOP($$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.MATCHSPEC, named, rule};
                }
                return res;
            }, cr)();
    }
    public matchMATCHSPEC_$0($$dpth: number, cr?: ContextRecorder): Nullable<MATCHSPEC_$0> {
        return this.runner<MATCHSPEC_$0>($$dpth,
            (log) => {
                if (log) {
                    log("MATCHSPEC_$0");
                }
                let name: Nullable<NAME>;
                let res: Nullable<MATCHSPEC_$0> = null;
                if (true
                    && (name = this.matchNAME($$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`=`, $$dpth + 1, cr) !== null
                    && this.match_($$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.MATCHSPEC_$0, name};
                }
                return res;
            }, cr)();
    }
    public matchPOSTOP($$dpth: number, cr?: ContextRecorder): Nullable<POSTOP> {
        return this.choice<POSTOP>([
            () => this.matchPOSTOP_1($$dpth + 1, cr),
            () => this.matchPOSTOP_2($$dpth + 1, cr),
        ]);
    }
    public matchPOSTOP_1($$dpth: number, cr?: ContextRecorder): Nullable<POSTOP_1> {
        return this.runner<POSTOP_1>($$dpth,
            (log) => {
                if (log) {
                    log("POSTOP_1");
                }
                let pre: Nullable<PREOP>;
                let op: Nullable<Nullable<string>>;
                let res: Nullable<POSTOP_1> = null;
                if (true
                    && (pre = this.matchPREOP($$dpth + 1, cr)) !== null
                    && ((op = this.regexAccept(String.raw`\+|\*|\?`, $$dpth + 1, cr)) || true)
                ) {
                    res = new POSTOP_1(pre, op);
                }
                return res;
            }, cr)();
    }
    public matchPOSTOP_2($$dpth: number, cr?: ContextRecorder): Nullable<POSTOP_2> {
        return this.runner<POSTOP_2>($$dpth,
            (log) => {
                if (log) {
                    log("POSTOP_2");
                }
                let op: Nullable<string>;
                let res: Nullable<POSTOP_2> = null;
                if (true
                    && (op = this.regexAccept(String.raw`@`, $$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.POSTOP_2, op};
                }
                return res;
            }, cr)();
    }
    public matchPREOP($$dpth: number, cr?: ContextRecorder): Nullable<PREOP> {
        return this.runner<PREOP>($$dpth,
            (log) => {
                if (log) {
                    log("PREOP");
                }
                let op: Nullable<Nullable<string>>;
                let at: Nullable<ATOM>;
                let res: Nullable<PREOP> = null;
                if (true
                    && ((op = this.regexAccept(String.raw`\&|!`, $$dpth + 1, cr)) || true)
                    && (at = this.matchATOM($$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.PREOP, op, at};
                }
                return res;
            }, cr)();
    }
    public matchATOM($$dpth: number, cr?: ContextRecorder): Nullable<ATOM> {
        return this.choice<ATOM>([
            () => this.matchATOM_1($$dpth + 1, cr),
            () => this.matchATOM_2($$dpth + 1, cr),
            () => this.matchATOM_3($$dpth + 1, cr),
        ]);
    }
    public matchATOM_1($$dpth: number, cr?: ContextRecorder): Nullable<ATOM_1> {
        return this.runner<ATOM_1>($$dpth,
            (log) => {
                if (log) {
                    log("ATOM_1");
                }
                let name: Nullable<NAME>;
                let res: Nullable<ATOM_1> = null;
                if (true
                    && (name = this.matchNAME($$dpth + 1, cr)) !== null
                    && this.negate(() => this.regexAccept(String.raw`\s*:=`, $$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.ATOM_1, name};
                }
                return res;
            }, cr)();
    }
    public matchATOM_2($$dpth: number, cr?: ContextRecorder): Nullable<ATOM_2> {
        return this.runner<ATOM_2>($$dpth,
            (log) => {
                if (log) {
                    log("ATOM_2");
                }
                let match: Nullable<STRLIT>;
                let res: Nullable<ATOM_2> = null;
                if (true
                    && (match = this.matchSTRLIT($$dpth + 1, cr)) !== null
                ) {
                    res = {kind: ASTKinds.ATOM_2, match};
                }
                return res;
            }, cr)();
    }
    public matchATOM_3($$dpth: number, cr?: ContextRecorder): Nullable<ATOM_3> {
        return this.runner<ATOM_3>($$dpth,
            (log) => {
                if (log) {
                    log("ATOM_3");
                }
                let sub: Nullable<RULE>;
                let res: Nullable<ATOM_3> = null;
                if (true
                    && this.regexAccept(String.raw`{`, $$dpth + 1, cr) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && (sub = this.matchRULE($$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`}`, $$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.ATOM_3, sub};
                }
                return res;
            }, cr)();
    }
    public matchATTR($$dpth: number, cr?: ContextRecorder): Nullable<ATTR> {
        return this.runner<ATTR>($$dpth,
            (log) => {
                if (log) {
                    log("ATTR");
                }
                let name: Nullable<NAME>;
                let type: Nullable<string>;
                let action: Nullable<string>;
                let res: Nullable<ATTR> = null;
                if (true
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`\.`, $$dpth + 1, cr) !== null
                    && (name = this.matchNAME($$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`=`, $$dpth + 1, cr) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && (type = this.regexAccept(String.raw`[^\s\{]+`, $$dpth + 1, cr)) !== null
                    && this.match_($$dpth + 1, cr) !== null
                    && this.regexAccept(String.raw`\{`, $$dpth + 1, cr) !== null
                    && (action = this.regexAccept(String.raw`([^\{\}\\]|(\\.))*`, $$dpth + 1, cr)) !== null
                    && this.regexAccept(String.raw`\}`, $$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.ATTR, name, type, action};
                }
                return res;
            }, cr)();
    }
    public matchNAME($$dpth: number, cr?: ContextRecorder): Nullable<NAME> {
        return this.regexAccept(String.raw`[a-zA-Z_]+`, $$dpth + 1, cr);
    }
    public matchSTRLIT($$dpth: number, cr?: ContextRecorder): Nullable<STRLIT> {
        return this.runner<STRLIT>($$dpth,
            (log) => {
                if (log) {
                    log("STRLIT");
                }
                let start: Nullable<PosInfo>;
                let val: Nullable<string>;
                let res: Nullable<STRLIT> = null;
                if (true
                    && (start = this.mark()) !== null
                    && this.regexAccept(String.raw`\'`, $$dpth + 1, cr) !== null
                    && (val = this.regexAccept(String.raw`([^\'\\]|(\\.))*`, $$dpth + 1, cr)) !== null
                    && this.regexAccept(String.raw`\'`, $$dpth + 1, cr) !== null
                ) {
                    res = {kind: ASTKinds.STRLIT, start, val};
                }
                return res;
            }, cr)();
    }
    public match_($$dpth: number, cr?: ContextRecorder): Nullable<_> {
        return this.regexAccept(String.raw`\s*`, $$dpth + 1, cr);
    }
    public test(): boolean {
        const mrk = this.mark();
        const res = this.matchGRAM(0);
        const ans = res !== null && this.finished();
        this.reset(mrk);
        return ans;
    }
    public parse(): ParseResult {
        const mrk = this.mark();
        const res = this.matchGRAM(0);
        if (res && this.finished()) {
            return new ParseResult(res, null);
        }
        this.reset(mrk);
        const rec = new ErrorTracker();
        this.matchGRAM(0, rec);
        return new ParseResult(res, rec.getErr());
    }
    private mark(): PosInfo {
        return this.pos;
    }
    private loop<T>(func: $$RuleType<T>, star: boolean = false): Nullable<T[]> {
        const mrk = this.mark();
        const res: T[] = [];
        for (;;) {
            const t = func();
            if (t === null) {
                break;
            }
            res.push(t);
        }
        if (star || res.length > 0) {
            return res;
        }
        this.reset(mrk);
        return null;
    }
    private runner<T>($$dpth: number, fn: $$RuleType<T>, cr?: ContextRecorder): $$RuleType<T> {
        return () => {
            const mrk = this.mark();
            const res = cr ? (() => {
                const extraInfo: string[] = [];
                const result = fn((msg: string) => extraInfo.push(msg));
                cr.record(mrk, $$dpth, result, this.negating, extraInfo);
                return result;
            })() : fn();
            if (res !== null) {
                return res;
            }
            this.reset(mrk);
            return null;
        };
    }
    private choice<T>(fns: Array<$$RuleType<T>>): Nullable<T> {
        for (const f of fns) {
            const res = f();
            if (res !== null) {
                return res;
            }
        }
        return null;
    }
    private regexAccept(match: string, dpth: number, cr?: ContextRecorder): Nullable<string> {
        return this.runner<string>(dpth,
            (log) => {
                if (log) {
                    if (this.negating) {
                        log("$$!StrMatch");
                    } else {
                        log("$$StrMatch");
                    }
                    log(match);
                }
                const reg = new RegExp(match, "y");
                reg.lastIndex = this.mark().overallPos;
                const res = reg.exec(this.input);
                if (res) {
                    let lineJmp = 0;
                    let lind = -1;
                    for (let i = 0; i < res[0].length; ++i) {
                        if (res[0][i] === "\n") {
                            ++lineJmp;
                            lind = i;
                        }
                    }
                    this.pos = {
                        overallPos: reg.lastIndex,
                        line: this.pos.line + lineJmp,
                        offset: lind === -1 ? this.pos.offset + res[0].length : (res[0].length - lind)
                    };
                    return res[0];
                }
                return null;
            }, cr)();
    }
    private noConsume<T>(fn: $$RuleType<T>): Nullable<T> {
        const mrk = this.mark();
        const res = fn();
        this.reset(mrk);
        return res;
    }
    private negate<T>(fn: $$RuleType<T>): Nullable<boolean> {
        const mrk = this.mark();
        const oneg = this.negating;
        this.negating = !oneg;
        const res = fn();
        this.negating = oneg;
        this.reset(mrk);
        return res === null ? true : null;
    }
}
export function parse(s: string): ParseResult {
    const p = new Parser(s);
    return p.parse();
}
export class ParseResult {
    public ast: Nullable<GRAM>;
    public err: Nullable<SyntaxErr>;
    constructor(ast: Nullable<GRAM>, err: Nullable<SyntaxErr>) {
        this.ast = ast;
        this.err = err;
    }
}
export interface PosInfo {
    readonly overallPos: number;
    readonly line: number;
    readonly offset: number;
}
export class SyntaxErr {
    public pos: PosInfo;
    public exprules: string[];
    public expmatches: string[];
    constructor(pos: PosInfo, exprules: Set<string>, expmatches: Set<string>) {
        this.pos = pos;
        this.exprules = [...exprules];
        this.expmatches = [...expmatches];
    }
    public toString(): string {
        return `Syntax Error at line ${this.pos.line}:${this.pos.offset}. Tried to match rules ${this.exprules.join(", ")}. Expected one of ${this.expmatches.map((x) => ` '${x}'`)}`;
    }
}
class ErrorTracker implements ContextRecorder {
    private mxpos: PosInfo = {overallPos: -1, line: -1, offset: -1};
    private mnd: number = -1;
    private prules: Set<string> = new Set();
    private pmatches: Set<string> = new Set();
    public record(pos: PosInfo, depth: number, result: any, negating: boolean, extraInfo: string[]) {
        if ((result === null) === negating) {
            return;
        }
        if (pos.overallPos > this.mxpos.overallPos) {
            this.mxpos = pos;
            this.mnd = depth;
            this.pmatches.clear();
            this.prules.clear();
        } else if (pos.overallPos === this.mxpos.overallPos && depth < this.mnd) {
            this.mnd = depth;
            this.prules.clear();
        }
        if (this.mxpos.overallPos === pos.overallPos && extraInfo.length >= 2) {
            if (extraInfo[0] === "$$StrMatch") {
                this.pmatches.add(extraInfo[1]);
            }
            if (extraInfo[0] === "$$!StrMatch") {
                this.pmatches.add(`not ${extraInfo[1]}`);
            }
        }
        if (this.mxpos.overallPos === pos.overallPos && this.mnd === depth) {
            extraInfo.forEach((x) => { if (x !== "$$StrMatch" && x !== "$$!StrMatch") { this.prules.add(x); } });
        }
    }
    public getErr(): SyntaxErr | null {
        if (this.mxpos.overallPos !== -1) {
            return new SyntaxErr(this.mxpos, this.prules, this.pmatches);
        }
        return null;
    }
}