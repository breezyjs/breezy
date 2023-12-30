export default class Store<T extends Record<string, unknown>> {
  private readonly store: T;

  constructor(initialValue: T) {
    this.store = initialValue;
  }

  read<K extends keyof T>(itemKey: K): T[K] | null {
    return this.store[itemKey] ?? null;
  }

  mutate<K extends keyof T>(itemKey: keyof T, value: T[K]): void {
    this.store[itemKey] = value;
  }
}
