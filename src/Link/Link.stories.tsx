import React from 'react';
import { css } from 'styled-components';
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

export const WithCustomStyles = () => (
  <Subtitle>
    <Link
      href="https://bojagi.io"
      target="_blank"
      customStyles={{
        root: css`
          text-decoration: underline;
        `,
        hover: css`
          background-color: red;
        `,
      }}
    >
      Hover me please
    </Link>
  </Subtitle>
);
