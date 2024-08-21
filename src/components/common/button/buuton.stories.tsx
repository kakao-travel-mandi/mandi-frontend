import { Meta, StoryObj } from '@storybook/react';

import { Button } from './index'; // Button 컴포넌트의 경로를 확인하고 조정하세요.

export default {
  title: 'components/Button',
  component: Button,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['large', 'small', 'xSmall', 'full'],
      },
    },
    color: {
      control: {
        type: 'select',
        options: ['green', 'gray', 'white'],
      },
    },
    type: {
      control: {
        type: 'select',
        options: ['submit', 'button', 'reset'],
      },
    },
    font: {
      control: {
        type: 'text',
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    onClick: {
      action: 'clicked',
    },
  },
} as Meta<typeof Button>;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '테스트1',
    size: 'large',
    color: 'green',
    font: 'subtitle1-semibold',
    type: 'button',
    disabled: false,
  },
};
export const DisabledButton: Story = {
  args: {
    children: '테스트2',
    size: 'large',
    color: 'white',
    font: 'subtitle1-semibold',
    type: 'button',
    disabled: true,
  },
};