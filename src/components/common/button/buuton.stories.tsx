import { Meta, StoryObj } from '@storybook/react';

import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small', 'xSmall', 'full'],
    },
    color: {
      control: 'select',
      options: ['gray__one', 'gray__two', 'green', 'white', 'red'],
    },
    type: {
      control: 'select',
      options: ['submit', 'button', 'reset'],
    },
    disabled: {
      control: 'boolean',
    },
    onClick: {
      action: 'clicked',
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Default Button',
    size: 'large',
    color: 'green',
    font: 'subtitle1-semibold',
    type: 'button',
    disabled: false,
  },
};

export const DisabledButton: Story = {
  args: {
    children: 'Disabled Button',
    size: 'large',
    color: 'gray__one',
    font: 'subtitle1-semibold',
    type: 'button',
    disabled: true,
  },
};
