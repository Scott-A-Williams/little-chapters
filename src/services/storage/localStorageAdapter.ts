import { StorageAdapter } from './storageAdapter';

class LocalStorageAdapter implements StorageAdapter {
  private memoryStore: Map<string, string> = new Map();

  private isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__lc_test__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  async getItem<T>(key: string): Promise<T | null> {
    try {
      const raw = this.isLocalStorageAvailable()
        ? window.localStorage.getItem(key)
        : this.memoryStore.get(key) || null;

      if (!raw) return null;
      return JSON.parse(raw) as T;
    } catch (error) {
      console.warn(`[LocalStorageAdapter] Failed to parse key "${key}":`, error);
      return null;
    }
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    try {
      const serialized = JSON.stringify(value);
      if (this.isLocalStorageAvailable()) {
        window.localStorage.setItem(key, serialized);
      } else {
        this.memoryStore.set(key, serialized);
      }
    } catch (error) {
      console.error(`[LocalStorageAdapter] Failed to store key "${key}":`, error);
    }
  }

  async removeItem(key: string): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    } else {
      this.memoryStore.delete(key);
    }
  }

  async clear(): Promise<void> {
    if (this.isLocalStorageAvailable()) {
      window.localStorage.clear();
    } else {
      this.memoryStore.clear();
    }
  }
}

export const localStorageAdapter = new LocalStorageAdapter();
