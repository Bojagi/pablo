import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Check } from 'react-feather';
import { Box } from '../Box';
import { Subtitle } from '../Typography';
import { IconButton } from './IconButton';

export default {
  title: 'IconButton',
};

const ControlledIconButton = (props) => {
  const [active, setActive] = React.useState(props.active);
  return <IconButton {...props} active={active} onClick={() => setActive(!active)} />;
};

const baseStory = (args) => (
  <>
    <Subtitle>Small</Subtitle>
    <Box mx={-1} flex mb={2}>
      <ControlledIconButton mx={1} size="small" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="small" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Box>
    <Subtitle>Medium</Subtitle>
    <Box mx={-1} flex mb={2}>
      <ControlledIconButton mx={1} size="medium" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="medium" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Box>
    <Subtitle>Large</Subtitle>
    <Box mx={-1} flex mb={2}>
      <ControlledIconButton mx={1} size="large" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="large" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Box>
  </>
);

export const Normal = baseStory.bind(null);
Normal.args = {};

export const Active = baseStory.bind(null);
Active.args = {
  active: true,
};
