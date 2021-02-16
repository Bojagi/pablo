import React from 'react';
import { Subtitle } from '../Typography';
import { Link } from './Link';

export default {
  title: 'Link',
};

export const SimpleLink = () => (
  <Subtitle>
    <Link href="https://bojagi.io" target="_blank">
      Go to Bojagi
    </Link>
  </Subtitle>
);
