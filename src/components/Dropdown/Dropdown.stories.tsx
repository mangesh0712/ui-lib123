import type { Meta, StoryObj } from '@storybook/react';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

const items = [
  { id: '1', label: 'Edit', onSelect: () => console.log('Edit clicked') },
  { id: '2', label: 'Duplicate', onSelect: () => console.log('Duplicate clicked') },
  { id: '3', label: 'Archive', onSelect: () => console.log('Archive clicked') },
  { id: '4', label: 'Delete', onSelect: () => console.log('Delete clicked'), disabled: true },
];

export const Default: Story = {
  args: {
    trigger: 'Actions',
    items,
  },
};

export const WithIcon: Story = {
  args: {
    trigger: '⋮',
    items: [
      { id: '1', label: 'Profile', onSelect: () => {} },
      { id: '2', label: 'Settings', onSelect: () => {} },
      { id: '3', label: 'Logout', onSelect: () => {} },
    ],
  },
};
