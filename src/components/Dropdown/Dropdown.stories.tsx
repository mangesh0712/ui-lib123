import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
  render: () => {
    const [selected, setSelected] = useState<string>('');
    return (
      <Dropdown
        placeholder="Select an action"
        items={items}
        value={selected}
        onValueChange={setSelected}
      />
    );
  },
};

export const WithValue: Story = {
  render: () => {
    const [selected, setSelected] = useState('1');
    return (
      <Dropdown
        placeholder="Choose action"
        items={items}
        value={selected}
        onValueChange={setSelected}
      />
    );
  },
};

export const SelectInput: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    const countries = [
      { id: 'us', label: 'United States' },
      { id: 'uk', label: 'United Kingdom' },
      { id: 'ca', label: 'Canada' },
      { id: 'au', label: 'Australia' },
    ];
    return (
      <div>
        <label>Select a country:</label>
        <Dropdown
          placeholder="Choose country..."
          items={countries}
          value={selected}
          onValueChange={setSelected}
        />
        {selected && <p style={{ marginTop: '1rem' }}>Selected: {countries.find(c => c.id === selected)?.label}</p>}
      </div>
    );
  },
};
