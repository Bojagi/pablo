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

export const ExampleText = () => (
  <Box mb={4} mx="auto" maxWidth="1000px">
    <Box mx={4}>
      <Typography variant="headline">Bojagi (보자기)</Typography>
      <Typography variant="title">Documentation</Typography>
      <Typography variant="paragraph">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus nec ligula sit amet metus
        pellentesque porttitor non porta velit. Nulla feugiat vestibulum nisl non bibendum.
        Suspendisse condimentum leo quis nisl condimentum, ut viverra sem placerat. Quisque at sem
        eget odio ullamcorper vulputate. Suspendisse et nisl at ipsum congue tempus. Aliquam
        ultricies tellus quis est bibendum, et volutpat elit pretium. Sed euismod nisl ut dui
        sollicitudin blandit. Donec fringilla nisi est, quis elementum odio consequat et. Ut quis
        neque mauris. Morbi et nulla nec velit interdum fermentum efficitur at purus. Donec quis
        bibendum turpis. Nullam euismod tortor vel ipsum rhoncus, interdum feugiat lorem aliquet.
        Suspendisse rutrum feugiat dictum.
      </Typography>
      <Typography variant="paragraph">
        Integer odio sem, volutpat a efficitur quis, ornare a arcu. Vestibulum porta id eros in
        pulvinar. Integer in mollis metus, non ornare neque. Morbi porttitor vitae sem ut ornare.
        Nullam aliquet leo sit amet arcu maximus blandit id nec nisi. Aliquam pretium erat vitae
        ipsum malesuada consequat. Maecenas dignissim sit amet libero id venenatis. Mauris elit
        arcu, vestibulum id luctus nec, dapibus at tortor. Nullam eget lectus lacus. Donec semper
        sagittis tellus ac convallis. Fusce iaculis posuere porta.
      </Typography>
      <Typography variant="subtitle">Subtitle</Typography>
      <Typography variant="paragraph">
        Phasellus mollis libero risus, vitae luctus turpis bibendum nec. Duis vel nunc sagittis,
        placerat orci quis, tincidunt dolor. Suspendisse in rutrum magna. Pellentesque a metus
        tincidunt, ornare diam a, varius urna. Phasellus fermentum ipsum lacus, vel vestibulum nunc
        rhoncus vel. Sed tellus sem, pharetra in odio non, scelerisque rutrum arcu. Nunc tempus
        augue nec leo sagittis, ut aliquet sapien rutrum. Praesent euismod mollis rhoncus. Maecenas
        porta condimentum facilisis. Morbi at eros nulla. Quisque congue nisi id eros auctor
        tincidunt. Vivamus aliquam eros vel ipsum sodales eleifend. Integer a iaculis sem. Sed
        elementum nulla vitae felis imperdiet, sit amet aliquam erat tempor. Nulla facilisi.
      </Typography>
      <Typography variant="info" textColor="text.info">
        The above text is Lorem Ipsum
      </Typography>
    </Box>
  </Box>
);
