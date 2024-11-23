import React, { useCallback, useState } from 'react';
import { Box, Flex } from '../Box';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Input } from '../Input';
import { ToastProvider, useToast } from './ToastProvider';

export default {
  title: 'ToastProvider',
};

const Trigger = () => {
  const { addToast } = useToast();
  const [counter, setCounter] = useState(1);
  const [closable, setClosable] = useState(true);
  const [duration, setDuration] = useState(3000);

  const handleAddToast = useCallback(() => {
    addToast({
      duration,
      title: `Hello there #${counter}`,
      description: 'Something happened!',
      type: 'success',
      closable,
    });
    setCounter(counter + 1);
  }, [addToast, duration, closable, counter]);

  return (
    <Flex width="100%" height="90vh" justifyContent="center" alignItems="center">
      <Box>
        <Checkbox
          mb={4}
          label="closable"
          checked={closable}
          onChange={() => setClosable((val) => !val)}
        />
        <Input
          label="Duration"
          mb={4}
          onChange={(v) => setDuration(parseInt(v, 10) || 0)}
          value={duration}
        />
        <Button onClick={handleAddToast}>Add toast</Button>
      </Box>
    </Flex>
  );
};

const BaseStory = (args) => (
  <ToastProvider {...args}>
    <Trigger />
  </ToastProvider>
);

export const BottomRight = BaseStory.bind(null);
BottomRight.args = {
  side: 'bottom-right',
};

export const BottomLeft = BaseStory.bind(null);
BottomLeft.args = {
  side: 'bottom-left',
};

export const TopRight = BaseStory.bind(null);
TopRight.args = {
  side: 'top-right',
};

export const TopLeft = BaseStory.bind(null);
TopLeft.args = {
  side: 'top-left',
};
