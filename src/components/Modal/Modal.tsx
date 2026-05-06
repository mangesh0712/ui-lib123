import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import styles from './Modal.module.css';

export interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  ({ open, onOpenChange, title, description, children }, ref) => {
    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content ref={ref} className={styles.content}>
            <div className={styles.header}>
              {title && <Dialog.Title className={styles.title}>{title}</Dialog.Title>}
              {description && (
                <Dialog.Description className={styles.description}>{description}</Dialog.Description>
              )}
              <Dialog.Close className={styles.close} aria-label="Close">
                <span aria-hidden="true">×</span>
              </Dialog.Close>
            </div>
            <div className={styles.body}>{children}</div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

Modal.displayName = 'Modal';

export { Modal };
