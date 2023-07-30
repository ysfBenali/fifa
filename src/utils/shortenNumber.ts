export function shortenNumber(
    value: number = 0,
    { noSpace = false, fixed = 0, split = false } = {}
): string | [string, string] {
    if (typeof value !== "number") {
        return value;
    }

    const toFixed = (v: number) => v.toFixed(fixed).replace(/\.0$/, "");
    let power = 0;
    let letter: string | undefined;

    if (value >= 1e9) {
        power = 1e9;
        letter = "B";
    } else if (value >= 1e6) {
        power = 1e6;
        letter = "M";
    } else if (value >= 1e3) {
        power = 1e3;
        letter = "K";
    } else {
        power = 1;
    }

    const num = toFixed(value / power);
    if (split) return [num, letter!];
    if (!letter) return num;
    return `${num}${noSpace ? "" : " "}${letter}`;
}