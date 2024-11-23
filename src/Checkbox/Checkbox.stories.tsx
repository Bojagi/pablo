import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Flex, Box } from '../Box';
import { Checkbox, CheckboxProps } from './Checkbox';

export default {
  title: 'Checkbox',
};

const ControlledCheckbox = ({
  checked: checkedInitial,
  ...props
}: Omit<CheckboxProps, 'onChange'>) => {
  const [checked, setChecked] = useState(checkedInitial);
  return <Checkbox checked={checked} onChange={() => setChecked(!checked)} {...props} />;
};

const baseStory = (args) => (
  <Flex mx={-4} mb={4}>
    <ControlledCheckbox mx={4} checked={true} {...args} />
    <ControlledCheckbox mx={4} checked={false} {...args} />
    <ControlledCheckbox mx={4} checked={true} disabled={true} {...args} />
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

export const WithLabels = () => (
  <>
    <Box mb={4}>
      <ControlledCheckbox mb={4} checked={true} label="Hans" />
      <ControlledCheckbox mb={4} checked={false} label="Wurst" />
    </Box>
    <Box mb={4}>
      <ControlledCheckbox mb={4} checked={true} size="small" label="Hans" />
      <ControlledCheckbox mb={4} checked={false} size="small" label="Wurst" />
    </Box>
  </>
);

const customStyles = {
  box: css`
    background-color: blue;
  `,
  handle: css`
    background-color: red;
  `,
  label: css`
    text-decoration: underline;
  `,
};

export const WithCustomStyles = () => (
  <>
    <Box mb={4}>
      <ControlledCheckbox mb={4} checked={true} label="Hans" customStyles={customStyles} />
      <ControlledCheckbox mb={4} checked={false} label="Wurst" customStyles={customStyles} />
    </Box>
    <Box mb={4}>
      <ControlledCheckbox
        mb={4}
        checked={true}
        size="small"
        label="Hans"
        customStyles={customStyles}
      />
      <ControlledCheckbox
        mb={4}
        checked={false}
        size="small"
        label="Wurst"
        customStyles={customStyles}
      />
    </Box>
  </>
);
