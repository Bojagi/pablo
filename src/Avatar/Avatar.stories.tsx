import React from 'react';
import { css } from '@emotion/react';
import { Flex } from '../Box';
import { Avatar } from './index';

export default {
  title: 'Avatar',
};

const BaseStory = (args) => (
  <Flex gap={1}>
    <Avatar
      size="large"
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="medium"
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="small"
      src="https://avatars.githubusercontent.com/u/36902682?s=200&v=4"
      {...args}
    />
    <Avatar
      size="tiny"
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

export const CustomStyleCircle = BaseStory.bind(null);
CustomStyleCircle.args = {
  variant: 'circle',
  customStyles: {
    circle: css`
      border: 4px solid white;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.2);
    `,
  },
};
