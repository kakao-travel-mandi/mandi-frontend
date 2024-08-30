import { useEffect } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import HomeIcon from '@/assets/tabBar/icon-bookmark.svg';
import { SnackbarItemProps, useSnackbar } from '@/hooks/useSnackbar';

import Button from '../button';

import { SnackbarRoot } from './snackbar-root';

const SnackbarStory = ({
  content,
  type,
  full,
  position,
}: SnackbarItemProps) => {
  const { createSnackbar } = useSnackbar();

  const handleClick = () => {
    createSnackbar({
      content: content || 'This is a snackbar message',
      type: type || 'alert',
      full: full || false,
      position: position || 'center',
    });
  };

  return (
    <>
      <Button color='green' size='large' onClick={handleClick}>
        Open Snackbar
      </Button>
      <SnackbarRoot />
    </>
  );
};

const meta = {
  title: 'Components/Snackbar',
  component: SnackbarStory,
  tags: ['autodocs'],
  argTypes: {
    content: { control: 'text' },
    type: { control: 'radio', options: ['alert', 'check', undefined] as const },
    full: { control: 'boolean' },
    position: { control: 'radio', options: ['center', 'bottom'] as const },
    icon: { control: 'object' },
  },
} satisfies Meta<typeof SnackbarStory>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    content: 'This is a snackbar message',
    full: false,
    position: 'center',
  },
};

export const Alert: Story = {
  args: {
    content: 'alert snackbar',
    type: 'alert',
    full: false,
    position: 'center',
  },
};

export const Check: Story = {
  args: {
    content: 'check snackbar',
    type: 'check',
    full: false,
    position: 'center',
  },
};

export const CustomIcon: Story = {
  args: {
    content: 'custom icon snackbar',
    full: false,
    position: 'center',
    icon: {
      svg: HomeIcon,
      fill: '#008E6D',
    },
  },
};
