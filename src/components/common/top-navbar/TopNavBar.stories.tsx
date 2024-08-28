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
    title: 'Title',
    back: false,
    actions: [],
  },
};

export const Back: Story = {
  args: {
    title: 'Title',
    back: true,
  },
};

export const Logo: Story = {
  args: {
    title: 'Title',
    logo: true,
  },
};

export const Actions: Story = {
  args: {
    title: 'Title',
    actions: [
      {
        icon: Bell,
        onClick: () => console.log('Clicked bell!'),
      },
    ],
  },
};

export const TextAction: Story = {
  args: {
    title: 'Title',
    actions: [
      {
        text: 'search',
        onClick: () => console.log('Clicked search!'),
      },
    ],
  },
};
