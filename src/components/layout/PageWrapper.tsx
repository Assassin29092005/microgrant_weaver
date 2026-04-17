import { ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function PageWrapper({ children, className = '' }: PageWrapperProps) {
  return (
    <div className={`relative min-h-screen z-10 ${className}`}>
      {/* Page vignette overlay */}
      <div className="page-vignette" aria-hidden="true" />

      {/* Main content */}
      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
