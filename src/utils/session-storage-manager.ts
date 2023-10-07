export enum SessionStoragekey {
  CHECKOUT_DATA = 'CHECKOUT_DATA'
}

export default class SessionStorageManager {
  static set<T>(key: SessionStoragekey, value: T): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  static get<T>(key: SessionStoragekey): T | undefined {
    const item = sessionStorage.getItem(key);

    return item ? JSON.parse(item) as T : undefined;
  }

  static remove(key: SessionStoragekey): void {
    sessionStorage.removeItem(key);
  }
}