import {useState, useEffect} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import Input from './index';

const meta: Meta<typeof Input> = {
  title: 'Common/Input',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    args.onChange && args.onChange(e);
  };

  return <Input {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter text',
  disabled: false,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Input changed:', e.target.value);
  },
};