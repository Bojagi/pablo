import React from "react";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";
import { BookOpen, GitPullRequest, Settings } from 'react-feather';

export default {
  title: 'Tabs',
};

export const TabsWithStaticActive = () => (
  <Tabs>
    <Tab name="first" active>First tab</Tab>
    <Tab name="second">Second tab</Tab>
  </Tabs>
)

export const TabsWithSelectedProp = () => (
  <Tabs selected="second">
    <Tab name="first">First tab</Tab>
    <Tab name="second">Second tab</Tab>
    <Tab name="third">Third tab</Tab>
  </Tabs>
)

export const TabsWithIcons = () => (
  <Tabs selected="second">
    <Tab name="first" icon={<BookOpen size={16} />}>First tab</Tab>
    <Tab name="second" icon={<GitPullRequest size={16} />}>Second tab</Tab>
    <Tab name="third" icon={<Settings size={16} />}>Third tab</Tab>
  </Tabs>
)

