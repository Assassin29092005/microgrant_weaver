import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import ParchmentCard from '../components/ui/ParchmentCard';
import InkButton from '../components/ui/InkButton';
import SettingsPanel from '../components/butterfly/SettingsPanel';
import { useUserStore } from '../store/userStore';
import { useProjectStore } from '../store/projectStore';
import { formatCurrency } from '../lib/formatCurrency';
import { useButterflyStore } from '../store/butterflyStore';

export default function Profile() {
  const shouldReduceMotion = useReducedMotion();
  const user = useUserStore((s) => s.user);
  const projects = useProjectStore((s) => s.projects);
  const currencySymbol = useButterflyStore((s) => s.settings.currency_symbol);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const backedProjects = projects.filter((p) => user.projectsBacked.includes(p.id));
  const createdProjects = projects.filter((p) => user.projectsCreated.includes(p.id));

  return (
    <PageWrapper>
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Profile header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold mb-1"
              style={{ color: 'var(--color-ink)' }}>
              {user.displayName}
            </h1>
            <p className="text-sm font-mono"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Weaving since {user.joinedAt}
            </p>
          </div>
          <InkButton variant="secondary" onClick={() => setSettingsOpen(true)}>
            🦋 Settings
          </InkButton>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          <ParchmentCard noFold className="text-center p-6">
            <span className="block font-mono text-3xl font-bold"
              style={{ color: 'var(--color-moss-green)' }}>
              {formatCurrency(user.totalDonated, currencySymbol)}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Total Woven
            </span>
          </ParchmentCard>
          <ParchmentCard noFold className="text-center p-6">
            <span className="block font-mono text-3xl font-bold"
              style={{ color: 'var(--color-gold-leaf)' }}>
              {user.projectsBacked.length}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Projects Backed
            </span>
          </ParchmentCard>
          <ParchmentCard noFold className="text-center p-6">
            <span className="block font-mono text-3xl font-bold"
              style={{ color: 'var(--color-rust-accent)' }}>
              {user.projectsCreated.length}
            </span>
            <span className="text-xs font-mono uppercase tracking-wider"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Projects Created
            </span>
          </ParchmentCard>
        </div>

        {/* Your Weaves */}
        <section className="mb-10">
          <h2 className="font-display text-2xl font-bold mb-4"
            style={{ color: 'var(--color-ink)' }}>
            🧵 Your Weaves
          </h2>
          {backedProjects.length > 0 ? (
            <div className="flex flex-col gap-3">
              {backedProjects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`} className="no-underline">
                  <ParchmentCard noFold className="p-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-display text-base font-bold"
                        style={{ color: 'var(--color-ink)' }}>
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono"
                        style={{ color: 'var(--color-sepia-mid)' }}>
                        📍 {project.neighborhood}
                      </p>
                    </div>
                    <span className={`category-badge ${project.category}`}>
                      {project.category}
                    </span>
                  </ParchmentCard>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm italic" style={{ color: 'var(--color-ink-faded)' }}>
              You haven't woven into any projects yet. <Link to="/discover" className="text-rust no-underline hover:underline" style={{ color: 'var(--color-rust-accent)' }}>Discover one?</Link>
            </p>
          )}
        </section>

        {/* Your Projects */}
        <section>
          <h2 className="font-display text-2xl font-bold mb-4"
            style={{ color: 'var(--color-ink)' }}>
            📜 Your Projects
          </h2>
          {createdProjects.length > 0 ? (
            <div className="flex flex-col gap-3">
              {createdProjects.map((project) => (
                <Link key={project.id} to={`/project/${project.id}`} className="no-underline">
                  <ParchmentCard noFold className="p-4">
                    <h3 className="font-display text-base font-bold"
                      style={{ color: 'var(--color-ink)' }}>
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono mt-1"
                      style={{ color: 'var(--color-moss-green)' }}>
                      {formatCurrency(project.raisedAmount, currencySymbol)} / {formatCurrency(project.goalAmount, currencySymbol)}
                    </p>
                  </ParchmentCard>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm italic" style={{ color: 'var(--color-ink-faded)' }}>
              No projects started yet. <Link to="/submit" className="no-underline hover:underline" style={{ color: 'var(--color-rust-accent)' }}>Weave the first one?</Link>
            </p>
          )}
        </section>
      </motion.div>

      {/* Settings panel */}
      <SettingsPanel isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </PageWrapper>
  );
}
