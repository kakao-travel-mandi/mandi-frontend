import {useEffect, useState} from 'react';

import {Meta, StoryFn} from '@storybook/react';

import Textarea from './index';

const meta: Meta<typeof Textarea> = {
  title: 'components/Textarea',
  component: Textarea,
  argTypes: {
    value: {control: 'text'},
    placeholder: {control: 'text'},
    disabled: {control: 'boolean'},
  },
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'An Textarea component for user text Textarea.',
      },
    },
  },
};

export default meta;

type Story = StoryFn<typeof Textarea>;

const Template: Story = args => {
  const [value, setValue] = useState(args.value);

  useEffect(() => {
    setValue(args.value);
  }, [args.value]);

  const handleChange = (newValue: string) => {
    setValue(newValue);
    args.onChange && args.onChange(newValue);
  };

  return <Textarea {...args} value={value} onChange={handleChange} />;
};

export const Default: Story = Template.bind({});
Default.args = {
  value: '',
  placeholder: 'Enter text',
  disabled: false,
  style: {
    width: '100%',
    minWidth: '300px',
    height: '300px',
  },
  onChange: (value: string) => {
    console.log('Textarea changed:', value);
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
    console.log('Textarea changed:', value);
  },
};

export const WithLabel: Story = Template.bind({});
WithLabel.args = {
  value: 'Initial value',
  label: 'Label Text',
  disabled: false,
  onChange: (value: string) => {
    console.log('Textarea changed:', value);
  },
};

export const WithHelper: Story = Template.bind({});
WithHelper.args = {
  value: 'Initial value',
  label: 'Label Text',
  helper: 'Helper Text',
  disabled: false,
  onChange: (value: string) => {
    console.log('Textarea changed:', value);
  },
};