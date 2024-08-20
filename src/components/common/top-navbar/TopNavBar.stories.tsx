import {Meta, StoryObj} from '@storybook/react';

import Bell from '../../../assets/icon/bell.svg';

import {TopNavBar} from '.';

const meta = {
  title: 'Components/TopNavBar',
  component: TopNavBar,
  tags: ['autodocs'],
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
} satisfies Meta<typeof TopNavBar>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '타이틀',
    back: false,
    actions: [],
  },
};

export const Back: Story = {
  args: {
    title: '타이틀',
    back: true,
  },
};

export const Logo: Story = {
  args: {
    title: '타이틀',
    logo: true,
  },
};

export const Actions: Story = {
  args: {
    title: '타이틀',
    actions: [
      {
        icon: <Bell />,
        onClick: () => console.log('벨 클릭!'),
      },
    ],
  },
};

export const TextAction: Story = {
  args: {
    title: '타이틀',
    actions: [
      {
        text: '텍스트',
        onClick: () => console.log('검색 클릭!'),
      },
    ],
  },
};