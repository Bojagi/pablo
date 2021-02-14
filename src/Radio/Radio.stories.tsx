import React from 'react';
import { Box } from '../Box';
import { Radio, RadioProps } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Radio',
};

const ControlledRadio = ({ checked: checkedInitial, ...props }: RadioProps) => {
  const [checked, setChecked] = React.useState(checkedInitial);
  return (
    <Radio checked={checked} onChange={() => {}} onClick={() => setChecked(!checked)} {...props} />
  );
};

const baseStory = (args) => (
  <Box flex mx={-1} mb={1}>
    <ControlledRadio mx={1} value="1" name="hans" checked={true} {...args} />
    <ControlledRadio mx={1} value="2" name="hans" checked={false} {...args} />
    <ControlledRadio mx={1} value="3" name="hans" checked={true} disabled={true} {...args} />
  </Box>
);

export const Medium = baseStory.bind(null);
Medium.args = {
  size: 'medium',
};

export const Small = baseStory.bind(null);
Small.args = {
  size: 'small',
};

const BaseRadioGroupStory = (args) => {
  const [value, setValue] = React.useState<string>();
  return (
    <RadioGroup value={value} onChange={setValue} {...args}>
      <Radio value="hans" label="hans" />
      <Radio value="wurst" label="wurst" />
    </RadioGroup>
  );
};

export const RadioGroupMedium = BaseRadioGroupStory.bind(null);
RadioGroupMedium.args = {
  size: 'medium',
};

export const RadioGroupSmall = BaseRadioGroupStory.bind(null);
RadioGroupSmall.args = {
  size: 'small',
};
