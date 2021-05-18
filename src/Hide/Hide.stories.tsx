import React, { useState } from 'react';
import { Tab, Tabs } from '../Tabs';
import { Breakpoint } from '../theme/breakpoints';
import { Paragraph } from '../Typography';
import { HideBelow, HideAbove, HideOnlyOn } from './Hide';

export default {
  title: 'Hide',
};

const BreakpointSelector = ({ selected, onSelect }) => (
  <Tabs selected={selected} onSelect={onSelect}>
    <Tab name="sm">small</Tab>
    <Tab name="md">medium</Tab>
    <Tab name="lg">large</Tab>
    <Tab name="xl">XL</Tab>
  </Tabs>
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
