import React from 'react';
import { css } from 'styled-components';
import { Button } from '../Button';
import { Card } from '../Card';
import { Paragraph, Title } from '../Typography';
import { ButtonBar } from './ButtonBar';

export default {
  title: 'ButtonBar',
};

export const WithTwoButtons = () => (
  <Card width={500}>
    <Title>Do you want to proceed?</Title>
    <Paragraph>Please select one of the buttons below!</Paragraph>
    <ButtonBar>
      <Button size="medium" variant="text" color="plain">
        Cancel
      </Button>
      <Button size="medium">Accept</Button>
    </ButtonBar>
  </Card>
);

export const WithOneButtons = () => (
  <Card width={500}>
    <Title>Move along</Title>
    <Paragraph>You don't have an option!</Paragraph>
    <ButtonBar>
      <Button size="medium">Ok</Button>
    </ButtonBar>
  </Card>
);

export const WithCustomStyles = () => (
  <Card width={500}>
    <Title>Do you want to proceed?</Title>
    <Paragraph>Please select one of the buttons below!</Paragraph>
    <ButtonBar
      customStyles={{
        root: css`
          padding: 7px;
          background-color: red;
        `,
      }}
    >
      <Button size="medium" variant="text" color="plain">
        Cancel
      </Button>
      <Button size="medium">Accept</Button>
    </ButtonBar>
  </Card>
);
