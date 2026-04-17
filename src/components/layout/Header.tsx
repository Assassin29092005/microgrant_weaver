import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/discover', label: 'Discover' },
  { to: '/submit', label: 'Start a Project' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/profile', label: 'Profile' },
];

export default function Header() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="relative z-50 border-b-2 border-[var(--color-parchment-edge)]"
      style={{
        backgroundColor: 'var(--color-parchment-dark)',
        backgroundImage: 'url(/textures/paper-grain.png)',
        backgroundSize: '512px 512px',
        boxShadow: '0 2px 12px rgba(26, 14, 7, 0.2)',
      }}>
      {/* Decorative top border */}
      <div className="h-1.5 w-full"
        style={{
          background: 'linear-gradient(90deg, var(--color-parchment-edge) 0%, var(--color-sepia-mid) 15%, var(--color-gold-leaf) 50%, var(--color-sepia-mid) 85%, var(--color-parchment-edge) 100%)'
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          {/* Logo / Masthead */}
          <Link to="/" className="flex items-center gap-3 no-underline group">
            <span className="text-2xl" aria-hidden="true">🧵</span>
            <div>
              <h1 className="text-xl sm:text-2xl font-display font-bold m-0 leading-none"
                style={{ color: 'var(--color-ink)' }}>
                Micro-Grant Weaver
              </h1>
              <p className="text-xs font-mono m-0 mt-0.5 tracking-widest uppercase"
                style={{ color: 'var(--color-ink-faded)' }}>
                Weave your community forward
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`px-3 py-2 rounded text-sm font-body no-underline transition-all duration-200 ${
                    isActive
                      ? 'font-semibold'
                      : 'hover:bg-[rgba(122,89,48,0.12)]'
                  }`}
                  style={{
                    color: isActive ? 'var(--color-rust-accent)' : 'var(--color-ink)',
                    backgroundColor: isActive ? 'rgba(168, 58, 18, 0.12)' : undefined,
                  }}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden ink-button ghost p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span className="text-xl">{mobileOpen ? '✕' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* Ornamental divider */}
      <div className="ornament-divider text-xs py-1" aria-hidden="true">
        ❧ ✦ ❧
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[var(--color-parchment-dark)]"
            style={{ backgroundColor: 'var(--color-parchment-light)' }}
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className={`px-3 py-2 rounded text-sm font-body no-underline transition-all duration-200 ${
                      isActive ? 'font-semibold' : ''
                    }`}
                    style={{
                      color: isActive ? 'var(--color-rust-accent)' : 'var(--color-ink-faded)',
                      backgroundColor: isActive ? 'rgba(181, 69, 27, 0.08)' : undefined,
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
