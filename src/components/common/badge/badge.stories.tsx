import {Meta, StoryObj} from '@storybook/react';

import Badge, {BadgeProps} from './index';

export default {
  title: 'components/Badge',
  component: Badge,
  argTypes: {
    color: {
      control: {
        type: 'select',
        options: ['gray', 'green', 'red', 'greenDeep'],
      },
    },
    rounded: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },
    font: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<BadgeProps>;

type Story = StoryObj<BadgeProps>;

export const Default: Story = {
  args: {
    text: '테스트',
    color: 'gray',
    rounded: 'small',
    font: 'label4-regular',
  },
};