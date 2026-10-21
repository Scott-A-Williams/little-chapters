import { Moment, MomentCategory } from '../types/moment';
import { localStorageAdapter } from './storage/localStorageAdapter';
import { SEED_MOMENTS } from './seedData';

const MOMENTS_STORAGE_KEY = 'lc_moments_v1';

export interface MomentFilter {
  childId?: string;
  category?: MomentCategory | 'all';
  searchQuery?: string;
  tag?: string;
}

export class MomentService {
  async getMoments(filter?: MomentFilter): Promise<Moment[]> {
    let moments = await localStorageAdapter.getItem<Moment[]>(MOMENTS_STORAGE_KEY);
    if (!moments) {
      moments = SEED_MOMENTS;
      await localStorageAdapter.setItem(MOMENTS_STORAGE_KEY, SEED_MOMENTS);
    }

    let filtered = [...moments];

    if (filter?.childId) {
      filtered = filtered.filter((m) => m.childId === filter.childId);
    }

    if (filter?.category && filter.category !== 'all') {
      filtered = filtered.filter((m) => m.category === filter.category);
    }

    if (filter?.tag) {
      const tagLower = filter.tag.toLowerCase();
      filtered = filtered.filter((m) => m.tags.some((t) => t.toLowerCase() === tagLower));
    }

    if (filter?.searchQuery && filter.searchQuery.trim() !== '') {
      const q = filter.searchQuery.toLowerCase().trim();
      filtered = filtered.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.notes && m.notes.toLowerCase().includes(q)) ||
          m.tags.some((t) => t.toLowerCase().includes(q)) ||
          m.category.toLowerCase().includes(q)
      );
    }

    // Sort descending by dateTime (most recent first)
    return filtered.sort(
      (a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime()
    );
  }

  async getMomentById(id: string): Promise<Moment | null> {
    const all = await this.getMoments();
    return all.find((m) => m.id === id) || null;
  }

  async createMoment(
    input: Omit<Moment, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }
  ): Promise<Moment> {
    const moments = await this.getMoments();
    const now = new Date().toISOString();
    const newMoment: Moment = {
      ...input,
      id: input.id || `moment_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      createdAt: now,
      updatedAt: now,
      dateTime: input.dateTime || now,
      tags: input.tags || [],
      photos: input.photos || [],
      createdBy: input.createdBy || 'Parent',
    };

    const updated = [newMoment, ...moments];
    await localStorageAdapter.setItem(MOMENTS_STORAGE_KEY, updated);
    return newMoment;
  }

  async updateMoment(id: string, updates: Partial<Moment>): Promise<Moment> {
    const moments = await this.getMoments();
    const index = moments.findIndex((m) => m.id === id);
    if (index === -1) {
      throw new Error(`Moment with id "${id}" not found.`);
    }

    const updatedMoment: Moment = {
      ...moments[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    moments[index] = updatedMoment;
    await localStorageAdapter.setItem(MOMENTS_STORAGE_KEY, moments);
    return updatedMoment;
  }

  async deleteMoment(id: string): Promise<void> {
    const moments = await this.getMoments();
    const filtered = moments.filter((m) => m.id !== id);
    await localStorageAdapter.setItem(MOMENTS_STORAGE_KEY, filtered);
  }

  async getMomentsToday(childId: string): Promise<Moment[]> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const moments = await this.getMoments({ childId });
    return moments.filter((m) => new Date(m.dateTime).getTime() >= today.getTime());
  }

  async resetToSeedData(): Promise<void> {
    await localStorageAdapter.setItem(MOMENTS_STORAGE_KEY, SEED_MOMENTS);
  }
}

export const momentService = new MomentService();
