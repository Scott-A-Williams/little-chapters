import { Child } from '../types/child';
import { Moment } from '../types/moment';

export const SEED_CHILDREN: Child[] = [
  {
    id: 'child_maya_01',
    name: 'Maya',
    nickname: 'Mayabug',
    birthDate: '2025-11-14',
    gender: 'female',
    birthWeightKg: 3.42,
    birthHeightCm: 50.5,
    avatarUrl: '',
    relationship: 'Daughter',
    themeColor: '#009BC1',
    createdAt: '2025-11-14T10:00:00.000Z',
    updatedAt: '2025-11-14T10:00:00.000Z',
  },
  {
    id: 'child_oliver_02',
    name: 'Oliver',
    nickname: 'Ollie',
    birthDate: '2023-04-20',
    gender: 'male',
    birthWeightKg: 3.65,
    birthHeightCm: 52.0,
    avatarUrl: '',
    relationship: 'Son',
    themeColor: '#2B4A3A',
    createdAt: '2023-04-20T08:30:00.000Z',
    updatedAt: '2023-04-20T08:30:00.000Z',
  },
];

export const SEED_MOMENTS: Moment[] = [
  {
    id: 'moment_01',
    childId: 'child_maya_01',
    dateTime: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 mins ago
    title: 'Morning breastfeed & cuddle',
    notes: 'Fed for 18 minutes on left side. Drifting off into a peaceful morning contact nap.',
    category: 'feeding',
    tags: ['morning', 'nursing', 'calm'],
    photos: [],
    createdBy: 'Parent',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    categoryData: {
      feeding: {
        feedType: 'breast',
        breastSide: 'left',
        durationMinutes: 18,
      },
    },
  },
  {
    id: 'moment_02',
    childId: 'child_maya_01',
    dateTime: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    title: 'Wet nappy change before tummy time',
    notes: 'Very clean change, no redness or rash.',
    category: 'nappy_toileting',
    tags: ['routine'],
    photos: [],
    createdBy: 'Parent',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    categoryData: {
      nappy: {
        condition: 'wet',
        consistency: 'normal',
        rashNoted: false,
      },
    },
  },
  {
    id: 'moment_03',
    childId: 'child_maya_01',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // Yesterday
    title: 'First big social smile at Grandma!',
    notes: 'Grandma sang "Twinkle Twinkle" and Maya lit up with the widest, most intentional smile yet.',
    category: 'milestone',
    tags: ['milestone', 'grandma', 'firsts', 'joy'],
    photos: [],
    createdBy: 'Parent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    categoryData: {
      milestone: {
        domain: 'social_emotional',
        isMajor: true,
      },
    },
  },
  {
    id: 'moment_04',
    childId: 'child_maya_01',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(), // 2 days ago
    title: 'Calm evening lavender bath',
    notes: 'Loved floating with gentle support. Kicked her little feet and cooed softly.',
    category: 'bath',
    tags: ['bath', 'bedtime-routine'],
    photos: [],
    createdBy: 'Parent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
    categoryData: {
      bath: {
        enjoyed: true,
        notes: 'Very relaxed',
      },
    },
  },
  {
    id: 'moment_05',
    childId: 'child_oliver_02',
    dateTime: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    title: '"Look Daddy, the moon is sleeping behind the tree!"',
    notes: 'Pointed at the crescent moon during evening walk home from nursery.',
    category: 'quote',
    tags: ['quotes', 'bedtime', 'words'],
    photos: [],
    createdBy: 'Parent',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    categoryData: {
      quote: {
        quoteText: 'Look Daddy, the moon is sleeping behind the tree!',
        context: 'Walking home from nursery',
      },
    },
  },
];
