import {useEffect} from 'react';

import {Meta, StoryObj} from '@storybook/react';

import {useSnackbar} from '@/hooks/useSnackbar';
import {useSnackbarProps} from '@/types/snackbar';

import {Button} from '../button';

const SnackbarStory = (args: useSnackbarProps) => {
  const {snackbar, open} = useSnackbar(args);
  return (
    <div>
      <Button color="green" size="large" onClick={open}>
        Open Snackbar
      </Button>
      {snackbar}
    </div>
  );
};

const meta = {
  title: 'Components/Snackbar',
  component: SnackbarStory,
  tags: ['autodocs'],
  argTypes: {
    content: {control: 'text'},
    type: {control: 'radio', options: ['alert', 'check', undefined] as const},
    full: {control: 'boolean'},
    position: {control: 'radio', options: ['center', 'bottom'] as const},
  },
  decorators: [
    Story => {
      useEffect(() => {
        const snackbarRoot = document.createElement('div');
        snackbarRoot.id = 'snackbarRoot';
        document.body.appendChild(snackbarRoot);
        return () => {
          document.body.removeChild(snackbarRoot);
        };
      }, []);
      return <Story />;
    },
  ],
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