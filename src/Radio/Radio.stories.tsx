import React from 'react';
import { Box } from '../Box';
import { Radio, RadioProps } from './Radio';
import { RadioGroup } from './RadioGroup';

export default {
  title: 'Radio',
};

const ControlledRadio = ({ checked: checkedInitial, ...props }: RadioProps) => {
  const [checked, setChecked] = React.useState(checkedInitial);
  return <Radio checked={checked} onClick={() => setChecked(!checked)} {...props} />;
};

const baseStory = (args) => (
  <Box display="flex" mx={-1} mb={1}>
    <ControlledRadio mx={1} checked={true} {...args} />
    <ControlledRadio mx={1} checked={false} {...args} />
    <ControlledRadio mx={1} checked={true} disabled={true} {...args} />
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
