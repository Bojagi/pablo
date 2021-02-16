import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { GitPullRequest } from 'react-feather';
import { Box } from '../Box';
import { Subtitle } from '../Typography';
import { Button } from './Button';

export default {
  title: 'Button',
};

const SetOfButtons = (args) => (
  <Box flex mx={-1} mb={1}>
    <Button mx={1} {...args} color="brand">
      Brand
    </Button>
    <Button mx={1} {...args} color="plain">
      Plain
    </Button>
    <Button mx={1} {...args} color="positive">
      Positive
    </Button>
    <Button mx={1} {...args} color="negative">
      Negative
    </Button>
  </Box>
);

const baseStory = (args) => (
  <>
    <Subtitle>Small</Subtitle>
    <Box mb={2}>
      <SetOfButtons size="small" {...args} />
      <SetOfButtons size="small" disabled {...args} />
    </Box>
    <Subtitle>Medium</Subtitle>
    <Box mb={2}>
      <SetOfButtons size="medium" {...args} />
      <SetOfButtons size="medium" disabled {...args} />
    </Box>
    <Subtitle>Large</Subtitle>
    <Box mb={2}>
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
  icon: <GitPullRequest size={16} />,
};

export const SecondaryWithIcon = baseStory.bind(null);
SecondaryWithIcon.args = {
  variant: 'secondary',
  icon: <GitPullRequest size={16} />,
};

export const TextWithIcon = baseStory.bind(null);
TextWithIcon.args = { variant: 'text', icon: <GitPullRequest size={16} /> };
