import React from 'react';
import { css } from 'styled-components';
import { Flex } from '../Box';
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
  <Flex mx={-4} mb={4}>
    <ControlledRadio mx={4} value="1" name="hans" checked={true} {...args} />
    <ControlledRadio mx={4} value="2" name="hans" checked={false} {...args} />
    <ControlledRadio mx={4} value="3" name="hans" checked={true} disabled={true} {...args} />
  </Flex>
);

export const Medium = baseStory.bind(null);
Medium.args = {
  size: 'medium',
};

export const Small = baseStory.bind(null);
Small.args = {
  size: 'small',
};

const BaseRadioGroupStory = ({ customStyles, ...args }) => {
  const [value, setValue] = React.useState<string>();
  return (
    <RadioGroup value={value} onChange={setValue} {...args}>
      <Radio value="hans" label="hans" customStyles={customStyles} />
      <Radio value="wurst" label="wurst" customStyles={customStyles} />
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

export const RadioGroupCustomStyles = BaseRadioGroupStory.bind(null);
RadioGroupCustomStyles.args = {
  size: 'medium',
  customStyles: {
    box: css`
      background-color: blue;
    `,
    handle: css`
      background-color: red;
    `,
    label: css`
      text-decoration: underline;
    `,
  },
};
