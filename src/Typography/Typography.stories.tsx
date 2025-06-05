import React from 'react';
import { Box } from '../Box';
import { Typography } from './Typography';
import { PabloThemeProvider } from '../theme';

export default {
  title: 'Typography',
};

export const All = () => (
  <Box mb={4}>
    <Typography variant="h1">H1</Typography>
    <Typography variant="h2">H2</Typography>
    <Typography variant="h3">H3</Typography>
    <Typography variant="h4">H4</Typography>
    <Typography variant="body">Body</Typography>
    <Typography variant="body" bold>
      Body bold
    </Typography>
    <Typography variant="body" small>
      Body small
    </Typography>
    <Typography variant="body" small bold>
      Body small and bold
    </Typography>
    <Typography variant="button">Button</Typography>
    <Typography variant="button" small>
      Button small
    </Typography>
  </Box>
);

export const Inline = () => (
  <Box mb={4}>
    <Typography inline variant="h1">
      H1
    </Typography>
    <Typography inline variant="h2">
      H2
    </Typography>
    <Typography inline variant="h3">
      H3
    </Typography>
    <Typography inline variant="h4">
      H4
    </Typography>
    <Typography inline variant="body">
      Body
    </Typography>
    <Typography inline variant="body" bold>
      Body bold
    </Typography>
    <Typography inline variant="body" small>
      Body small
    </Typography>
    <Typography inline variant="body" small bold>
      Body small and bold
    </Typography>
    <Typography inline variant="button">
      Button
    </Typography>
    <Typography inline variant="button" small>
      Button small
    </Typography>
  </Box>
);

export const ColoredTypography = () => (
  <Box mb={4}>
    <Typography mb={4} textColor="brand.main" variant="h2">
      H2
    </Typography>
    <Typography mb={4} textColor="positive.main" variant="h3">
      H3
    </Typography>
    <Typography mb={4} textColor="negative.main" variant="h4">
      H4
    </Typography>
    <Typography mb={4} textColor="positive.dark" variant="body">
      Body
    </Typography>
    <Typography mb={4} textColor="positive.light" variant="body" bold>
      Body bold
    </Typography>
    <Typography mb={4} textColor="brand.light" variant="body" small>
      Body small
    </Typography>
    <Typography mb={4} textColor="brand.dark" variant="body" small bold>
      body small and bold
    </Typography>
    <Typography mb={4} textColor="neutral.dark" variant="button">
      Button
    </Typography>
    <Typography mb={4} textColor="neutral.dark" variant="button" small>
      Button small
    </Typography>
  </Box>
);

export const Override = () => {
  const theme = {
    typography: {
      h1: { fontFamily: 'Times New Roman', fontWeight: 'bold' },
      h2: { fontFamily: 'Times New Roman', fontWeight: 'bold' },
      h3: { fontFamily: 'Times New Roman', fontWeight: 'bold' },
      h4: { fontFamily: 'Times New Roman', fontWeight: 'bold' },
      body: {
        fontFamily: 'Times New Roman',
        fontWeight: 'bold',
        variants: {
          bold: { fontWeight: 'normal', fontSize: '3rem' },
          small: { fontSize: '0.875rem' },
        },
      },
      button: { fontFamily: 'Times New Roman', fontWeight: 'bold' },
    },
  };
  return (
    <PabloThemeProvider theme={theme}>
      <Box mb={4}>
        <Typography mb={4} variant="h2">
          H2
        </Typography>
        <Typography mb={4} variant="h3">
          H3
        </Typography>
        <Typography mb={4} variant="h4">
          H4
        </Typography>
        <Typography mb={4} variant="body">
          Body
        </Typography>
        <Typography mb={4} variant="body" bold>
          Body Bold
        </Typography>
        <Typography mb={4} variant="body" small>
          Body Small
        </Typography>
        <Typography mb={4} variant="button">
          Button
        </Typography>
      </Box>
    </PabloThemeProvider>
  );
};

export const ExampleText = () => (
  <Box mb={4} mx="auto" maxWidth="1100px">
    <Box mx={4}>
      <Typography variant="h1">Bojagi (보자기)</Typography>
      <Typography variant="h3">Documentation</Typography>
      <Typography variant="body">
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
      <Typography variant="body">
        Integer odio sem, volutpat a efficitur quis, ornare a arcu. Vestibulum porta id eros in
        pulvinar. Integer in mollis metus, non ornare neque. Morbi porttitor vitae sem ut ornare.
        Nullam aliquet leo sit amet arcu maximus blandit id nec nisi. Aliquam pretium erat vitae
        ipsum malesuada consequat. Maecenas dignissim sit amet libero id venenatis. Mauris elit
        arcu, vestibulum id luctus nec, dapibus at tortor. Nullam eget lectus lacus. Donec semper
        sagittis tellus ac convallis. Fusce iaculis posuere porta.
      </Typography>
      <Typography variant="h4">Subtitle</Typography>
      <Typography variant="body">
        Phasellus mollis libero risus, vitae luctus turpis bibendum nec. Duis vel nunc sagittis,
        placerat orci quis, tincidunt dolor. Suspendisse in rutrum magna. Pellentesque a metus
        tincidunt, ornare diam a, varius urna. Phasellus fermentum ipsum lacus, vel vestibulum nunc
        rhoncus vel. Sed tellus sem, pharetra in odio non, scelerisque rutrum arcu. Nunc tempus
        augue nec leo sagittis, ut aliquet sapien rutrum. Praesent euismod mollis rhoncus. Maecenas
        porta condimentum facilisis. Morbi at eros nulla. Quisque congue nisi id eros auctor
        tincidunt. Vivamus aliquam eros vel ipsum sodales eleifend. Integer a iaculis sem. Sed
        elementum nulla vitae felis imperdiet, sit amet aliquam erat tempor. Nulla facilisi.
      </Typography>
      <Typography variant="body" small textColor="text.info">
        The above text is Lorem Ipsum
      </Typography>
    </Box>
  </Box>
);
