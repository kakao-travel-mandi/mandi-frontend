import {useEffect, useState} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import {Button} from '../button';

import BottomSheet from './index';

const meta: Meta<typeof BottomSheet> = {
  title: 'components/BottomSheet',
  component: BottomSheet,
  argTypes: {
    isOpen: {control: 'boolean'},
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'A BottomSheet component that slides up from the bottom of the screen.',
      },
    },
  },
};

export default meta;
type Story = StoryFn<typeof BottomSheet>;

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
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      {args.children}
    </BottomSheet>
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  isOpen: false,
  children: (
    <div
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>Bottom Sheet Content</div>
      <Button size="full" color="green">
        Confrim
      </Button>
    </div>
  ),
  onClose: () => {
    console.log('BottomSheet closed');
  },
};