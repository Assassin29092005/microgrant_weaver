export interface Project {
  id: string;
  title: string;
  story: string;
  location: string;
  neighborhood: string;
  category: ProjectCategory;
  goalAmount: number;
  raisedAmount: number;
  backerCount: number;
  createdAt: string;
  imageUrl: string;
  creatorName: string;
  creatorId: string;
  updates: ProjectUpdate[];
  backers: Backer[];
  isFunded: boolean;
}

export type ProjectCategory = 'paths' | 'greenery' | 'art' | 'safety';

export interface ProjectUpdate {
  id: string;
  date: string;
  text: string;
}

export interface Backer {
  id: string;
  name: string;
  amount: number;
  message: string;
  date: string;
  isAnonymous: boolean;
}

export interface ProjectFormData {
  title: string;
  story: string;
  location: string;
  neighborhood: string;
  category: ProjectCategory;
  goalAmount: number;
  imageUrl: string;
}
