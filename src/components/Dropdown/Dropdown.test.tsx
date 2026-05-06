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

  it('renders dropdown with placeholder', () => {
    render(<Dropdown placeholder="Select..." items={items} />);
    expect(screen.getByRole('button', { name: /select/i })).toBeInTheDocument();
  });

  it('shows items when trigger is clicked', async () => {
    const user = userEvent.setup();
    render(<Dropdown placeholder="Select..." items={items} />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
  });

  it('updates value when item is selected', async () => {
    const user = userEvent.setup();
    const handleValueChange = vi.fn();
    render(<Dropdown items={items} onValueChange={handleValueChange} />);

    await user.click(screen.getByRole('button'));
    await user.click(screen.getByText('Item 1'));
    expect(handleValueChange).toHaveBeenCalledWith('1');
  });

  it('displays selected value in trigger', () => {
    const { rerender } = render(
      <Dropdown items={items} value="1" placeholder="Select..." />
    );
    expect(screen.getByRole('button', { name: /item 1/i })).toBeInTheDocument();

    rerender(<Dropdown items={items} value="2" placeholder="Select..." />);
    expect(screen.getByRole('button', { name: /item 2/i })).toBeInTheDocument();
  });

  it('shows checkmark on selected item', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} value="1" />);

    await user.click(screen.getByRole('button'));
    const allItems = screen.getAllByText('Item 1');
    const menuItem = allItems[1]; // Second match is in the menu
    expect(menuItem.textContent).toContain('✓');
  });

  it('disables disabled items', async () => {
    const user = userEvent.setup();
    render(<Dropdown items={items} />);

    await user.click(screen.getByRole('button'));
    const disabledItem = screen.getByText('Item 3');
    expect(disabledItem.closest('[role="menuitem"]')).toHaveAttribute('data-disabled');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Dropdown items={items} />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
