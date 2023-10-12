export enum LocalStoragekey {
  ACT = 'ACT',
  USR = 'USR'
}

export default class LocalStorageManager {
  static set<T>(key: LocalStoragekey, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: LocalStoragekey): T | undefined {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) as T : undefined;
  }

  static remove(key: LocalStoragekey): void {
    localStorage.removeItem(key);
  }
}