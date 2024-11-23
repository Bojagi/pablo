import React, { useCallback, useState } from 'react';
import { css } from '@emotion/react';
import { SlideAnimation } from '../animation/SlideAnimation';
import { Button } from '../Button';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';

export default {
  title: 'Menu',
  parameters: {
    layout: 'centered',
  },
};

const BaseStory = ({ menuItemProps, ...args }) => {
  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);

  return (
    <Menu
      open={open}
      offset={-5}
      onClose={handleClose}
      items={[
        <MenuItem key="1" onClick={handleClose} {...menuItemProps}>
          User Profile
        </MenuItem>,
        <MenuItem key="2" onClick={handleClose} {...menuItemProps}>
          Settings
        </MenuItem>,
        <MenuItem key="3" onClick={handleClose} {...menuItemProps}>
          Logout
        </MenuItem>,
      ]}
      placement="top"
      {...args}
    >
      <Button onClick={() => setOpen(!open)}>Click me</Button>
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

export const WithAnimation = BaseStory.bind(null);
WithAnimation.args = {
  placement: 'bottom-end',
  animation: SlideAnimation,
  animationProps: {
    duration: 150,
    side: 'bottom',
  },
};

export const WithCustomStyles = BaseStory.bind(null);
WithCustomStyles.args = {
  placement: 'bottom-end',
  animation: SlideAnimation,
  animationProps: {
    duration: 150,
    side: 'bottom',
  },
  menuItemProps: {
    customStyles: {
      item: css`
        background-color: blue;
      `,
      itemText: css`
        color: yellow;
      `,
    },
  },
  customStyles: {
    box: css`
      background-color: red;
    `,
    arrow: css`
      border-bottom-color: red;
    `,
  },
};
