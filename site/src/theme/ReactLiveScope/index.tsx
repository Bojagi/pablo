import React from 'react';
import * as Pablo from '@bojagi/pablo';
import { css } from '@emotion/react';
import * as ReactFeather from 'react-feather';

// Add react-live imports you need here
const ReactLiveScope: unknown = {
  React,
  ...ReactFeather,
  ...Pablo,
  ...React,
  css,
};

export default ReactLiveScope;
