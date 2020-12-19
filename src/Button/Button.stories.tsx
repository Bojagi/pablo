import React from "react";
import { Box } from "../Box";
import { Button } from "./Button";
import { GitPullRequest } from 'react-feather';

export default {
  title: 'Button',
};

const baseStory = args => (
  <>
    <Box display="flex" mx={-1} mb={1}>
      <Button mx={1} {...args} color="brand">Brand</Button>
      <Button mx={1} {...args} color="black">Black</Button>
      <Button mx={1} {...args} color="positive">Positive</Button>
      <Button mx={1} {...args} color="negative">Negative</Button>
    </Box>
    <Box display="flex" mx={-1}>
      <Button mx={1} {...args} color="brand" disabled>Brand</Button>
      <Button mx={1} {...args} color="black" disabled>Black</Button>
      <Button mx={1} {...args} color="positive" disabled>Positive</Button>
      <Button mx={1} {...args} color="negative" disabled>Negative</Button>
    </Box>
  </>
)

export const Primary = baseStory.bind(null);
Primary.args = {variant: 'primary'};

export const Secondary = baseStory.bind(null);
Secondary.args = {variant: 'secondary'};

export const Text = baseStory.bind(null);
Text.args = {variant: 'text'};

export const PrimaryWithIcon = baseStory.bind(null);
PrimaryWithIcon.args = {variant: 'primary', icon: <GitPullRequest size={16} />};

export const SecondaryWithIcon = baseStory.bind(null);
SecondaryWithIcon.args = {variant: 'secondary', icon: <GitPullRequest size={16} />};

export const TextWithIcon = baseStory.bind(null);
TextWithIcon.args = {variant: 'text', icon: <GitPullRequest size={16} />};
