import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import ParchmentCard from '../ui/ParchmentCard';
import InkButton from '../ui/InkButton';
import type { ProjectFormData, ProjectCategory } from '../../types/project';

interface ProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
}

const steps = ['Title & Category', 'Your Story', 'Location', 'Goal Amount'];

const categories: { value: ProjectCategory; label: string; icon: string }[] = [
  { value: 'paths', label: 'Paths & Walkways', icon: '🛤️' },
  { value: 'greenery', label: 'Greenery & Gardens', icon: '🌿' },
  { value: 'art', label: 'Art & Culture', icon: '🎨' },
  { value: 'safety', label: 'Safety & Lighting', icon: '🔦' },
];

export default function ProjectForm({ onSubmit }: ProjectFormProps) {
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<ProjectFormData>({
    title: '',
    story: '',
    location: '',
    neighborhood: '',
    category: 'paths',
    goalAmount: 100,
    imageUrl: '',
  });

  const update = (field: keyof ProjectFormData, value: string | number) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: '' }));
  };

  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    switch (step) {
      case 0:
        if (!form.title.trim()) newErrors.title = 'Every project needs a name.';
        break;
      case 1:
        if (form.story.trim().length < 20) newErrors.story = 'Tell us more — at least a few sentences.';
        break;
      case 2:
        if (!form.location.trim()) newErrors.location = 'Where will this happen?';
        if (!form.neighborhood.trim()) newErrors.neighborhood = 'Which neighborhood?';
        break;
      case 3:
        if (form.goalAmount < 50 || form.goalAmount > 500) {
          newErrors.goalAmount = 'Micro-grants must be between $50 and $500.';
        }
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) {
      if (step < steps.length - 1) setStep(step + 1);
      else onSubmit(form);
    }
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  return (
    <ParchmentCard noFold className="p-6 sm:p-8 max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((label, i) => (
          <div key={label} className="flex items-center">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-colors duration-300"
              style={{
                backgroundColor: i <= step ? 'var(--color-rust-accent)' : 'var(--color-parchment-dark)',
                color: i <= step ? 'var(--color-parchment-light)' : 'var(--color-ink-faded)',
              }}
            >
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-8 sm:w-16 h-0.5 mx-1"
                style={{
                  backgroundColor: i < step ? 'var(--color-rust-accent)' : 'var(--color-parchment-dark)',
                }}
              />
            )}
          </div>
        ))}
      </div>

      <h3 className="font-display text-xl font-bold mb-1"
        style={{ color: 'var(--color-ink)' }}>
        {steps[step]}
      </h3>
      <p className="text-sm mb-6" style={{ color: 'var(--color-ink-faded)' }}>
        Step {step + 1} of {steps.length}
      </p>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
          transition={{ duration: 0.25 }}
        >
          {step === 0 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                  Project Title
                </label>
                <input
                  className="parchment-input"
                  placeholder="e.g., Mend the Maple Street Sidewalk"
                  value={form.title}
                  onChange={(e) => update('title', e.target.value)}
                  maxLength={100}
                />
                {errors.title && <p className="text-xs mt-1" style={{ color: 'var(--color-rust-accent)' }}>{errors.title}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                  Category
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.value}
                      type="button"
                      className="p-3 rounded text-left text-sm transition-all duration-200 border"
                      style={{
                        backgroundColor: form.category === cat.value ? 'rgba(181, 69, 27, 0.08)' : 'var(--color-parchment-light)',
                        borderColor: form.category === cat.value ? 'var(--color-rust-accent)' : 'var(--color-parchment-dark)',
                        color: 'var(--color-ink)',
                      }}
                      onClick={() => update('category', cat.value)}
                    >
                      <span className="text-lg">{cat.icon}</span>
                      <span className="ml-2 font-body">{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                Tell the community your story
              </label>
              <textarea
                className="parchment-textarea"
                placeholder="Why does this matter? What change will it bring? Paint a picture with words..."
                value={form.story}
                onChange={(e) => update('story', e.target.value)}
                rows={6}
              />
              {errors.story && <p className="text-xs mt-1" style={{ color: 'var(--color-rust-accent)' }}>{errors.story}</p>}
              <p className="text-xs mt-2 font-mono" style={{ color: 'var(--color-sepia-mid)' }}>
                {form.story.length} characters
              </p>
            </div>
          )}

          {step === 2 && (
            <div className="flex flex-col gap-4">
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                  Specific Location
                </label>
                <input
                  className="parchment-input"
                  placeholder="e.g., Corner of Rosewood Ave & 3rd Street"
                  value={form.location}
                  onChange={(e) => update('location', e.target.value)}
                />
                {errors.location && <p className="text-xs mt-1" style={{ color: 'var(--color-rust-accent)' }}>{errors.location}</p>}
              </div>
              <div>
                <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                  Neighborhood
                </label>
                <input
                  className="parchment-input"
                  placeholder="e.g., Rosewood Heights"
                  value={form.neighborhood}
                  onChange={(e) => update('neighborhood', e.target.value)}
                />
                {errors.neighborhood && <p className="text-xs mt-1" style={{ color: 'var(--color-rust-accent)' }}>{errors.neighborhood}</p>}
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <label className="block text-sm font-bold mb-1.5" style={{ color: 'var(--color-ink)' }}>
                Funding Goal
              </label>
              <div className="flex items-center gap-3">
                <span className="font-mono text-2xl font-bold" style={{ color: 'var(--color-ink)' }}>$</span>
                <input
                  type="number"
                  className="parchment-input font-mono text-xl font-bold max-w-[150px]"
                  value={form.goalAmount}
                  onChange={(e) => update('goalAmount', parseInt(e.target.value) || 0)}
                  min={50}
                  max={500}
                />
              </div>
              {errors.goalAmount && <p className="text-xs mt-1" style={{ color: 'var(--color-rust-accent)' }}>{errors.goalAmount}</p>}
              <p className="text-xs mt-2 font-body italic" style={{ color: 'var(--color-ink-faded)' }}>
                Micro-grants are $50–$500. Small goals, mighty impact.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-8 pt-6 border-t"
        style={{ borderColor: 'var(--color-parchment-dark)' }}>
        {step > 0 ? (
          <InkButton variant="ghost" onClick={prevStep}>
            ← Back
          </InkButton>
        ) : (
          <div />
        )}
        <InkButton onClick={nextStep}>
          {step < steps.length - 1 ? 'Continue →' : '🧵 Weave This Project'}
        </InkButton>
      </div>
    </ParchmentCard>
  );
}
