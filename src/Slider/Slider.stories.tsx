import React, { useState } from 'react';

import { Slider } from './Slider';
import { Flex } from '../Box';
import { Paragraph } from '../Typography';

export default {
  title: 'Slider',
};

const BaseStory = ({ from, to }) => {
  const [value, setValue] = useState(50);
  return (
    <Flex center width="50vw" gap={2}>
      <Slider shrink grow from={from} to={to} value={value} onChange={setValue} />
      <Flex width={50} center shrink={0} grow={0}>
        <Paragraph inline>{Math.floor(value)}</Paragraph>
      </Flex>
    </Flex>
  );
};

export const SimpleSlider = BaseStory.bind(null);
SimpleSlider.args = {
  from: 0,
  to: 100,
};

export const OffsetRangeSlider = BaseStory.bind(null);
OffsetRangeSlider.args = {
  from: 23,
  to: 184,
};

export const LowerOutOfBounds = BaseStory.bind(null);
LowerOutOfBounds.args = {
  from: 70,
  to: 100,
};

export const UpperOutOfBounds = BaseStory.bind(null);
UpperOutOfBounds.args = {
  from: 0,
  to: 40,
};
