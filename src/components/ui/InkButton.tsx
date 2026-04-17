import { ReactNode, ButtonHTMLAttributes } from 'react';
import clsx from 'clsx';

interface InkButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export default function InkButton({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: InkButtonProps) {
  return (
    <button
      className={clsx(
        'ink-button',
        variant !== 'primary' && variant,
        {
          'text-xs px-3 py-1.5': size === 'sm',
          'text-base px-5 py-2.5': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
