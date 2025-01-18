import React from 'react';
import { css } from '@emotion/react';
import { Button } from '../Button';
import { Card } from '../Card';
import { H4, Body } from '../Typography';
import { ButtonBar } from './ButtonBar';

export default {
  title: 'ButtonBar',
};

export const WithTwoButtons = () => (
  <Card width={500}>
    <H4>Do you want to proceed?</H4>
    <Body>Please select one of the buttons below!</Body>
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
    <H4>Move along</H4>
    <Body>You don't have an option!</Body>
    <ButtonBar>
      <Button size="medium">Ok</Button>
    </ButtonBar>
  </Card>
);

export const WithCustomStyles = () => (
  <Card width={500}>
    <H4>Do you want to proceed?</H4>
    <Body>Please select one of the buttons below!</Body>
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
