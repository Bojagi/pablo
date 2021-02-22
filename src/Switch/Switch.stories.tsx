import React from 'react';
import { Box, Flex } from '../Box';
import { Switch, SwitchProps } from './Switch';

export default {
  title: 'Switch',
};

const ControlledSwitch = ({ checked: checkedInitial, ...props }: Omit<SwitchProps, 'onChange'>) => {
  const [checked, setChecked] = React.useState(checkedInitial);
  return <Switch checked={checked} {...props} onChange={() => setChecked(!checked)} />;
};

const baseStory = (args) => (
  <Flex mx={-4} mb={4}>
    <ControlledSwitch mx={4} checked={true} {...args} />
    <ControlledSwitch mx={4} checked={false} {...args} />
    <ControlledSwitch mx={4} checked={true} disabled={true} {...args} />
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

export const WithLabel = () => (
  <>
    <Box mb={6}>
      <ControlledSwitch checked={true} label="Hans Wurst" />
    </Box>
    <Box mb={6}>
      <ControlledSwitch size="small" checked={true} label="Hans Wurst" />
    </Box>
  </>
);
