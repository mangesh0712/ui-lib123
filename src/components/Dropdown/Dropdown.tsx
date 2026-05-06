import React from 'react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import clsx from 'clsx';
import styles from './Dropdown.module.css';

export interface DropdownItem {
  id: string;
  label: string;
  onSelect?: () => void;
  disabled?: boolean;
}

export interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  ({ trigger, items, open, onOpenChange }, ref) => {
    return (
      <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger ref={ref} className={styles.trigger} asChild>
          <button className={styles.triggerButton}>{trigger}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.content} align="start" sideOffset={5}>
            {items.map((item) => (
              <DropdownMenu.Item
                key={item.id}
                className={clsx(styles.item, item.disabled && styles.disabled)}
                onSelect={item.onSelect}
                disabled={item.disabled}
              >
                {item.label}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export { Dropdown };
