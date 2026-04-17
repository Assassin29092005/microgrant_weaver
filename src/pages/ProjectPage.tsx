import { useParams, Link } from 'react-router-dom';
import PageWrapper from '../components/layout/PageWrapper';
import ProjectDetail from '../components/projects/ProjectDetail';
import DonationWeaver from '../components/grants/DonationWeaver';
import BackerList from '../components/grants/BackerList';
import InkButton from '../components/ui/InkButton';
import { useProjectStore } from '../store/projectStore';

export default function ProjectPage() {
  const { id } = useParams<{ id: string }>();
  const project = useProjectStore((s) => s.getProject(id || ''));

  if (!project) {
    return (
      <PageWrapper>
        <div className="text-center py-20">
          <p className="text-3xl mb-3" aria-hidden="true">🧵</p>
          <h2 className="font-display text-2xl font-bold mb-2"
            style={{ color: 'var(--color-ink)' }}>
            Thread Not Found
          </h2>
          <p className="text-sm mb-6" style={{ color: 'var(--color-ink-faded)' }}>
            This project may have been unwoven, or perhaps it never existed.
          </p>
          <Link to="/discover">
            <InkButton>Browse Projects</InkButton>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Back link */}
      <Link to="/discover"
        className="inline-flex items-center gap-1 text-sm mb-6 no-underline transition-colors hover:text-[var(--color-rust-accent)]"
        style={{ color: 'var(--color-ink-faded)' }}>
        ← Back to Discover
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2">
          <ProjectDetail project={project} />
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-6">
          <DonationWeaver
            projectId={project.id}
            projectTitle={project.title}
            isFunded={project.isFunded}
          />
          <BackerList backers={project.backers} />
        </div>
      </div>
    </PageWrapper>
  );
}
