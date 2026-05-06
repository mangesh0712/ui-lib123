import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helperText?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, size = 'md', className, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={styles.wrapper}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={clsx(styles.input, styles[size], error && styles.error, className)}
          aria-invalid={!!error}
          aria-describedby={error || helperText ? `${inputId}-hint` : undefined}
          {...props}
        />
        {(error || helperText) && (
          <span id={`${inputId}-hint`} className={clsx(styles.hint, error && styles.errorHint)}>
            {error || helperText}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
