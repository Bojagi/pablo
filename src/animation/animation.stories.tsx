import React, { useState } from 'react';
import { css } from '@emotion/react';
import { Box, Flex } from '../Box';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Title } from '../Typography';
import { SlideAnimation } from './SlideAnimation';
import { NoAnimation as NoAnimationComponent } from './NoAnimation';
import { StackAnimation } from './StackAnimation';
import { FadeAnimation } from './FadeAnimation';
import { DropInAnimation, PopOutAnimation } from './ScaleAnimation';
import { NativeSelect } from '../NativeSelect';

export default {
  title: 'Animation',
};

const BaseStory = ({ component: Component, ...args }) => {
  const [duration, setDuration] = useState(300);
  const [visible, setVisible] = useState(false);
  const [easing, setEasing] = useState('easeInOut');

  return (
    <Flex
      gap={2}
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `}
      alignItems="stretch"
    >
      <Flex center grow={1} flexBasis={0}>
        <Box mb={4}>
          <Checkbox
            mb={1}
            checked={visible}
            onChange={() => setVisible((v) => !v)}
            label="visible"
          />

          <Input
            label="Duration"
            mb={1}
            onChange={(v) => setDuration(parseInt(v, 10) || 0)}
            value={duration}
          />
          <NativeSelect label="Easing" mb={1} onChange={setEasing} value={easing}>
            <option>easeInOut</option>
            <option>easeIn</option>
            <option>easeOut</option>
            <option>bounce</option>
            <option>linear</option>
          </NativeSelect>
        </Box>
      </Flex>
      <Flex center grow={1} shrink={0} flexBasis={0} bgColor="gray.50">
        <Box maxWidth={400} height={200} p={3}>
          <Component duration={duration} visible={visible} easing={easing} {...args}>
            <Card>
              <Title>I am animated</Title>
            </Card>
          </Component>
        </Box>
      </Flex>
    </Flex>
  );
};

export const Stack = BaseStory.bind(null);
Stack.args = {
  component: StackAnimation,
};

export const Fade = BaseStory.bind(null);
Fade.args = {
  component: FadeAnimation,
};

export const Slide = BaseStory.bind(null);
Slide.args = {
  component: SlideAnimation,
  side: 'left',
  reverse: false,
};

export const DropIn = BaseStory.bind(null);
DropIn.args = {
  component: DropInAnimation,
};

export const PopOut = BaseStory.bind(null);
PopOut.args = {
  component: PopOutAnimation,
};

export const NoAnimation = BaseStory.bind(null);
NoAnimation.args = {
  component: NoAnimationComponent,
};
