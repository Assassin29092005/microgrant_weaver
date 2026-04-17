import { create } from 'zustand';
import type { User, UserPreferences } from '../types/user';
import { mockUser } from '../lib/mockData';

interface UserStore {
  user: User;
  preferences: UserPreferences;
  addDonation: (projectId: string, amount: number) => void;
  addCreatedProject: (projectId: string) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  updateDisplayName: (name: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: mockUser,
  preferences: {
    notificationSound: 'chime',
    displayName: mockUser.displayName,
    isAnonymousByDefault: false,
  },

  addDonation: (projectId: string, amount: number) => {
    set((state) => ({
      user: {
        ...state.user,
        totalDonated: state.user.totalDonated + amount,
        projectsBacked: state.user.projectsBacked.includes(projectId)
          ? state.user.projectsBacked
          : [...state.user.projectsBacked, projectId],
      },
    }));
  },

  addCreatedProject: (projectId: string) => {
    set((state) => ({
      user: {
        ...state.user,
        projectsCreated: [...state.user.projectsCreated, projectId],
      },
    }));
  },

  updatePreferences: (prefs: Partial<UserPreferences>) => {
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    }));
  },

  updateDisplayName: (name: string) => {
    set((state) => ({
      user: { ...state.user, displayName: name },
      preferences: { ...state.preferences, displayName: name },
    }));
  },
}));
