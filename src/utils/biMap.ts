export class BiMap<T, K> {
  private keyToValue = new Map<T, K>();
  private valueToKey = new Map<K, T>();

  public getValue(key: T) {
    return this.keyToValue.get(key);
  }

  public getKey(value: K) {
    return this.valueToKey.get(value);
  }

  public set(key: T, value: K) {
    if (this.keyToValue.has(key)) {
      const oldValue = this.keyToValue.get(key)!;
      this.valueToKey.delete(oldValue);
    }

    if (this.valueToKey.has(value)) {
      const oldKey = this.valueToKey.get(value)!;
      this.keyToValue.delete(oldKey);
    }

    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }

  public hasKey(key: T) {
    return this.keyToValue.has(key);
  }

  public hasValue(value: K) {
    return this.valueToKey.has(value);
  }

  public deleteByKey(key: T) {
    const value = this.keyToValue.get(key);
    this.keyToValue.delete(key);
    this.valueToKey.delete(value!);
  }

  public deleteByValue(value: K) {
    const key = this.valueToKey.get(value);
    this.valueToKey.delete(value);
    this.keyToValue.delete(key!);
  }

  clear() {
    this.keyToValue.clear();
    this.valueToKey.clear();
  }
}
