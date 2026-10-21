import { Child } from '../types/child';
import { localStorageAdapter } from './storage/localStorageAdapter';

const CHILDREN_STORAGE_KEY = 'lc_children_v1';
const ACTIVE_CHILD_STORAGE_KEY = 'lc_active_child_v1';

export class ChildService {
  async getChildren(): Promise<Child[]> {
    const stored = await localStorageAdapter.getItem<Child[]>(
      CHILDREN_STORAGE_KEY
    );

    return stored || [];
  }

  async getChildById(id: string): Promise<Child | null> {
    const children = await this.getChildren();
    return children.find((child) => child.id === id) || null;
  }

  async saveChild(child: Child): Promise<Child> {
    const children = await this.getChildren();
    const index = children.findIndex((item) => item.id === child.id);
    const updated = [...children];

    if (index >= 0) {
      updated[index] = {
        ...child,
        updatedAt: new Date().toISOString(),
      };
    } else {
      updated.push({
        ...child,
        createdAt: child.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }

    await localStorageAdapter.setItem(
      CHILDREN_STORAGE_KEY,
      updated
    );

    return child;
  }

  async deleteChild(id: string): Promise<void> {
    const children = await this.getChildren();
    const filtered = children.filter((child) => child.id !== id);

    await localStorageAdapter.setItem(
      CHILDREN_STORAGE_KEY,
      filtered
    );

    const activeId = await this.getActiveChildId();

    if (activeId === id) {
      await localStorageAdapter.removeItem(ACTIVE_CHILD_STORAGE_KEY);
    }
  }

  async getActiveChildId(): Promise<string> {
    const active = await localStorageAdapter.getItem<string>(
      ACTIVE_CHILD_STORAGE_KEY
    );

    return active || '';
  }

  async setActiveChildId(id: string): Promise<void> {
    await localStorageAdapter.setItem(
      ACTIVE_CHILD_STORAGE_KEY,
      id
    );
  }
}

export const childService = new ChildService();
