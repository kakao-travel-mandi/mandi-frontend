import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import TabBar from '.';

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof TabBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultIndex: 0,
  },
};
