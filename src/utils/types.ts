// create a new type by making few fields of an existing type optional
// If you want to make all fields in a type optional, use typescript's builtin Partial<type_name>:
export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

// Creates a new type by removing some fields from another type
export type StrictOmit<T, K extends keyof T> = T extends any ? Pick<T, Exclude<keyof T, K>> : never;
