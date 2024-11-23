import React, { useState } from 'react';

import { Bold, Italic, Crop, Edit, Underline, ArrowLeft } from 'react-feather';
import { css } from '@emotion/react';
import { Toolbar } from './Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarItem } from './ToolbarItem';

export default {
  title: 'Toolbar',
};

export const SimpleToolbar = () => {
  const [selectedTool, setSelectedTool] = useState('bold');
  const [undoDisabled, setUndoDisabled] = useState(false);
  return (
    <Toolbar my={9} mx={10} selected={selectedTool}>
      <ToolbarItem
        name="bold"
        tooltip="Make text bold"
        tooltipSide="left"
        onClick={setSelectedTool}
        icon={<Bold size={20} />}
      />
      <ToolbarItem
        name="underline"
        tooltip="Underline text"
        onClick={setSelectedTool}
        icon={<Underline size={20} />}
      />
      <ToolbarItem
        name="italic"
        tooltip="Make text italic"
        tooltipSide="bottom"
        onClick={setSelectedTool}
        icon={<Italic size={20} />}
      />
      <ToolbarDivider />
      <ToolbarItem
        name="edit"
        tooltip="Edit the item"
        onClick={setSelectedTool}
        icon={<Edit size={20} />}
      />
      <ToolbarItem
        name="crop"
        tooltip="Crop image"
        tooltipSide="right"
        onClick={setSelectedTool}
        icon={<Crop size={20} />}
      />
      <ToolbarItem
        name="undo"
        tooltip="Undo"
        tooltipSide="right"
        disabled={undoDisabled}
        onClick={() => setUndoDisabled(true)}
        icon={<ArrowLeft size={20} />}
      />
    </Toolbar>
  );
};

const customToolbarItemStyles = {
  root: css`
    background-color: red;
  `,
  hover: css`
    background-color: orange;
  `,
  active: css`
    background-color: purple;
  `,
};

export const CustomStyledToolbar = () => {
  const [selectedTool, setSelectedTool] = useState('bold');
  const [undoDisabled, setUndoDisabled] = useState(false);

  return (
    <Toolbar
      my={9}
      mx={10}
      selected={selectedTool}
      customStyles={{
        root: css`
          border: 1px solid blue;
        `,
      }}
    >
      <ToolbarItem
        name="bold"
        tooltip="Make text bold"
        tooltipSide="left"
        onClick={setSelectedTool}
        icon={<Bold size={20} />}
        customStyles={customToolbarItemStyles}
      />
      <ToolbarItem
        name="underline"
        tooltip="Underline text"
        onClick={setSelectedTool}
        icon={<Underline size={20} />}
        customStyles={customToolbarItemStyles}
      />
      <ToolbarItem
        name="italic"
        tooltip="Make text italic"
        tooltipSide="bottom"
        onClick={setSelectedTool}
        icon={<Italic size={20} />}
        customStyles={customToolbarItemStyles}
      />
      <ToolbarDivider
        customStyles={{
          root: css`
            transform: rotate(45deg);
            background-color: yellow;
          `,
        }}
      />
      <ToolbarItem
        name="edit"
        tooltip="Edit the item"
        onClick={setSelectedTool}
        icon={<Edit size={20} />}
        customStyles={customToolbarItemStyles}
      />
      <ToolbarItem
        name="crop"
        tooltip="Crop image"
        tooltipSide="right"
        onClick={setSelectedTool}
        icon={<Crop size={20} />}
        customStyles={customToolbarItemStyles}
      />
      <ToolbarItem
        name="undo"
        tooltip="Undo"
        tooltipSide="right"
        disabled={undoDisabled}
        onClick={() => setUndoDisabled(true)}
        icon={<ArrowLeft size={20} />}
        customStyles={customToolbarItemStyles}
      />
    </Toolbar>
  );
};
