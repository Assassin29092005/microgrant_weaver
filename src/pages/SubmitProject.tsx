import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import ProjectForm from '../components/projects/ProjectForm';
import WaxSeal from '../components/ui/WaxSeal';
import InkButton from '../components/ui/InkButton';
import { useProjectStore } from '../store/projectStore';
import { useUserStore } from '../store/userStore';
import type { ProjectFormData } from '../types/project';

export default function SubmitProject() {
  const shouldReduceMotion = useReducedMotion();
  const navigate = useNavigate();
  const addProject = useProjectStore((s) => s.addProject);
  const addCreatedProject = useUserStore((s) => s.addCreatedProject);
  const [submitted, setSubmitted] = useState(false);
  const [newProjectId, setNewProjectId] = useState('');

  const handleSubmit = (data: ProjectFormData) => {
    const id = addProject(data);
    addCreatedProject(id);
    setNewProjectId(id);
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl font-bold mb-2"
                style={{ color: 'var(--color-ink)' }}>
                Start a New Project
              </h1>
              <p className="font-body text-base"
                style={{ color: 'var(--color-ink-faded)' }}>
                Propose a hyperlocal project and let the community weave it into reality.
              </p>
            </div>
            <ProjectForm onSubmit={handleSubmit} />
          </motion.div>
        ) : (
          <motion.div
            key="success"
            className="text-center py-16"
            initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WaxSeal size="lg" className="mx-auto mb-6" />
            <h2 className="font-display text-3xl font-bold mb-3"
              style={{ color: 'var(--color-ink)' }}>
              Project Woven! 🧵
            </h2>
            <p className="font-body text-lg mb-8 max-w-md mx-auto"
              style={{ color: 'var(--color-ink-faded)' }}>
              Your project is now part of the community fabric. Share it far and wide.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <InkButton onClick={() => navigate(`/project/${newProjectId}`)}>
                View Your Project
              </InkButton>
              <InkButton variant="secondary" onClick={() => navigate('/discover')}>
                Browse All Projects
              </InkButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageWrapper>
  );
}
