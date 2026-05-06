import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders modal when open is true', () => {
    render(
      <Modal open={true} onOpenChange={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.getByText('Test Modal')).toBeInTheDocument();
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('does not render modal when open is false', () => {
    render(
      <Modal open={false} onOpenChange={() => {}} title="Test Modal">
        Modal content
      </Modal>
    );
    expect(screen.queryByText('Modal content')).not.toBeInTheDocument();
  });

  it('calls onOpenChange when close button is clicked', async () => {
    const user = userEvent.setup();
    const handleOpenChange = vi.fn();
    render(
      <Modal open={true} onOpenChange={handleOpenChange} title="Test Modal">
        Content
      </Modal>
    );

    const closeButton = screen.getByLabelText('Close');
    await user.click(closeButton);
    expect(handleOpenChange).toHaveBeenCalledWith(false);
  });

  it('renders title and description', () => {
    render(
      <Modal
        open={true}
        onOpenChange={() => {}}
        title="Modal Title"
        description="Modal Description"
      >
        Content
      </Modal>
    );
    expect(screen.getByText('Modal Title')).toBeInTheDocument();
    expect(screen.getByText('Modal Description')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Modal open={true} onOpenChange={() => {}} title="Test Modal">
        Content
      </Modal>
    );
    const results = await axe(container);
    expect(results.violations).toHaveLength(0);
  });
});
