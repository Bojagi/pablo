import React from 'react';
import { css } from 'styled-components';
import { Box } from '../Box';
import { Card } from '../Card';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { Title } from '../Typography';
import { StackAnimation } from './StackAnimation';

export default {
  title: 'Animation',
};

const BaseStory = (args) => {
  const [duration, setDuration] = React.useState(300);
  const [visible, setVisible] = React.useState(false);

  return (
    <Box
      flex
      css={css`
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
      `}
      alignItems="stretch"
    >
      <Box flex justifyContent="center" alignItems="center" flexGrow={1} flexBasis={0}>
        <Box mb={4}>
          <Checkbox
            mb={1}
            checked={visible}
            onChange={() => setVisible((v) => !v)}
            label="visible"
          />

          <Input
            label="Duration"
            mb={1}
            onChange={(v) => setDuration(parseInt(v, 10) || 0)}
            value={duration}
          />
        </Box>
      </Box>
      <Box
        flex
        justifyContent="center"
        alignItems="center"
        flexGrow={1}
        flexShrink={0}
        flexBasis={0}
        bgColor="gray.50"
      >
        <Box maxWidth={400} height={200}>
          <args.component duration={duration} visible={visible}>
            <Card>
              <Title>I am animated</Title>
            </Card>
          </args.component>
        </Box>
      </Box>
    </Box>
  );
};

export const Stack = BaseStory.bind(null);
Stack.args = {
  component: StackAnimation,
};
