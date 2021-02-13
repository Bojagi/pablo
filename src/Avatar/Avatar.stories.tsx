import React from 'react';
import { Box } from '../Box';
import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
};

const BaseStory = (args) => (
  <Box display="flex" mx={-1}>
    <Avatar
      mx={1}
      size="large"
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="medium"
      mx={1}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="small"
      mx={1}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="tiny"
      mx={1}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
  </Box>
);

export const Square = BaseStory.bind(null);
Square.args = {
  variant: 'square',
};

export const Circle = BaseStory.bind(null);
Circle.args = {
  variant: 'circle',
};
