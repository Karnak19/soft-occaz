export const entries = Object.entries as <T>(obj: T) => Array<[keyof T, T[keyof T]]>;
