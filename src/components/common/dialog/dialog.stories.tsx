import {useState, useEffect} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Button} from '../button';

import Dialog from '.';

const meta: Meta<typeof Dialog> = {
  title: 'Common/Dialog',
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

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

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
        Dialog Button
      </Button>
    </div>
  ),
  isOpen: true,
  onClose: () => {
    console.log('Dialog closed');
  },
};