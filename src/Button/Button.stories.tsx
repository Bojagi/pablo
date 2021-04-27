import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GitPullRequest } from 'react-feather';
import { css, keyframes } from 'styled-components';
import { Flex, Box } from '../Box';
import { Subtitle } from '../Typography';
import { Button } from './Button';

export default {
  title: 'Button',
};

console.log('Button', Button);

const SetOfButtons = (args) => (
  <Flex mx={-4} mb={4}>
    <Button mx={4} {...args} color="brand">
      Brand
    </Button>
    <Button mx={4} {...args} color="plain">
      Plain
    </Button>
    <Button mx={4} {...args} color="positive">
      Positive
    </Button>
    <Button mx={4} {...args} color="negative">
      Negative
    </Button>
  </Flex>
);

const baseStory = (args) => (
  <>
    <Subtitle>Small</Subtitle>
    <Box mb={5}>
      <SetOfButtons size="small" {...args} />
      <SetOfButtons size="small" disabled {...args} />
    </Box>
    <Subtitle>Medium</Subtitle>
    <Box mb={5}>
      <SetOfButtons size="medium" {...args} />
      <SetOfButtons size="medium" disabled {...args} />
    </Box>
    <Subtitle>Large</Subtitle>
    <Box mb={5}>
      <SetOfButtons size="large" {...args} />
      <SetOfButtons size="large" disabled {...args} />
    </Box>
  </>
);

export const Primary = baseStory.bind(null);
Primary.args = {
  variant: 'primary',
};

export const Secondary = baseStory.bind(null);
Secondary.args = {
  variant: 'secondary',
};

export const Text = baseStory.bind(null);
Text.args = {
  variant: 'text',
};

export const PrimaryWithIcon = baseStory.bind(null);
PrimaryWithIcon.args = {
  variant: 'primary',
  startIcon: <GitPullRequest size={16} />,
};

export const SecondaryWithIcon = baseStory.bind(null);
SecondaryWithIcon.args = {
  variant: 'secondary',
  endIcon: <GitPullRequest size={16} />,
};

export const AsLink = baseStory.bind(null);
AsLink.args = {
  variant: 'primary',
  as: 'a',
  href: '#hello',
};

export const TextWithIcon = baseStory.bind(null);
TextWithIcon.args = { variant: 'text', startIcon: <GitPullRequest size={16} /> };

const shakeAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(10deg);
  }

  50% {
    transform: rotate(-10deg);
  }

  100% {
    transform: rotate(0deg);
  }
`;

export const WithCustomStyles = baseStory.bind(null);
WithCustomStyles.args = {
  variant: 'primary',
  startIcon: <GitPullRequest size={16} />,
  customStyles: {
    primary: css`
      animation: ${shakeAnimation} 0.5s linear infinite;
      background-color: tomato;
      &:hover:not(:disabled) {
        background-color: red;
      }
    `,
    icon: css`
      color: blue;
    `,
    startIcon: css`
      margin-right: 100px;
    `,
  },
};
