import { motion, useReducedMotion } from 'framer-motion';
import PageWrapper from '../components/layout/PageWrapper';
import ParchmentCard from '../components/ui/ParchmentCard';

const steps = [
  {
    icon: '📜',
    title: '1. Propose a Project',
    description: 'Got a hyperlocal idea? A cracked sidewalk that needs mending, a bare wall begging for color, a dark path crying out for light? Submit it as a micro-grant — $50 to $500, no more.',
  },
  {
    icon: '🧵',
    title: '2. The Community Weaves In',
    description: 'Neighbors, friends, and strangers discover your project and weave in tiny donations — even a single dollar. Each contribution is a thread in the fabric of your community.',
  },
  {
    icon: '🦋',
    title: '3. The Butterfly Effect',
    description: 'Here\'s the twist: whenever anyone changes a setting — their donation amount, their display name, anything — three other random settings across the platform subtly shift. A gentle reminder that every small action ripples outward.',
  },
  {
    icon: '🎉',
    title: '4. The Project Comes to Life',
    description: 'When a project reaches its goal, it earns the Wax Seal of completion. The creator can begin their work, posting updates along the way. The community watches its thread turn into something tangible.',
  },
];

const faq = [
  {
    q: 'Why micro-grants?',
    a: 'Big crowdfunding platforms are built for big dreams. We\'re built for the small, immediate things — the broken step, the missing bench, the faded crosswalk. These tiny projects are the threads that hold neighborhoods together.',
  },
  {
    q: 'What is the Butterfly Effect?',
    a: 'It\'s our core philosophy made interactive. When you change one setting, three others shift randomly. You can\'t control exactly what changes — just like in real life, where every small act sends ripples you can\'t predict. It\'s playful, a bit chaotic, and deeply human.',
  },
  {
    q: 'Can I undo a butterfly ripple?',
    a: 'Not directly! But you can change the setting again — which will trigger another ripple. It\'s ripples all the way down. Embrace the beautiful chaos.',
  },
  {
    q: 'How much can I donate?',
    a: 'As little as $1. There\'s no minimum that\'s too small. Even a penny weaves a thread.',
  },
  {
    q: 'What categories are supported?',
    a: 'Paths & Walkways, Greenery & Gardens, Art & Culture, and Safety & Lighting. If your project touches your neighborhood, it probably fits.',
  },
];

export default function HowItWorks() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <PageWrapper>
      <motion.div
        initial={shouldReduceMotion ? {} : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-ink)' }}>
            How It Works
          </h1>
          <p className="font-body text-lg max-w-xl mx-auto"
            style={{ color: 'var(--color-ink-faded)' }}>
            From proposal to completion — your guide to weaving community change.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto mb-16">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="flex gap-4 mb-8"
              initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.12 }}
            >
              <div className="shrink-0 w-14 h-14 flex items-center justify-center text-3xl rounded-full border-2"
                style={{ borderColor: 'var(--color-gold-leaf)', backgroundColor: 'rgba(201, 168, 76, 0.08)' }}>
                {step.icon}
              </div>
              <div>
                <h3 className="font-display text-lg font-bold mb-1"
                  style={{ color: 'var(--color-ink)' }}>
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed"
                  style={{ color: 'var(--color-ink-faded)' }}>
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="ornament-divider" aria-hidden="true">❧ ✦ ⁕ ✦ ❧</div>

        {/* The Butterfly Effect — Explained */}
        <section className="max-w-2xl mx-auto my-12">
          <h2 className="font-display text-2xl font-bold mb-6 text-center"
            style={{ color: 'var(--color-ink)' }}>
            🦋 The Butterfly Effect — Explained
          </h2>

          <ParchmentCard noFold className="p-6">
            <div className="text-center mb-4">
              <p className="text-4xl mb-2">🦋</p>
              <p className="font-display text-lg italic"
                style={{ color: 'var(--color-rust-accent)' }}>
                "A butterfly flaps its wings in one neighborhood, and three things change in another."
              </p>
            </div>

            <div className="space-y-3 mt-6">
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5" style={{ color: 'var(--color-gold-leaf)' }}>✦</span>
                <p className="text-sm" style={{ color: 'var(--color-ink-faded)' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>You change one setting</strong> — adjusting your donation amount, toggling your display name, or switching a preference.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5" style={{ color: 'var(--color-gold-leaf)' }}>✦</span>
                <p className="text-sm" style={{ color: 'var(--color-ink-faded)' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>Three random settings shift</strong> — the parchment warmth changes, the font size adjusts, or the currency symbol swaps. It's never the same.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-sm mt-0.5" style={{ color: 'var(--color-gold-leaf)' }}>✦</span>
                <p className="text-sm" style={{ color: 'var(--color-ink-faded)' }}>
                  <strong style={{ color: 'var(--color-ink)' }}>A butterfly flutters across your screen</strong> — a gentle animation reminding you that your small action rippled outward.
                </p>
              </div>
            </div>
          </ParchmentCard>
        </section>

        <div className="ornament-divider" aria-hidden="true">⁕ ❧ ⁕</div>

        {/* FAQ */}
        <section className="max-w-2xl mx-auto my-12">
          <h2 className="font-display text-2xl font-bold mb-6 text-center"
            style={{ color: 'var(--color-ink)' }}>
            Frequently Asked Questions
          </h2>
          <div className="flex flex-col gap-4">
            {faq.map((item) => (
              <ParchmentCard key={item.q} noFold className="p-5">
                <h3 className="font-display text-base font-bold mb-2"
                  style={{ color: 'var(--color-ink)' }}>
                  {item.q}
                </h3>
                <p className="text-sm" style={{ color: 'var(--color-ink-faded)' }}>
                  {item.a}
                </p>
              </ParchmentCard>
            ))}
          </div>
        </section>

        {/* Bottom tagline */}
        <div className="text-center py-8">
          <p className="font-display text-xl italic"
            style={{ color: 'var(--color-sepia-mid)' }}>
            ❧ Every small act weaves the world forward. ❧
          </p>
        </div>
      </motion.div>
    </PageWrapper>
  );
}
