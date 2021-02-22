import React from 'react';
import { Box } from '../Box';
import { ToastCard } from './ToastCard';

export default {
  title: 'ToastCard',
};

const BaseStory = (args) => (
  <Box>
    <ToastCard mb={2} closable {...args} />
    <ToastCard
      description="Additional text to show when stuff needs to be explained in more detail"
      {...args}
    />
  </Box>
);

export const NoType = BaseStory.bind(null);
NoType.args = {
  title: 'This is a generic message!',
};

export const Error = BaseStory.bind(null);
Error.args = {
  type: 'error',
  title: 'This is an error!',
};

export const Warning = BaseStory.bind(null);
Warning.args = {
  type: 'warning',
  title: 'This is a warning!',
};

export const Info = BaseStory.bind(null);
Info.args = {
  type: 'info',
  title: 'I just want to inform you that ...',
};

export const Success = BaseStory.bind(null);
Success.args = {
  type: 'success',
  title: 'You made it!',
};
