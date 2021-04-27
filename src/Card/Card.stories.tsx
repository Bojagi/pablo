import React from 'react';
import { css } from 'styled-components';
import { Paragraph, Title } from '../Typography';
import { Card } from './Card';

export default {
  title: 'Card',
};

export const PlainCard = () => (
  <Card>
    <Title>This is a card</Title>
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
    <Title>This is a card</Title>
    <Paragraph>With some text</Paragraph>
  </Card>
);
