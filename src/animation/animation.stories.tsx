import React from 'react';
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
    <Box>
      <Box mb={4}>
        <Checkbox mb={1} checked={visible} onChange={() => setVisible((v) => !v)} label="visible" />

        <Input
          label="Duration"
          mb={1}
          onChange={(v) => setDuration(parseInt(v, 10) || 0)}
          value={duration}
        />
      </Box>
      <Box maxWidth={400}>
        <args.component duration={duration} visible={visible}>
          <Card>
            <Title>I am animated</Title>
          </Card>
        </args.component>
      </Box>
    </Box>
  );
};

export const Stack = BaseStory.bind(null);
Stack.args = {
  component: StackAnimation,
};
