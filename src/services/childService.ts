import { Child } from '../types/child';
import { localStorageAdapter } from './storage/localStorageAdapter';

const CHILDREN_STORAGE_KEY = 'lc_children_v1';
const ACTIVE_CHILD_STORAGE_KEY = 'lc_active_child_v1';

export class ChildService {
  async getChildren(): Promise<Child[]> {
    const stored = await localStorageAdapter.getItem<Child[]>(
      CHILDREN_STORAGE_KEY
    );

    // No seeded/default children.
    // A new user should see the child setup screen.
    return stored || [];
  }

  async getChildById(id: string): Promise<Child | null> {
    const children = await this.getChildren();

    return children.find((child) => child.id === id) || null;
  }

  async saveChild(child: Child): Promise<Child> {
    const children = await this.getChildren();
    const index = children.findIndex((item) => item.id === child.id);

    const now = new Date().toISOString();

    const savedChild: Child = {
      ...child,
      createdAt: child.createdAt || now,
      updatedAt: now,
    };

    const updated = [...children];

    if (index >= 0) {
      updated[index] = savedChild;
    } else {
      updated.push(savedChild);
    }

    await localStorageAdapter.setItem(
      CHILDREN_STORAGE_KEY,
      updated
    );

    return savedChild;
  }

  async deleteChild(id: string): Promise<void> {
    const children = await this.getChildren();

    const filtered = children.filter(
      (child) => child.id !== id
    );

    await localStorageAdapter.setItem(
      CHILDREN_STORAGE_KEY,
      filtered
    );

    const activeId =
      await localStorageAdapter.getItem<string>(
        ACTIVE_CHILD_STORAGE_KEY
      );

    if (activeId === id) {
      await localStorageAdapter.removeItem(
        ACTIVE_CHILD_STORAGE_KEY
      );
    }
  }

  async getActiveChildId(): Promise<string> {
    const active =
      await localStorageAdapter.getItem<string>(
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
