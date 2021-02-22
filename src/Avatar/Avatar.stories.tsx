import React from 'react';
import { Flex } from '../Box';
import { Avatar } from './Avatar';

export default {
  title: 'Avatar',
};

const BaseStory = (args) => (
  <Flex mx={-4}>
    <Avatar
      mx={4}
      size="large"
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="medium"
      mx={4}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="small"
      mx={4}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="tiny"
      mx={4}
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
  </Flex>
);

export const Square = BaseStory.bind(null);
Square.args = {
  variant: 'square',
};

export const Circle = BaseStory.bind(null);
Circle.args = {
  variant: 'circle',
};
