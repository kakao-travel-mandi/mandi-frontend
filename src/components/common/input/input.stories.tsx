import {useState, useEffect} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import IconSearch from '@/assets/icon/icon-search-mono.svg';
import IconXCircle from '@/assets/icon/icon-xcircle.svg';

import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'components/Input',
  component: Input,
  argTypes: {
    value: {control: 'text'},
    placeholder: {control: 'text'},
    disabled: {control: 'boolean'},
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An Input component for user text input.',
      },
    },
  },
};

export default meta;

type Story = StoryFn<typeof Input>;

const Template: Story = args => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    args.onChange && args.onChange(newValue);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter text',
  disabled: false,
  style: {
    width: '300px',
  },
  onChange: (value: string) => {
    console.log('Input changed:', value);
  },
};

export const Error: Story = Template.bind({});
Error.args = {
  value: '',
  placeholder: 'Enter text',
  label: 'Label Text',
  disabled: false,
  error: 'This field is required',
  onChange: (value: string) => {
    console.log('Input changed:', value);
  },
};

export const WithLabel: Story = Template.bind({});
WithLabel.args = {
  value: 'Initial value',
  label: 'Label Text',
  disabled: false,
  onChange: (value: string) => {
    console.log('Input changed:', value);
  },
};

export const WithHelper: Story = Template.bind({});
WithHelper.args = {
  value: 'Initial value',
  label: 'Label Text',
  helper: 'Helper Text',
  disabled: false,
  onChange: (value: string) => {
    console.log('Input changed:', value);
  },
};

export const WithIcon: Story = Template.bind({});
WithIcon.args = {
  value: '',
  placeholder: 'Enter text',
  label: 'Label Text',
  helper: 'Helper Text',
  disabled: false,
  leftIcon: <IconSearch width={20} height={20} />,
  rightIcon: <IconXCircle width={20} height={20} />,
  onChange: (value: string) => {
    console.log('Input changed:', value);
  },
};