import React from 'react';
import { css } from 'styled-components';
import { Box } from '../Box';
import { TextArea, TextAreaProps } from './TextArea';

export default {
  title: 'TextArea',
};

const ControlledTextArea = ({ value: valueInitial, ...props }: Omit<TextAreaProps, 'onChange'>) => {
  const [value, setValue] = React.useState(valueInitial);
  return <TextArea rows={3} value={value} mb={4} {...props} onChange={setValue} />;
};

const baseStory = (args) => <ControlledTextArea {...args} />;

export const Inline = baseStory.bind(null);
Inline.args = {};

export const FullWidth = baseStory.bind(null);
FullWidth.args = { fullWidth: true };

export const FixedWidth = baseStory.bind(null);
FixedWidth.args = { width: 800 };

export const WithLabel = baseStory.bind(null);
WithLabel.args = {
  label: <>name</>,
};

export const WithInfoText = baseStory.bind(null);
WithInfoText.args = {
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const WithLabelAndInfoText = baseStory.bind(null);
WithLabelAndInfoText.args = {
  label: <>name</>,
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const Error = baseStory.bind(null);
Error.args = {
  error: 'Something terrible happened!',
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
};

export const MultipleTextAreas = () => (
  <Box>
    <Box mb={5}>
      <ControlledTextArea label="first name" />
    </Box>
    <Box mb={5}>
      <ControlledTextArea label="last name" />
    </Box>
    <Box mb={5}>
      <ControlledTextArea label="credit card no." infoText="optional" />
    </Box>
  </Box>
);

export const Outline = baseStory.bind(null);
Outline.args = { variant: 'outline' };

export const WithCustomStyles = baseStory.bind(null);
WithCustomStyles.args = {
  label: <>name</>,
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
  customStyles: {
    label: css`
      transform: rotate(6deg);
      transform-origin: 0 0;
    `,
    infoText: css`
      transform: rotate(-3deg);
      transform-origin: 0 0;
    `,
    wrapper: css`
      transform: rotate(-5deg);
      transform-origin: 0 0;
      background-color: blue;
    `,
    field: css`
      color: red;
    `,
  },
};
