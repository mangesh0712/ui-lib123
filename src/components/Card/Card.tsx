import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ header, footer, padding = 'md', className, children, ...props }, ref) => {
    return (
      <div ref={ref} className={clsx(styles.card, className)} {...props}>
        {header && <div className={clsx(styles.header, styles[`padding-${padding}`])}>{header}</div>}
        <div className={clsx(styles.content, styles[`padding-${padding}`])}>{children}</div>
        {footer && <div className={clsx(styles.footer, styles[`padding-${padding}`])}>{footer}</div>}
      </div>
    );
  }
);

Card.displayName = 'Card';

export { Card };
