export type MomentCategory =
  | 'milestone'
  | 'first'
  | 'memory'
  | 'activity'
  | 'photo'
  | 'quote'
  | 'food'
  | 'allergy_reaction'
  | 'growth'
  | 'health'
  | 'medication'
  | 'sleep'
  | 'feeding'
  | 'nappy_toileting'
  | 'tooth'
  | 'bath'
  | 'important_date'
  | 'custom';

export interface GrowthData {
  weightKg?: number;
  heightCm?: number;
  headCircumferenceCm?: number;
}

export interface FeedingData {
  feedType: 'breast' | 'bottle_formula' | 'bottle_expressed' | 'solids';
  breastSide?: 'left' | 'right' | 'both';
  amountMl?: number;
  durationMinutes?: number;
}

export interface SleepData {
  sleepType: 'nap' | 'night';
  durationMinutes?: number;
  quality?: 'peaceful' | 'restless' | 'interrupted';
}

export interface NappyData {
  condition: 'wet' | 'dirty' | 'both' | 'clean';
  consistency?: 'normal' | 'soft' | 'hard' | 'loose';
  rashNoted?: boolean;
}

export interface QuoteData {
  quoteText: string;
  context?: string;
  saidTo?: string;
}

export interface AllergyReactionData {
  allergen: string;
  severity: 'mild' | 'moderate' | 'severe';
  symptoms: string[];
  actionTaken?: string;
}

export interface HealthData {
  temperatureC?: number;
  symptoms?: string[];
  diagnosis?: string;
}

export interface MedicationData {
  medicationName: string;
  dosage: string;
  reason?: string;
}

export interface ToothData {
  toothName: string;
  toothNumber?: number;
  stage: 'emerging' | 'cut' | 'lost';
}

export interface MilestoneData {
  domain?: 'motor' | 'language' | 'cognitive' | 'social_emotional';
  isMajor?: boolean;
}

export interface FoodData {
  foodItem: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  liked?: 'loved' | 'neutral' | 'disliked';
  isFirstTaste?: boolean;
}

export interface BathData {
  enjoyed?: boolean;
  notes?: string;
}

export interface ImportantDateData {
  eventType: 'birthday' | 'checkup' | 'vaccination' | 'travel' | 'celebration' | 'other';
  reminderSet?: boolean;
}

export type CategorySpecificData = {
  growth?: GrowthData;
  feeding?: FeedingData;
  sleep?: SleepData;
  nappy?: NappyData;
  quote?: QuoteData;
  allergy?: AllergyReactionData;
  health?: HealthData;
  medication?: MedicationData;
  tooth?: ToothData;
  milestone?: MilestoneData;
  food?: FoodData;
  bath?: BathData;
  importantDate?: ImportantDateData;
  custom?: Record<string, unknown>;
};

export interface Moment {
  id: string;
  childId: string;
  dateTime: string; // ISO 8601 string e.g. 2026-10-21T09:30:00.000Z
  title: string;
  notes?: string;
  category: MomentCategory;
  tags: string[];
  photos: string[]; // URLs or base64 data strings for offline/local previews
  createdBy: string; // User ID or display name
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  categoryData?: CategorySpecificData;
}

export interface MomentCategoryMeta {
  category: MomentCategory;
  label: string;
  shortLabel: string;
  iconName: string;
  color: string;
  description: string;
  quickPresets?: string[];
}
