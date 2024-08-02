export function isEmptyObject(x: object): boolean {
    return typeof x === 'object' && !Array.isArray(x) && x !== null;
}
