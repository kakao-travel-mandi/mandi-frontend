import { Meta, StoryObj } from '@storybook/react';

import Trashcan from '@/assets/icon/icon-bin-mono 1.svg';
import AirPlane from '@/assets/icon/icon-paper-airplane.svg';
import Pencil from '@/assets/icon/icon-pencil-mono.svg';

import Button from '../button';

import { Menubox } from '.';

const meta = {
  title: 'Components/MenuBox',
  component: Menubox,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    translateX: { control: 'number' },
    align: {
      control: 'radio',
      options: ['end', 'center', 'start'],
    },
  },
} satisfies Meta<typeof Menubox>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    triggerButton: (
      <Button size='xSmall' color='green'>
        Open
      </Button>
    ),
    items: [
      { content: 'Item 1', onClick: () => console.log('Item 1 clicked') },
      { content: 'Item 2', onClick: () => console.log('Item 2 clicked') },
      { content: 'Item 3', onClick: () => console.log('Item 3 clicked') },
    ],
    align: 'end',
  },
};

export const WithIconList: Story = {
  args: {
    triggerButton: (
      <Button size='xSmall' color='green'>
        Open
      </Button>
    ),
    items: [
      {
        content: 'Item 1',
        icon: AirPlane,
        onClick: () => console.log('Item 1 clicked'),
      },
      {
        content: 'Item 2',
        icon: Pencil,
        onClick: () => console.log('Item 2 clicked'),
      },
      {
        content: 'Item 3',
        icon: Trashcan,
        onClick: () => console.log('Item 3 clicked'),
      },
    ],
    align: 'end',
  },
};

export const WithTranslateX: Story = {
  args: {
    triggerButton: (
      <Button size='xSmall' color='green'>
        Open
      </Button>
    ),
    items: [
      { content: 'Item 1', onClick: () => console.log('Item 1 clicked') },
      { content: 'Item 2', onClick: () => console.log('Item 2 clicked') },
      { content: 'Item 3', onClick: () => console.log('Item 3 clicked') },
    ],
    translateX: 15,
    align: 'end',
  },
};
