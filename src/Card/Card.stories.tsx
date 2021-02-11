import React from 'react';
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
