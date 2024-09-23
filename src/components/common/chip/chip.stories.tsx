import {Meta, StoryObj} from '@storybook/react';

import Chip from './index'; // Chip 컴포넌트의 경로를 확인하고 조정하세요.

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
    action: {
      control: {
        type: 'boolean',
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
} as Meta<typeof Chip>;

type Story = StoryObj<typeof Chip>;

// 기본 액션이 아닌 칩
export const DefaultChip: Story = {
  args: {
    children: 'Default Chip',
    type: 'button',
    font: 'label3-medium', // 기본 폰트 스타일
    disabled: false,
    action: false,
  },
};

// 액션 칩
export const ActionChip: Story = {
  args: {
    children: 'Action Chip',
    type: 'button',
    font: 'label4-semibold', // 액션일 때 폰트 스타일
    disabled: false,
    action: true,
  },
};

// 비활성화된 액션 칩
export const DisabledActionChip: Story = {
  args: {
    children: 'Disabled Action Chip',
    type: 'button',
    font: 'label4-semibold', // 액션일 때 폰트 스타일
    disabled: true,
    action: true,
  },
};
