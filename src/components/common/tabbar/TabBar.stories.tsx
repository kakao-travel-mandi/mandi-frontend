import {Button} from '@headlessui/react';
import {Meta, StoryObj} from '@storybook/react';

import {TabBar} from '.';

// import {TabBar} from '@/components/common/tabbar';

const meta = {
  title: 'Components/TabBar',
  component: TabBar,
} satisfies Meta<typeof TabBar>;

// const Template: StoryFn = args => <TabBar {...args} />;

// export const Default = Template.bind({});
// Default.args = {};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultIndex: 0,
  },
};

// export const WithPreselectedTab = Template.bind({});
// WithPreselectedTab.args = {
//   defaultIndex: 2, // 스크린 탭 기본 선택
// };

// export const WithTabChangeLogging = Template.bind({});
// WithTabChangeLogging.parameters = {
//   actions: {
//     handles: ['onChange'],
//   },
// };