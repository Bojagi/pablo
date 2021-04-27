import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Check } from 'react-feather';
import { css } from 'styled-components';
import { Flex } from '../Box';
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
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={4} size="small" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={4} size="small" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
    <Subtitle>Medium</Subtitle>
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={4} size="medium" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={4} size="medium" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
    <Subtitle>Large</Subtitle>
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={4} size="large" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={4} size="large" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
  </>
);

export const Normal = baseStory.bind(null);
Normal.args = {};

export const Active = baseStory.bind(null);
Active.args = {
  active: true,
};

export const CustomStyles = baseStory.bind(null);
CustomStyles.args = {
  customStyles: {
    root: css`
      background-color: red;
    `,
    focus: css`
      background-color: blue;
    `,
    hover: css`
      background-color: darkred;
    `,
    active: css`
      background-color: yellow;
    `,
  },
};
