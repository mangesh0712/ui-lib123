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
  trigger?: React.ReactNode;
  placeholder?: string;
  items: DropdownItem[];
  value?: string;
  onValueChange?: (itemId: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dropdown = React.forwardRef<HTMLButtonElement, DropdownProps>(
  (
    { trigger, placeholder = 'Select...', items, value, onValueChange, open, onOpenChange },
    ref
  ) => {
    const selectedItem = items.find((item) => item.id === value);
    const displayValue = selectedItem?.label || trigger || placeholder;

    return (
      <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
        <DropdownMenu.Trigger ref={ref} className={styles.trigger} asChild>
          <button className={styles.triggerButton}>{displayValue}</button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content className={styles.content} align="start" sideOffset={5}>
            {items.map((item) => (
              <DropdownMenu.Item
                key={item.id}
                className={clsx(styles.item, item.disabled && styles.disabled, value === item.id && styles.selected)}
                onSelect={() => {
                  onValueChange?.(item.id);
                  item.onSelect?.();
                }}
                disabled={item.disabled}
              >
                {item.label}
                {value === item.id && <span className={styles.checkmark}>✓</span>}
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
