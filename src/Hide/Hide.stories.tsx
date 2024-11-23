import React, { useState } from 'react';
import { ShowBelow, ShowOnlyOn } from '../Show';
import { Tab, Tabs } from '../Tabs';
import { Breakpoint } from '../theme/breakpoints';
import { Paragraph } from '../Typography';
import { HideBelow, HideAbove, HideOnlyOn } from './Hide';
import { Box } from '../Box';

export default {
  title: 'Hide',
};

const CurrentBreakpoint = () => (
  <Box>
    <Paragraph>CurrentBreakpoint:</Paragraph>
    <ShowBelow breakpoint="sm">
      <Paragraph>Below Small (mobile)</Paragraph>
    </ShowBelow>
    <ShowOnlyOn breakpoint="sm">
      <Paragraph>Small (Tablet portrait)</Paragraph>
    </ShowOnlyOn>
    <ShowOnlyOn breakpoint="md">
      <Paragraph>Medium (Tablet landscape)</Paragraph>
    </ShowOnlyOn>
    <ShowOnlyOn breakpoint="lg">
      <Paragraph>Large (Desktop landscape)</Paragraph>
    </ShowOnlyOn>
    <ShowOnlyOn breakpoint="xl">
      <Paragraph>XL Large (Desktop landscape)</Paragraph>
    </ShowOnlyOn>
  </Box>
);

const BreakpointSelector = ({ selected, onSelect }) => (
  <>
    <CurrentBreakpoint />
    <Tabs selected={selected} onSelect={onSelect}>
      <Tab name="sm">small</Tab>
      <Tab name="md">medium</Tab>
      <Tab name="lg">large</Tab>
      <Tab name="xl">XL</Tab>
    </Tabs>
  </>
);

export const HideBelowBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={breakpoint} />
      <HideBelow breakpoint={breakpoint}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </HideBelow>
    </>
  );
};

export const HideAboveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={breakpoint} />
      <HideAbove breakpoint={breakpoint}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </HideAbove>
    </>
  );
};

export const HideOnlyOnBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={breakpoint} />
      <HideOnlyOn breakpoint={breakpoint}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </HideOnlyOn>
    </>
  );
};
