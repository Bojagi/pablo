import React from 'react';
import { Bold, Italic, Crop, Edit, Underline } from 'react-feather';
import { Toolbar } from './Toolbar';
import { ToolbarDivider } from './ToolbarDivider';
import { ToolbarItem } from './ToolbarItem';

export default {
  title: 'Toolbar',
};

export const SimpleToolbar = () => {
  const [selectedTool, setSelectedTool] = React.useState('bold');
  return (
    <Toolbar selected={selectedTool}>
      <ToolbarItem name="bold" onClick={setSelectedTool} icon={<Bold size={20} />} />
      <ToolbarItem name="underline" onClick={setSelectedTool} icon={<Underline size={20} />} />
      <ToolbarItem name="italic" onClick={setSelectedTool} icon={<Italic size={20} />} />
      <ToolbarDivider />
      <ToolbarItem name="edit" onClick={setSelectedTool} icon={<Edit size={20} />} />
      <ToolbarItem name="crop" onClick={setSelectedTool} icon={<Crop size={20} />} />
    </Toolbar>
  );
};
