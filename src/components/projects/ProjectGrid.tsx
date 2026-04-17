import type { Project } from '../../types/project';
import ProjectCard from './ProjectCard';

interface ProjectGridProps {
  projects: Project[];
  emptyMessage?: string;
}

export default function ProjectGrid({ projects, emptyMessage }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-3xl mb-3" aria-hidden="true">🧵</p>
        <p className="font-body italic text-lg"
          style={{ color: 'var(--color-ink-faded)' }}>
          {emptyMessage || 'No projects yet — be the first to weave one.'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
