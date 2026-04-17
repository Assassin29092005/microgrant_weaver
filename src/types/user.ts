export interface User {
  id: string;
  displayName: string;
  joinedAt: string;
  totalDonated: number;
  projectsBacked: string[];
  projectsCreated: string[];
}

export interface UserPreferences {
  notificationSound: 'chime' | 'bell' | 'harp' | 'none';
  displayName: string;
  isAnonymousByDefault: boolean;
}
