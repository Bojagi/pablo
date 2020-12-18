import React from "react";
import { Tab } from "./Tab";
import { Tabs } from "./Tabs";

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

