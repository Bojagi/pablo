import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Flex } from '../Box';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

export default {
  title: 'Tooltip',
};

const BaseStory = (args) => (
  <Flex height="100vh" width="100vw" alignItems="center" justifyContent="center">
    <Tooltip mx={5} content="Top tooltip" side="left" {...args}>
      <Button color="plain">left</Button>
    </Tooltip>
    <Tooltip mx={5} content="Top tooltip" side="top" {...args}>
      <Button color="plain"> top</Button>
    </Tooltip>
    <Tooltip mx={5} content="Top tooltip" side="bottom" {...args}>
      <Button color="plain">bottom</Button>
    </Tooltip>
    <Tooltip mx={5} content="Top tooltip" side="right" {...args}>
      <Button color="plain">right</Button>
    </Tooltip>
  </Flex>
);

export const WithoutDelay = BaseStory.bind(null);
WithoutDelay.args = {};

export const WithDelay = BaseStory.bind(null);
WithDelay.args = { delay: 400 };
