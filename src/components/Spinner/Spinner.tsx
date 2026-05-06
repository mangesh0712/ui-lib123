import React from 'react';
import clsx from 'clsx';
import styles from './Spinner.module.css';

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(styles.spinner, styles[size], className)}
        style={{ borderColor: color ? `${color}33` : undefined, borderTopColor: color, ...style }}
        aria-label="Loading"
        role="status"
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner };
