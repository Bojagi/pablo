import React from 'react';
import { Box } from '../Box';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Switch',
};

const ControlledSwitch = ({ checked: checkedInitial, ...props }: Omit<SwitchProps, 'onChange'>) => {
  const [checked, setChecked] = React.useState(checkedInitial);
  return <Switch checked={checked} {...props} onChange={() => setChecked(!checked)} />;
};

const baseStory = (args) => (
  <Box flex mx={-1} mb={1}>
    <ControlledSwitch mx={1} checked={true} {...args} />
    <ControlledSwitch mx={1} checked={false} {...args} />
    <ControlledSwitch mx={1} checked={true} disabled={true} {...args} />
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

export const WithLabel = () => (
  <>
    <Box mb={4}>
      <ControlledSwitch checked={true} label="Hans Wurst" />
    </Box>
    <Box mb={4}>
      <ControlledSwitch size="small" checked={true} label="Hans Wurst" />
    </Box>
  </>
);
