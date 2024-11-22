import React from 'react';

import { GitPullRequest } from 'react-feather';
import { css, keyframes } from 'styled-components';
import { Flex, Box } from '../Box';
import { Subtitle } from '../Typography';
import { Button } from './Button';

export default {
  title: 'Button',
};

const ButtonBox = ({ inverted, invertedBgColor, children }) => (
  <Box bgColor={inverted ? invertedBgColor : undefined} p={inverted ? 5 : 0}>
    {children}
  </Box>
);

const SetOfButtons = ({ inverted, ...args }) => (
  <Flex
    mx={-4}
    mb={4}
    width={args.fullWidth ? 400 : 0}
    flexDirection={args.fullWidth ? 'column' : 'row'}
  >
    <ButtonBox inverted={inverted} invertedBgColor="brand.main">
      <Button mx={4} mb={args.fullWidth ? 4 : 0} {...args} color="brand">
        Brand
      </Button>
    </ButtonBox>
    <ButtonBox inverted={inverted} invertedBgColor="common.black">
      <Button mx={4} mb={args.fullWidth ? 4 : 0} {...args} color="plain">
        Plain
      </Button>
    </ButtonBox>
    <ButtonBox inverted={inverted} invertedBgColor="positive.main">
      <Button mx={4} mb={args.fullWidth ? 4 : 0} {...args} color="positive">
        Positive
      </Button>
    </ButtonBox>
    <ButtonBox inverted={inverted} invertedBgColor="negative.main">
      <Button mx={4} mb={args.fullWidth ? 4 : 0} {...args} color="negative">
        Negative
      </Button>
    </ButtonBox>
  </Flex>
);

const baseStory = ({ inverted, ...args }) => (
  <>
    <Subtitle>Small</Subtitle>
    <Box mb={5}>
      <SetOfButtons inverted={inverted} size="small" {...args} />
      <SetOfButtons inverted={inverted} size="small" disabled {...args} />
    </Box>
    <Subtitle>Medium</Subtitle>
    <Box mb={5}>
      <SetOfButtons inverted={inverted} size="medium" {...args} />
      <SetOfButtons inverted={inverted} size="medium" disabled {...args} />
    </Box>
    <Subtitle>Large</Subtitle>
    <Box mb={5}>
      <SetOfButtons inverted={inverted} size="large" {...args} />
      <SetOfButtons inverted={inverted} size="large" disabled {...args} />
    </Box>
  </>
);

export const Primary = baseStory.bind(null);
Primary.args = {
  variant: 'primary',
};

export const PrimaryInverted = baseStory.bind(null);
PrimaryInverted.args = {
  variant: 'primaryInverted',
  inverted: true,
};

export const Secondary = baseStory.bind(null);
Secondary.args = {
  variant: 'secondary',
};

export const SecondaryInverted = baseStory.bind(null);
SecondaryInverted.args = {
  variant: 'secondaryInverted',
  inverted: true,
};

export const Text = baseStory.bind(null);
Text.args = {
  variant: 'text',
};

export const TextInverted = baseStory.bind(null);
TextInverted.args = {
  variant: 'textInverted',
  inverted: true,
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

export const FullWidth = baseStory.bind(null);
FullWidth.args = { fullWidth: true, startIcon: <GitPullRequest size={16} /> };

export const WithCustomStyles = baseStory.bind(null);
WithCustomStyles.args = {
  variant: 'primary',
  startIcon: <GitPullRequest size={16} />,
  customStyles: {
    primary: css`
      animation: ${shakeAnimation} 0.5s linear infinite;
      background-color: tomato;
      &:hover:enabled {
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
