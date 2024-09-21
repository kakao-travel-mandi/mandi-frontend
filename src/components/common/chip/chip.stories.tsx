import { Meta, StoryObj } from '@storybook/react';

import Chip from './index'; // Ensure the correct path to Chip component

export default {
  title: 'components/Chip',
  component: Chip,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['submit', 'button', 'reset'],
      },
    },
    className: {
      control: 'text',
    },
    action: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    isActive: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
} as Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

// Default Chip
export const DefaultChip: Story = {
  args: {
    id: 'default-chip',
    children: 'Default Chip',
    type: 'button',
    disabled: false,
    action: false,
    isActive: false,
  },
};

// Action Chip
export const ActionChip: Story = {
  args: {
    id: 'action-chip',
    children: 'Action Chip',
    type: 'button',
    disabled: false,
    action: true,
    isActive: false,
  },
};

// Disabled Action Chip
export const DisabledActionChip: Story = {
  args: {
    id: 'disabled-action-chip',
    children: 'Disabled Action Chip',
    type: 'button',
    disabled: true,
    action: true,
    isActive: false,
  },
};

// Active Chip
export const ActiveChip: Story = {
  args: {
    id: 'active-chip',
    children: 'Active Chip',
    type: 'button',
    disabled: false,
    action: false,
    isActive: true,
  },
};
