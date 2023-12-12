export type FindReturnType<T> = T extends (...args: unknown[]) => infer R ? R : unknown;
