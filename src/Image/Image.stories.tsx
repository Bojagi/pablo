import React from 'react';
import { Image } from './Image';

export default {
  title: 'Image',
};

export const WithoutSize = () => <Image src="https://bojagi.io/images/bojagi-social-preview.jpg" />;

export const WithWidth = () => (
  <Image src="https://bojagi.io/images/bojagi-social-preview.jpg" width={200} />
);

export const WithHeight = () => (
  <Image src="https://bojagi.io/images/bojagi-social-preview.jpg" height={200} />
);
