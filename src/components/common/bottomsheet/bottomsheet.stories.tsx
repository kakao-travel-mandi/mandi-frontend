import {useEffect, useState} from 'react';

import {Meta, StoryFn} from '@storybook/react';
import {fn} from '@storybook/test';

import BottomSheet from './index';

const meta: Meta<typeof BottomSheet> = {
  title: 'Common/BottomSheet',
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

  useEffect(() => {
    setIsOpen(args.isOpen);
  }, [args.isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    args.onClose();
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={handleClose}>
      {args.children}
    </BottomSheet>
  );
};

export const Default: Story = Template.bind({});
Default.args = {
  isOpen: false,
  children: <div>Bottom Sheet Content</div>,
  onClose: () => {
    console.log('BottomSheet closed');
  },
};