import React from 'react';
import { Typography } from './Typography';

export default {
  title: 'Typography',
};

export const All = () => (
  <>
    <div style={{ marginBottom: 8 }}>
      <Typography variant="headline">Headline</Typography>
      <Typography variant="title">Title</Typography>
      <Typography variant="subtitle">Subtitle</Typography>
      <Typography variant="paragraph">Paragraph</Typography>
      <Typography variant="paragraphBold">Paragraph Bold</Typography>
      <Typography variant="info">Info Text</Typography>
      <Typography variant="infoBold">Info Text Bold</Typography>
      <Typography variant="button">Button</Typography>
    </div>
  </>
);

export const ColoredTypography = () => (
  <>
    <div style={{ marginBottom: 8 }}>
      <Typography mb={1} color="brand.main" variant="headline">
        Headline
      </Typography>
      <Typography mb={1} color="positive.main" variant="title">
        Title
      </Typography>
      <Typography mb={1} color="negative.main" variant="subtitle">
        Subtitle
      </Typography>
      <Typography mb={1} color="positive.dark" variant="paragraph">
        Paragraph
      </Typography>
      <Typography mb={1} color="positive.light" variant="paragraphBold">
        Paragraph Bold
      </Typography>
      <Typography mb={1} color="brand.light" variant="info">
        Info Text
      </Typography>
      <Typography mb={1} color="brand.dark" variant="infoBold">
        Info Text Bold
      </Typography>
      <Typography mb={1} color="neutral.dark" variant="button">
        Button
      </Typography>
    </div>
  </>
);
