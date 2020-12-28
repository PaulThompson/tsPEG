import { parse } from "./parser";

test("test parser", () => {
    const tcs: string[] = [
        "a",
        "aaaaaaaa",
        "bb",
        "bab",
    ];
    for (const tc of tcs) {
        const res = parse(tc);
        expect(res.err).toBeNull();
        expect(res.ast).not.toBeNull();
    }
});