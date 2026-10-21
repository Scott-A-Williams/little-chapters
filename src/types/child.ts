export interface Child {
  id: string;
  name: string;
  nickname?: string;
  birthDate: string; // ISO 8601 date string YYYY-MM-DD
  gender?: 'female' | 'male' | 'other' | 'prefer_not_to_say';
  birthWeightKg?: number;
  birthHeightCm?: number;
  avatarUrl?: string;
  themeColor?: string; // Optional child-specific accent (e.g. #009BC1)
  relationship?: string; // e.g. "Daughter", "Son", "Niece", "Grandchild"
  createdAt: string;
  updatedAt: string;
}
