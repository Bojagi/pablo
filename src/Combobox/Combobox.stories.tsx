import React, { useState } from 'react';

import { Search } from 'react-feather';
import { css } from '@emotion/react';
import { Box, Flex } from '../Box';
import { IconButton } from '../IconButton';
import { Body, Typography } from '../Typography';
import { Combobox, ComboboxItem, ComboboxProps } from './Combobox';

export default {
  title: 'Combobox',
};

const ControlledInput = ({
  value: valueInitial = '',
  ...props
}: Omit<ComboboxProps, 'onChange'>) => {
  const [value, setValue] = useState(valueInitial);
  return <Combobox showOnEmpty value={value} mb={4} {...props} onChange={setValue} />;
};

const items = [
  {
    value: 'Final Fantasy VI',
    system: 'SNES',
  },
  {
    value: 'Super Mario Bros. 3',
    system: 'NES',
  },
  {
    value: 'The Legend of Zelda: Ocarina of Time',
    system: 'N64',
  },
  {
    value: 'Portal 2',
    system: 'PC',
  },
  {
    value: 'Metal Gear Solid',
    system: 'PS1',
  },
  {
    value: 'Tony Hawk Pro Skater 2',
    system: 'multi system',
  },
];

const Label = ({ item }) => (
  <Box>
    <Body inline>{item.value}</Body>
    <Body inline small color="gray.100">
      {item.system}
    </Body>
  </Box>
);

const baseStory = (args) => (
  <ControlledInput
    showOnEmpty
    children={items.map((item) => (
      <ComboboxItem key={item.value} value={item.value}>
        <Label item={item} />
      </ComboboxItem>
    ))}
    {...args}
  />
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
      <ControlledInput label="first name" />
    </Box>
    <Box mb={5}>
      <ControlledInput label="last name" />
    </Box>
    <Box mb={5}>
      <ControlledInput label="credit card no." infoText="optional" />
    </Box>
  </Box>
);

export const MultipleInputsWithFlex = () => (
  <Flex width={300} gap={2} equal p={2}>
    <ControlledInput fullWidth label="name" />
    <ControlledInput
      fullWidth
      label="search"
      end={
        <IconButton size="small">
          <Search />
        </IconButton>
      }
    />
  </Flex>
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
    <Typography inline variant="body" bold>
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
