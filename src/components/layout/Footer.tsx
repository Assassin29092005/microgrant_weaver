import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t-2 border-transparent mt-16">
      {/* Ornamental top border */}
      <div className="ornament-divider text-xs py-2" aria-hidden="true">
        ⁕ ❧ ⁕
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-display text-lg font-bold mb-2"
              style={{ color: 'var(--color-ink)' }}>
              🧵 Micro-Grant Weaver
            </h3>
            <p className="text-sm font-body italic"
              style={{ color: 'var(--color-ink-faded)' }}>
              Every penny weaves a thread.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider mb-3"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Explore
            </h4>
            <ul className="list-none p-0 m-0 flex flex-col gap-1.5">
              {[
                { to: '/discover', label: 'Discover Projects' },
                { to: '/submit', label: 'Start a Project' },
                { to: '/how-it-works', label: 'How It Works' },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm no-underline transition-colors duration-200 hover:text-[var(--color-rust-accent)]"
                    style={{ color: 'var(--color-ink-faded)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tagline */}
          <div className="flex flex-col justify-end">
            <p className="font-mono text-xs text-right"
              style={{ color: 'var(--color-sepia-mid)' }}>
              Built with care for communities everywhere.
            </p>
            <p className="font-mono text-xs text-right mt-1"
              style={{ color: 'var(--color-parchment-dark)' }}>
              © 2026 Micro-Grant Weaver
            </p>
          </div>
        </div>
      </div>

      {/* Bottom ornament */}
      <div className="text-center py-3 text-sm" style={{ color: 'var(--color-sepia-mid)' }} aria-hidden="true">
        ❧ Every small act weaves the world forward. ❧
      </div>
    </footer>
  );
}
