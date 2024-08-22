import {useState, useEffect} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Button} from '../button';

import Dialog from '.';

const meta: Meta<typeof Dialog> = {
  title: 'components/Dialog',
  component: Dialog,
  argTypes: {
    isOpen: {control: 'boolean'},
  },
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'A Dialog component that appears in the center of the screen.',
      },
    },
  },
};

export default meta;
type Story = StoryFn<typeof Dialog>;

const Template: Story = args => {
  const [isOpen, setIsOpen] = useState(args.isOpen);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  return (
    <Dialog
      title={args.title}
      buttons={args.buttons}
      isOpen={isOpen}
      onClose={handleClose}
      description={args.description}
    />
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  title: 'Dialog Title',
  description: 'Dialog Content',
  buttons: (
    <div
      style={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <Button size="full" color="green">
        Confrim
      </Button>
      <Button size="full" color="white">
        Cancle
      </Button>
    </div>
  ),
  isOpen: false,
  onClose: () => {
    console.log('Dialog closed');
  },
};

export const withOneButton: Story = Template.bind({});
withOneButton.args = {
  title: 'Dialog Title',
  description: 'Dialog Content',
  buttons: (
    <div
      style={{
        display: 'flex',
        gap: '10px',
      }}
    >
      <Button size="full" color="green">
        Confrim
      </Button>
    </div>
  ),
  isOpen: false,
  onClose: () => {
    console.log('Dialog closed');
  },
};