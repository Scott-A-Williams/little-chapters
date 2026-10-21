export interface Child {
  id: string;
  name: string;
  nickname?: string;

  // Required starter information
  birthDate: string; // ISO 8601 date string YYYY-MM-DD

  // Optional profile information
  gender?: 'female' | 'male' | 'other' | 'prefer_not_to_say';
  relationship?: string;

  // Birth measurements
  birthWeightKg?: number;
  birthHeightCm?: number;

  // Current measurements
  currentWeightKg?: number;
  currentHeightCm?: number;

  // Profile appearance
  avatarUrl?: string;
  themeColor?: string;

  createdAt: string;
  updatedAt: string;
}
