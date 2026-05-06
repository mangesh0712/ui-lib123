import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    padding: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Simple: Story = {
  args: {
    children: 'This is a simple card with just content.',
  },
};

export const WithHeader: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has a header and content.',
  },
};

export const WithFooter: Story = {
  args: {
    header: 'Card Title',
    children: 'This card has a header, content, and footer.',
    footer: 'Footer information',
  },
};

export const CustomContent: Story = {
  args: {
    header: 'User Profile',
    children: <div>Name: John Doe</div>,
    footer: 'Last updated: 2 hours ago',
  },
};
