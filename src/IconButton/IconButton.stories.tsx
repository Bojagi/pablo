import React, { useState } from 'react';

import { Check } from 'react-feather';
import { css } from '@emotion/react';
import { Flex } from '../Box';
import { Subtitle } from '../Typography';
import { IconButton } from './IconButton';

export default {
  title: 'IconButton',
};

const ControlledIconButton = (props) => {
  const [active, setActive] = useState(props.active);
  return <IconButton {...props} active={active} onClick={() => setActive(!active)} />;
};

const baseStory = (args) => (
  <>
    <Subtitle>Small</Subtitle>
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={1} size="small" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="small" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
    <Subtitle>Medium</Subtitle>
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={1} size="medium" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="medium" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
    <Subtitle>Large</Subtitle>
    <Flex mx={-4} mb={5}>
      <ControlledIconButton mx={1} size="large" {...args}>
        <Check />
      </ControlledIconButton>
      <ControlledIconButton mx={1} size="large" disabled {...args}>
        <Check />
      </ControlledIconButton>
    </Flex>
  </>
);

export const Normal = baseStory.bind(null);
Normal.args = {};

export const BrandColor = baseStory.bind(null);
BrandColor.args = {
  color: 'brand',
};

export const PositiveColor = baseStory.bind(null);
PositiveColor.args = {
  color: 'positive',
};

export const NegativeColor = baseStory.bind(null);
NegativeColor.args = {
  color: 'negative',
};

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
