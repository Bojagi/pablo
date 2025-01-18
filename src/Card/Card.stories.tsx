import React from 'react';
import { css } from '@emotion/react';
import { Paragraph, Subtitle } from '../Typography';
import { Card } from './Card';

export default {
  title: 'Card',
};

export const PlainCard = () => (
  <Card>
    <Subtitle>This is a card</Subtitle>
    <Paragraph>With some text</Paragraph>
  </Card>
);

export const CustomStyles = () => (
  <Card
    customStyles={{
      root: css`
        background-color: blue;
        color: white;
      `,
    }}
  >
    <Subtitle>This is a card</Subtitle>
    <Paragraph>With some text</Paragraph>
  </Card>
);
