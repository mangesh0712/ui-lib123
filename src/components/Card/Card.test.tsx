import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { Card } from './Card';

describe('Card', () => {
  it('renders card with content', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('renders header when provided', () => {
    render(<Card header="Card Header">Content</Card>);
    expect(screen.getByText('Card Header')).toBeInTheDocument();
  });

  it('renders footer when provided', () => {
    render(<Card footer="Card Footer">Content</Card>);
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });

  it('renders all sections together', () => {
    render(
      <Card header="Header" footer="Footer">
        Content
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Card header="Header">Content</Card>);
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
