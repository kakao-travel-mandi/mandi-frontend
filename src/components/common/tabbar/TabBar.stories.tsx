import { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { AppRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import TabBar from '.';

const meta = {
  title: 'Components/Tabbar',
  component: TabBar,
  tags: ['autodocs'],
  args: { onChange: fn() },
} satisfies Meta<typeof TabBar>;
export default meta;
type Story = StoryObj<typeof meta>;

const mockRouter = {
  push: () => {},
  replace: () => {},
  pathname: '/',
  query: {},
  asPath: '/',
  route: '/',
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => Promise.resolve(), // prefetch는 Promise를 반환
};

export const Default: Story = {
  args: {
    defaultIndex: 0,
  },
  decorators: [
    Story => (
      <AppRouterContext.Provider value={mockRouter}>
        <Story />
      </AppRouterContext.Provider>
    ),
  ],
};
