import {Meta, StoryObj} from '@storybook/react';

import Tabs from './index'; // Tabs 컴포넌트의 경로를 확인하고 조정하세요.

export default {
  title: 'components/Tabs',
  component: Tabs,
  argTypes: {
    font: {
      control: {
        type: 'text',
      },
    },
    version: {
      control: {
        type: 'select',
        options: [1, 2, 3, 4],
      },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
} as Meta<typeof Tabs>;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    tabs: [
      {title: 'Tab 1', content: <div>Content for Tab 1</div>},
      {title: 'Tab 2', content: <div>Content for Tab 2</div>},
      {title: 'Tab 3', content: <div>Content for Tab 3</div>},
    ],
    className: 'default-tabs',
    font: 'subtitle2-semibold',
    version: 1,
  },
};
