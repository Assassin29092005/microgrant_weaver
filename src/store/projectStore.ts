import { create } from 'zustand';
import type { Project, Backer, ProjectFormData } from '../types/project';
import { mockProjects } from '../lib/mockData';

interface ProjectStore {
  projects: Project[];
  getProject: (id: string) => Project | undefined;
  addBacker: (projectId: string, backer: Backer) => void;
  addProject: (formData: ProjectFormData) => string;
  getFeaturedProjects: () => Project[];
  getProjectsByCategory: (category: string) => Project[];
}

export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: mockProjects,

  getProject: (id: string) => {
    return get().projects.find((p) => p.id === id);
  },

  addBacker: (projectId: string, backer: Backer) => {
    set((state) => ({
      projects: state.projects.map((p) => {
        if (p.id !== projectId) return p;
        const newRaised = Math.min(p.raisedAmount + backer.amount, p.goalAmount);
        return {
          ...p,
          raisedAmount: newRaised,
          backerCount: p.backerCount + 1,
          backers: [backer, ...p.backers],
          isFunded: newRaised >= p.goalAmount,
        };
      }),
    }));
  },

  addProject: (formData: ProjectFormData) => {
    const id = `proj-${Date.now()}`;
    const newProject: Project = {
      id,
      ...formData,
      raisedAmount: 0,
      backerCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
      creatorName: 'You',
      creatorId: 'user-current',
      updates: [],
      backers: [],
      isFunded: false,
    };
    set((state) => ({ projects: [newProject, ...state.projects] }));
    return id;
  },

  getFeaturedProjects: () => {
    return get()
      .projects
      .filter((p) => !p.isFunded)
      .sort((a, b) => {
        const aPct = a.raisedAmount / a.goalAmount;
        const bPct = b.raisedAmount / b.goalAmount;
        return bPct - aPct;
      })
      .slice(0, 4);
  },

  getProjectsByCategory: (category: string) => {
    if (category === 'all') return get().projects;
    return get().projects.filter((p) => p.category === category);
  },
}));
