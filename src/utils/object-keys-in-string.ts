export async function objectKeysInString(object: Object) {
    return Object.entries(object)
        .map(([key]) => `${key}`)
        .join(', ');
}
