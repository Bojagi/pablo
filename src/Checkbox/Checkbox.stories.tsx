import React from 'react';
import { Box } from '../Box';
import { Checkbox, SwitchProps } from './Checkbox';

export default {
  title: 'Checkbox',
};

const ControlledCheckbox = ({ checked: checkedInitial, ...props }: SwitchProps) => {
  const [checked, setChecked] = React.useState(checkedInitial);
  return <Checkbox checked={checked} onClick={() => setChecked(!checked)} {...props} />;
};

const baseStory = (args) => (
  <Box display="flex" mx={-1} mb={1}>
    <ControlledCheckbox mx={1} checked={true} {...args} />
    <ControlledCheckbox mx={1} checked={false} {...args} />
    <ControlledCheckbox mx={1} checked={true} disabled={true} {...args} />
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

export const WithLabels = () => (
  <>
    <Box display="flex" mx={-1} mb={1}>
      <ControlledCheckbox mx={1} checked={true} label="Hans" />
      <ControlledCheckbox mx={1} checked={false} label="Wurst" />
    </Box>
    <Box display="flex" mx={-1} mb={1}>
      <ControlledCheckbox mx={1} checked={true} size="small" label="Hans" />
      <ControlledCheckbox mx={1} checked={false} size="small" label="Wurst" />
    </Box>
  </>
);
