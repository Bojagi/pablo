import React from 'react';
import { Box } from '../Box';
import { Input, InputProps } from './Input';

export default {
  title: 'Input',
};

const ControlledInput = ({ value: valueInitial, ...props }: Omit<InputProps, 'onChange'>) => {
  const [value, setValue] = React.useState(valueInitial);
  return <Input value={value} mb={1} {...props} onChange={setValue} />;
};

const baseStory = (args) => <ControlledInput {...args} />;

export const FullWidth = baseStory.bind(null);
FullWidth.args = { fullWidth: true };

export const FixedWidth = baseStory.bind(null);
FixedWidth.args = { width: 800 };

export const Inline = baseStory.bind(null);
Inline.args = {};

export const WithLabel = baseStory.bind(null);
WithLabel.args = {
  label: <>name</>,
};

export const WithInfoText = baseStory.bind(null);
WithInfoText.args = {
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const WithLabelAndInfoText = baseStory.bind(null);
WithLabelAndInfoText.args = {
  label: <>name</>,
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const Error = baseStory.bind(null);
Error.args = {
  error: 'Something terrible happened!',
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const MultipleInputs = () => (
  <Box>
    <Box mb={1.5}>
      <ControlledInput label="first name" />
    </Box>
    <Box mb={1.5}>
      <ControlledInput label="last name" />
    </Box>
    <Box mb={1.5}>
      <ControlledInput label="credit card no." infoText="optional" />
    </Box>
  </Box>
);
