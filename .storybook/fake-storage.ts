export class StorageArea {
  private _items: Record<string, string> = {};
  get(
    keys?: string | string[] | Record<string, unknown> | null,
    callback?: (items: Record<string, unknown>) => void
  ): unknown {
    const [keys2, defaults] =
      Array.isArray(keys)
      ? [keys, {}]
      : typeof keys === "object" && keys != null
      ? [Object.keys(keys), keys]
      : typeof keys === "string"
      ? [keys, {}]
      : [Object.keys(this._items), {}];
    const values: Record<string, unknown> = {};
    for (const key of keys2) {
      const serialized = getOwnValue(this._items, key);
      if (serialized != null) {
        values[key] = JSON.parse(serialized);
      } else {
        const defaultValue = getOwnValue(defaults, key);
        if (defaultValue !== undefined) {
          values[key] = defaultValue;
        }
      }
    }
    const promise = Promise.resolve(values);
    if (callback) {
      promise.then(callback);
    } else {
      return promise;
    }
  }
  set(
    values: Record<string, unknown>,
    callback?: () => void
  ): unknown {
    for (const [key, value] of Object.entries(values)) {
      Object.defineProperty(this._items, key, {
        value: JSON.stringify(value),
        writable: true,
        enumerable: true,
        configurable: true,
      })
    }
    const promise = Promise.resolve();
    if (callback) {
      promise.then(callback);
    } else {
      return promise;
    }
  }
}

function getOwnValue<T>(obj: Readonly<Record<string, T>>, key: string): T | undefined {
  return Object.hasOwn(obj, key) ? obj[key] : undefined;
}

export const local = new StorageArea();
export const managed = new StorageArea();
export const session = new StorageArea();
export const sync = new StorageArea();
export const storage = { local, managed, session, sync };
