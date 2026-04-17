import { ReactNode } from 'react';
import clsx from 'clsx';

interface ParchmentCardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  noFold?: boolean;
  noOrnaments?: boolean;
  as?: 'div' | 'article';
}

export default function ParchmentCard({
  children,
  className = '',
  onClick,
  as: Tag = 'div',
}: ParchmentCardProps) {
  return (
    <Tag
      className={clsx(
        'parchment-card hover:-translate-y-1 transition-transform',
        { 'cursor-pointer': !!onClick },
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); } : undefined}
    >
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </Tag>
  );
}

