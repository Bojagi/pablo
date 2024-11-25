import React from 'react';
import { css } from '@emotion/react';

import { Flex } from '../Box';
import { Button } from '../Button';
import { Tooltip } from './Tooltip';
import { FadeAnimation, StackAnimation } from '../animation';

export default {
  title: 'Tooltip',
};

const BaseStory = (args) => (
  <Flex height="110vh" width="50vw" alignItems="center" justifyContent="center">
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

export const WithClick = BaseStory.bind(null);
WithClick.args = { showOnClick: true };

export const WithSlowAnimation = BaseStory.bind(null);
WithSlowAnimation.args = { animationProps: { duration: 1000 } };

export const WithReverseAnimation = BaseStory.bind(null);
WithReverseAnimation.args = { animationProps: { reverse: true, duration: 1000 } };

export const WithFadeAnimation = BaseStory.bind(null);
WithFadeAnimation.args = { animation: FadeAnimation, animationProps: { duration: 1000 } };

export const WithStackAnimation = BaseStory.bind(null);
WithStackAnimation.args = { animation: StackAnimation, animationProps: { duration: 1000 } };

export const WithNoAnimation = BaseStory.bind(null);
WithNoAnimation.args = { animation: { duration: 0 } };

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
