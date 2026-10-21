import { Child } from '../types/child';
import { localStorageAdapter } from './storage/localStorageAdapter';
import { SEED_CHILDREN } from './seedData';

const CHILDREN_STORAGE_KEY = 'lc_children_v1';
const ACTIVE_CHILD_STORAGE_KEY = 'lc_active_child_v1';

export class ChildService {
  async getChildren(): Promise<Child[]> {
    const stored = await localStorageAdapter.getItem<Child[]>(CHILDREN_STORAGE_KEY);
    if (!stored || stored.length === 0) {
      await localStorageAdapter.setItem(CHILDREN_STORAGE_KEY, SEED_CHILDREN);
      return SEED_CHILDREN;
    }
    return stored;
  }

  async getChildById(id: string): Promise<Child | null> {
    const children = await this.getChildren();
    return children.find((c) => c.id === id) || null;
  }

  async saveChild(child: Child): Promise<Child> {
    const children = await this.getChildren();
    const index = children.findIndex((c) => c.id === child.id);
    const updated = [...children];

    if (index >= 0) {
      updated[index] = { ...child, updatedAt: new Date().toISOString() };
    } else {
      updated.push({
        ...child,
        createdAt: child.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await localStorageAdapter.setItem(CHILDREN_STORAGE_KEY, updated);
    return child;
  }

  async deleteChild(id: string): Promise<void> {
    const children = await this.getChildren();
    const filtered = children.filter((c) => c.id !== id);
    await localStorageAdapter.setItem(CHILDREN_STORAGE_KEY, filtered);
  }

  async getActiveChildId(): Promise<string> {
    const active = await localStorageAdapter.getItem<string>(ACTIVE_CHILD_STORAGE_KEY);
    if (active) return active;
    const children = await this.getChildren();
    const firstId = children[0]?.id || '';
    if (firstId) {
      await this.setActiveChildId(firstId);
    }
    return firstId;
  }

  async setActiveChildId(id: string): Promise<void> {
    await localStorageAdapter.setItem(ACTIVE_CHILD_STORAGE_KEY, id);
  }
}

export const childService = new ChildService();
