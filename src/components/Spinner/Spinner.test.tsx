import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('renders spinner with loading aria label', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByLabelText('Loading')).toBeInTheDocument();
  });

  it('applies size classes', () => {
    const { rerender } = render(<Spinner size="sm" />);
    let spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('class');

    rerender(<Spinner size="lg" />);
    spinner = screen.getByRole('status');
    expect(spinner).toHaveAttribute('class');
  });

  it('applies custom color', () => {
    const { container } = render(<Spinner color="#ff0000" />);
    const spinner = container.querySelector('[role="status"]') as HTMLElement;
    expect(spinner).toHaveStyle('border-top-color: #ff0000');
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Spinner />);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
