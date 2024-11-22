import React from 'react';

import { Search } from 'react-feather';
import { css } from 'styled-components';
import { Box } from '../Box';
import { IconButton } from '../IconButton';
import { Typography } from '../Typography';
import { NativeSelect, NativeSelectProps } from './NativeSelect';

export default {
  title: 'NativeSelect',
};

const ControlledSelect = ({
  value: valueInitial,
  ...props
}: Omit<NativeSelectProps, 'onChange'>) => {
  const [value, setValue] = React.useState(valueInitial);
  return <NativeSelect value={value} mb={4} {...props} onChange={setValue} />;
};

const baseStory = (args) => (
  <ControlledSelect {...args}>
    <option>Hans</option>
    <option>Ilse</option>
    <option>Franz</option>
  </ControlledSelect>
);

export const FullWidth = baseStory.bind(null);
FullWidth.args = { fullWidth: true };

export const FixedWidth = baseStory.bind(null);
FixedWidth.args = { width: 800 };

export const Inline = baseStory.bind(null);
Inline.args = {};

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

export const MultipleInputs = () => (
  <Box>
    <Box mb={5}>
      <ControlledSelect label="first name">
        <option>Hans</option>
        <option>Ilse</option>
        <option>Franz</option>
      </ControlledSelect>
    </Box>
    <Box mb={5}>
      <ControlledSelect label="last name">
        <option>Wurst</option>
        <option>Pilse</option>
        <option>Kranz</option>
      </ControlledSelect>
    </Box>
    <Box mb={5}>
      <ControlledSelect value="123456789" label="credit card no." infoText="optional">
        <option>None</option>
        <option>123456789</option>
      </ControlledSelect>
    </Box>
  </Box>
);

export const WithEndComponent = baseStory.bind(null);
WithEndComponent.args = {
  label: <>search</>,
  fullWidth: false,
  width: 600,
  end: (
    <IconButton size="small">
      <Search />
    </IconButton>
  ),
};

export const WithStartComponent = baseStory.bind(null);
WithStartComponent.args = {
  fullWidth: false,
  width: 600,
  start: (
    <Typography mb={0} variant="paragraphBold">
      search:
    </Typography>
  ),
};

export const Outline = baseStory.bind(null);
Outline.args = { variant: 'outline' };

export const WithCustomStyles = baseStory.bind(null);
WithCustomStyles.args = {
  label: <>Some longer name</>,
  infoText: (
    <>
      This is something <strong>important!</strong>
    </>
  ),
  customStyles: {
    label: css`
      transform: translateY(-36px) rotate(6deg);
      /* transform-origin: 0 0; */
      text-align: right;
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
