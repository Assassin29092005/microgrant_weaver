import { useMemo } from 'react';
import { useProjectStore } from '../store/projectStore';
import { useButterflyStore } from '../store/butterflyStore';
import type { Project } from '../types/project';

export function useProjectFeed(category: string = 'all') {
  const projects = useProjectStore((s) => s.projects);
  const sortOrder = useButterflyStore((s) => s.settings.sort_order);

  const filtered = useMemo(() => {
    let result: Project[];

    if (category === 'all') {
      result = [...projects];
    } else {
      result = projects.filter((p) => p.category === category);
    }

    switch (sortOrder) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'most_funded':
        result.sort((a, b) => (b.raisedAmount / b.goalAmount) - (a.raisedAmount / a.goalAmount));
        break;
      case 'almost_there':
        result.sort((a, b) => {
          if (a.isFunded !== b.isFunded) return a.isFunded ? 1 : -1;
          return (b.raisedAmount / b.goalAmount) - (a.raisedAmount / a.goalAmount);
        });
        break;
    }

    return result;
  }, [projects, category, sortOrder]);

  return filtered;
}
