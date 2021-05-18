import React, { useState } from 'react';
import { Tab, Tabs } from '../Tabs';
import { Breakpoint } from '../theme/breakpoints';
import { Paragraph } from '../Typography';
import { ShowBelow, ShowAbove, ShowOnlyOn } from './Show';

export default {
  title: 'Show',
};

const BreakpointSelector = ({ selected, onSelect }) => (
  <Tabs selected={selected} onSelect={onSelect}>
    <Tab name="sm">small</Tab>
    <Tab name="md">medium</Tab>
    <Tab name="lg">large</Tab>
    <Tab name="xl">XL</Tab>
  </Tabs>
);

export const ShowBelowViewport = () => {
  const [bp, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={bp} />
      <ShowBelow breakpoint={bp}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </ShowBelow>
    </>
  );
};

export const ShowAboveViewport = () => {
  const [bp, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={bp} />
      <ShowAbove breakpoint={bp}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </ShowAbove>
    </>
  );
};

export const ShowOnlyOnViewport = () => {
  const [bp, setBreakpoint] = useState<Breakpoint>('md');
  return (
    <>
      <BreakpointSelector onSelect={setBreakpoint} selected={bp} />
      <ShowOnlyOn breakpoint={bp}>
        <Paragraph bgColor="red">Change screen size to hide me</Paragraph>
      </ShowOnlyOn>
    </>
  );
};
