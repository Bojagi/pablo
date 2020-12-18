import React from "react";
import { Box } from "../Box";
import { Button } from "./Button";

export default {
  title: 'Button',
};

const baseStory = args => <Box display="flex" mx={-1}>
    <Button mx={1} {...args}>Hello</Button>
    <Button mx={1} {...args} variant="secondary">Hello</Button>
    <Button mx={1} {...args} variant="text">Hello</Button>
    <Button mx={1} {...args} disabled>Hello</Button>
    <Button mx={1} {...args} variant="secondary" disabled>Hello</Button>
    <Button mx={1} {...args} variant="text" disabled>Hello</Button>
</Box>

export const Brand = baseStory.bind(null);
Brand.args = {};

export const Black = baseStory.bind(null);
Black.args = {color: 'black'};

export const Positive = baseStory.bind(null);
Positive.args = {color: 'positive'};

export const Negative = baseStory.bind(null);
Negative.args = {color: 'negative'};
