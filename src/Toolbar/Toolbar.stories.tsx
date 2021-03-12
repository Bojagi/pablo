import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Bold, Italic, Crop, Edit, Underline, ArrowLeft } from 'react-feather';
import { Toolbar } from './Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarItem } from './ToolbarItem';

export default {
  title: 'Toolbar',
};

export const SimpleToolbar = () => {
  const [selectedTool, setSelectedTool] = React.useState('bold');
  const [undoDisabled, setUndoDisabled] = React.useState(false);
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
