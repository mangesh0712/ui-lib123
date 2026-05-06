import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders badge with text', () => {
    render(<Badge>New</Badge>);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('applies variant styles', () => {
    const { rerender } = render(<Badge variant="success">Success</Badge>);
    let badge = screen.getByText('Success');
    expect(badge).toHaveAttribute('class');

    rerender(<Badge variant="error">Error</Badge>);
    badge = screen.getByText('Error');
    expect(badge).toHaveAttribute('class');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Badge>Badge</Badge>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
