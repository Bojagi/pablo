import React from 'react';
import { Box } from '../Box';
import { Typography } from './Typography';

export default {
  title: 'Typography',
};

export const All = () => (
  <Box mb={4}>
    <Typography variant="headline">Headline</Typography>
    <Typography variant="title">Title</Typography>
    <Typography variant="subtitle">Subtitle</Typography>
    <Typography variant="paragraph">Paragraph</Typography>
    <Typography variant="paragraphBold">Paragraph Bold</Typography>
    <Typography variant="info">Info Text</Typography>
    <Typography variant="infoBold">Info Text Bold</Typography>
    <Typography variant="button">Button</Typography>
  </Box>
);

export const Inline = () => (
  <Box mb={4}>
    <Typography inline variant="headline">
      Headline
    </Typography>
    <Typography inline variant="title">
      Title
    </Typography>
    <Typography inline variant="subtitle">
      Subtitle
    </Typography>
    <Typography inline variant="paragraph">
      Paragraph
    </Typography>
    <Typography inline variant="paragraphBold">
      Paragraph Bold
    </Typography>
    <Typography inline variant="info">
      Info Text
    </Typography>
    <Typography inline variant="infoBold">
      Info Text Bold
    </Typography>
    <Typography inline variant="button">
      Button
    </Typography>
  </Box>
);

export const ColoredTypography = () => (
  <Box mb={4}>
    <Typography mb={4} textColor="brand.main" variant="headline">
      Headline
    </Typography>
    <Typography mb={4} textColor="positive.main" variant="title">
      Title
    </Typography>
    <Typography mb={4} textColor="negative.main" variant="subtitle">
      Subtitle
    </Typography>
    <Typography mb={4} textColor="positive.dark" variant="paragraph">
      Paragraph
    </Typography>
    <Typography mb={4} textColor="positive.light" variant="paragraphBold">
      Paragraph Bold
    </Typography>
    <Typography mb={4} textColor="brand.light" variant="info">
      Info Text
    </Typography>
    <Typography mb={4} textColor="brand.dark" variant="infoBold">
      Info Text Bold
    </Typography>
    <Typography mb={4} textColor="neutral.dark" variant="button">
      Button
    </Typography>
  </Box>
);
