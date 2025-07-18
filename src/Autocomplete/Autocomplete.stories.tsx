import React, { useEffect, useState } from 'react';

import { Autocomplete } from './Autocomplete';
import { Input } from '../Input';
import { Box } from '../Box';
import { Body } from '../Typography';
import { DropdownListItem } from '../DropdownList/types';

export default {
  title: 'Autocomplete',
};

const filterFn = (item: Game, searchTerm: string) => {
  return (
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.system.toLowerCase().includes(searchTerm.toLowerCase())) &&
    searchTerm.toLowerCase() !== item.name.toLowerCase()
  );
};

const render = ({ value }) => {
  return (
    <Box>
      <Body inline>{value.name}</Body>
      <Body inline small textColor="gray.300">
        {value.system}
      </Body>
    </Box>
  );
};

const ControlledInput = ({ child, filter, ...props }) => {
  const [value, setValue] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (value) {
      setSearchTerm(value.name);
    } else {
      setSearchTerm('');
    }
  }, [value]);
  return (
    <Autocomplete
      showOnEmpty
      renderItem={render}
      filterTerm={searchTerm}
      itemFilter={filter || (() => true)}
      items={items}
      onChange={setValue}
    >
      {child({ ...props, item: value, setItem: setValue, searchTerm, setSearchTerm })}
    </Autocomplete>
  );
};

interface Game {
  name: string;
  system: string;
}

const items: DropdownListItem<Game>[] = [
  {
    key: 'final-fantasy-vi',
    value: {
      name: 'Final Fantasy VI',
      system: 'SNES',
    },
  },
  {
    key: 'final-fight',
    value: {
      name: 'Final Fight',
      system: 'SNES',
    },
  },
  {
    key: 'super-mario-bros-3',
    value: {
      name: 'Super Mario Bros. 3',
      system: 'NES',
    },
  },
  {
    key: 'the-legend-of-zelda-ocarina-of-time',
    value: {
      name: 'The Legend of Zelda: Ocarina of Time',
      system: 'N64',
    },
  },
  {
    key: 'the-legend-of-zelda-a-link-to-the-past',
    value: {
      name: 'The Legend of Zelda: A Link to the Past',
      system: 'SNES',
    },
  },
  {
    key: 'portal-2',
    value: {
      name: 'Portal 2',
      system: 'PC',
    },
  },
  {
    key: 'metal-gear-solid',
    value: {
      name: 'Metal Gear Solid',
      system: 'PS1',
    },
  },
  {
    key: 'tony-hawk-pro-skater-2',
    value: {
      name: 'Tony Hawk Pro Skater 2',
      system: 'multi system',
    },
  },
];

const baseStory = (args) => <ControlledInput {...args} />;

export const SimpleAutocomplete = baseStory.bind(null);
SimpleAutocomplete.args = {
  filter: filterFn,
  child: ({ searchTerm, setSearchTerm }) => {
    return <Input value={searchTerm} onChange={setSearchTerm} label="Search games" />;
  },
};
