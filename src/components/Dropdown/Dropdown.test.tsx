import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Dropdown } from './Dropdown';

describe('Dropdown', () => {
  const items = [
    { id: '1', label: 'Item 1', onSelect: vi.fn() },
    { id: '2', label: 'Item 2', onSelect: vi.fn() },
    { id: '3', label: 'Item 3', disabled: true },
  ];

  it('renders dropdown trigger', () => {
    render(<Dropdown trigger="Open Menu" items={items} />);
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('shows items when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger="Open Menu" items={items} />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('calls onSelect when item is clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger="Open Menu" items={items} />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    await user.click(screen.getByText('Item 1'));
    expect(items[0].onSelect).toHaveBeenCalled();
  });

  it('disables disabled items', async () => {
    const user = userEvent.setup();
    render(<Dropdown trigger="Open Menu" items={items} />);

    await user.click(screen.getByRole('button', { name: /open menu/i }));
    const disabledItem = screen.getByText('Item 3');
    expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Dropdown trigger="Menu" items={items} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
