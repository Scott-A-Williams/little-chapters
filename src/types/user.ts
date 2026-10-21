export interface User {
  id: string;
  email: string;
  displayName: string;
  photoUrl?: string;
  role: 'parent' | 'guardian' | 'caregiver' | 'family';
  createdAt: string;
}

export interface CaregiverInvite {
  id: string;
  childId: string;
  invitedEmail: string;
  role: 'caregiver' | 'family';
  status: 'pending' | 'accepted' | 'declined';
  invitedAt: string;
}
