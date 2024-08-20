import {Meta, StoryObj} from '@storybook/react';

import IconHappyFace from '@/assets/icon/icon-happy-face.svg';
import IconHoleCup from '@/assets/icon/icon-holeCup.svg';
import IconLockClosed from '@/assets/icon/icon-lock-closed.svg';
import IconMountain from '@/assets/icon/icon-mountain.svg';
import IconNote from '@/assets/icon/icon-note.svg';
import IconWorking from '@/assets/icon/icon-working.svg';
import IconWrite from '@/assets/icon/icon-write.svg';

import BadgePageIcon from './index';

const meta: Meta<typeof BadgePageIcon> = {
  title: 'Components/BadgePageIcon',
  component: BadgePageIcon,
  argTypes: {
    text: {
      control: 'text',
      description: 'The text to display below the icon.',
    },
    Icon: {
      control: 'object',
      description: 'The SVG icon component to display.',
    },
    disable: {
      control: 'boolean',
      description:
        'If true, the icon is replaced with a lock icon and the component is disabled.',
    },
    onClick: {
      action: 'clicked',
      description: 'Callback function when the component is clicked.',
    },
  },
  args: {
    text: 'Default Text',
    Icon: IconHappyFace,
    disable: false,
  },
};

export default meta;

type Story = StoryObj<typeof BadgePageIcon>;

export const start: Story = {
  args: {
    text: '만디 스타터',
    Icon: IconMountain,
    disable: false,
  },
};

export const collector: Story = {
  args: {
    text: '코스 수집가',
    Icon: IconNote,
    disable: false,
  },
};

export const share: Story = {
  args: {
    text: '공유의 기쁨',
    Icon: IconWrite,
    disable: false,
  },
};
export const completed: Story = {
  args: {
    text: '완주의 시작',
    Icon: IconHoleCup,
    disable: false,
  },
};
export const working: Story = {
  args: {
    text: '걸어서 만보',
    Icon: IconWorking,
    disable: false,
  },
};
export const holic: Story = {
  args: {
    text: '만디홀릭',
    Icon: IconHappyFace,
    disable: false,
  },
};
export const Disabled: Story = {
  args: {
    text: '잠긴 상태',
    Icon: IconHappyFace,
    disable: true,
  },
  render: args => <BadgePageIcon {...args} Icon={IconLockClosed} />,
};