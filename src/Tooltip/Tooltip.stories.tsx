import React from 'react';
import { css } from '@emotion/react';

import { Flex } from '../Box';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';

export default {
  title: 'Tooltip',
};

const BaseStory = (args) => (
  <Flex height="100%" width="50vw" alignItems="center" justifyContent="center">
    <Tooltip content="Left tooltip" side="left" {...args}>
      <Button mx={1.5} color="plain">
        left
      </Button>
    </Tooltip>
    <Tooltip content="Top tooltip" side="top" {...args}>
      <Button mx={1.5} color="plain">
        {' '}
        top
      </Button>
    </Tooltip>
    <Tooltip content="Bottom tooltip" side="bottom" {...args}>
      <Button mx={1.5} color="plain">
        bottom
      </Button>
    </Tooltip>
    <Tooltip content="Right tooltip" side="right" {...args}>
      <Button mx={1.5} color="plain">
        right
      </Button>
    </Tooltip>
  </Flex>
);

export const WithoutDelay = BaseStory.bind(null);
WithoutDelay.args = {};

export const WithDelay = BaseStory.bind(null);
WithDelay.args = { delay: 400 };

export const WithDisabledButton = ({ disabled, ...args }) => (
  <Flex height="100%" width="100vw" alignItems="center" justifyContent="center">
    <Tooltip content="Top tooltip" side="top" {...args}>
      <Button mx={1.5} color="plain" disabled={disabled}>
        {' '}
        top
      </Button>
    </Tooltip>
  </Flex>
);
WithDisabledButton.args = {
  disabled: true,
};

export const WithCustomStyles = BaseStory.bind(null);
WithCustomStyles.args = {
  customStyles: {
    box: css`
      background-color: red;
      border-radius: 100px;
    `,
    arrow: css`
      border-bottom-color: red;
    `,
  },
};
