import React, { useState } from 'react';

import { BookOpen, GitPullRequest, Settings } from 'react-feather';
import { css } from '@emotion/react';
import { Box } from '../Box';
import { Input } from '../Input';
import { Tab } from './Tab';
import { Tabs } from './Tabs';

export default {
  title: 'Tabs',
};

export const TabsWithStaticActive = () => (
  <Tabs>
    <Tab name="first" selected>
      First tab
    </Tab>
    <Tab name="second">Second tab</Tab>
  </Tabs>
);

export const TabsWithSelectedProp = () => (
  <Tabs selected="second">
    <Tab name="first">First tab</Tab>
    <Tab name="second">Second tab</Tab>
    <Tab name="third">Third tab</Tab>
  </Tabs>
);

export const TabsWithDifferentSizes = () => (
  <Box width={500}>
    <Box mb="xl">
      <Tabs selected="second">
        <Tab name="first" size="medium">
          First tab
        </Tab>
        <Tab name="second" size="medium">
          Second tab
        </Tab>
        <Tab name="third" size="medium">
          Third tab
        </Tab>
      </Tabs>
    </Box>
    <Box mb="xl">
      <Tabs selected="second">
        <Tab name="first" size="large">
          First tab
        </Tab>
        <Tab name="second" size="large">
          Second tab
        </Tab>
        <Tab name="third" size="large">
          Third tab
        </Tab>
      </Tabs>
    </Box>
  </Box>
);

export const TabsWithOnSelectCb = () => {
  const [selected, setSelected] = useState('second');
  return (
    <Tabs selected={selected} onSelect={setSelected}>
      <Tab name="first">First tab</Tab>
      <Tab name="second">Second tab</Tab>
      <Tab name="third">Third tab</Tab>
    </Tabs>
  );
};

export const TabsWithIcons = () => (
  <Tabs selected="second">
    <Tab name="first" icon={<BookOpen size={16} />}>
      First tab
    </Tab>
    <Tab name="second" icon={<GitPullRequest size={16} />}>
      Second tab
    </Tab>
    <Tab name="third" icon={<Settings size={16} />}>
      Third tab
    </Tab>
  </Tabs>
);

export const TabsWithOverflow = () => {
  const [selected, setSelected] = useState('second');
  const [width, setWidth] = useState(600);
  return (
    <Box>
      <Input
        mb={6}
        width={100}
        label="width"
        onChange={(val) => setWidth(parseInt(val, 10) || 0)}
        value={width}
      />
      <Box width={width}>
        <Tabs selected={selected} onSelect={setSelected}>
          <Tab name="first">First tab</Tab>
          <Tab name="second">Second tab</Tab>
          <Tab name="third">Third tab</Tab>
          <Tab name="fourth">Fourth tab</Tab>
          <Tab name="fifth">Fifth tab</Tab>
          <Tab name="sixth">Sixth tab</Tab>
          <Tab name="seventh">Seventh tab</Tab>
          <Tab name="eighth">Eighth tab</Tab>
          <Tab name="ninth">Ninth tab</Tab>
          <Tab name="tenth">Tenth tab</Tab>
        </Tabs>
      </Box>
    </Box>
  );
};

const CustomTab = (props) => (
  <Tab
    {...props}
    customStyles={{
      root: css`
        color: red;
      `,
      indicator: css`
        background-color: red;
        border-radius: 0;
        transform: rotate(10deg);
      `,
      hover: css`
        background-color: blue;
      `,
    }}
  />
);

export const TabsWithCustomStyles = () => {
  const [selected, setSelected] = useState('second');
  return (
    <Tabs
      selected={selected}
      onSelect={setSelected}
      customStyles={{
        root: css`
          background-color: orange;
        `,
      }}
    >
      <CustomTab name="first">First tab</CustomTab>
      <CustomTab name="second">Second tab</CustomTab>
      <CustomTab name="third">Third tab</CustomTab>
    </Tabs>
  );
};
