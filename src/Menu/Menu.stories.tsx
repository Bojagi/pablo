import React, { useCallback, useState } from 'react';
import { Button } from '../Button';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

export default {
  title: 'Menu',
  parameters: {
    layout: 'centered',
  },
};

const BaseStory = (args) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Menu
      open={open}
      offset={-5}
      onClose={handleClose}
      items={[
        <MenuItem onClick={handleClose}>User Profile</MenuItem>,
        <MenuItem onClick={handleClose}>Settings</MenuItem>,
        <MenuItem onClick={handleClose}>Logout</MenuItem>,
      ]}
      {...args}
    >
      <Button onClick={() => setOpen(!open)}>Hello</Button>
    </Menu>
  );
};

export const BottomEnd = BaseStory.bind(null);
BottomEnd.args = {
  placement: 'bottom-end',
};

export const BottomStart = BaseStory.bind(null);
BottomStart.args = {
  placement: 'bottom-start',
};

export const Bottom = BaseStory.bind(null);
Bottom.args = {
  placement: 'bottom',
};

export const TopEnd = BaseStory.bind(null);
TopEnd.args = {
  placement: 'top-end',
};

export const TopStart = BaseStory.bind(null);
TopStart.args = {
  placement: 'top-start',
};

export const Top = BaseStory.bind(null);
Top.args = {
  placement: 'top',
};

export const RightStart = BaseStory.bind(null);
RightStart.args = {
  placement: 'right-start',
};

export const RightEnd = BaseStory.bind(null);
RightEnd.args = {
  placement: 'right-end',
};

export const Right = BaseStory.bind(null);
Right.args = {
  placement: 'right',
};

export const Left = BaseStory.bind(null);
Left.args = {
  placement: 'left',
};

export const LeftStart = BaseStory.bind(null);
LeftStart.args = {
  placement: 'left-start',
};

export const LeftEnd = BaseStory.bind(null);
LeftEnd.args = {
  placement: 'left-end',
};
