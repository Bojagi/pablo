import React, { useRef, useState } from 'react';

import { DropdownList } from './DropdownList';
import { DropdownListItem, DropdownListItemRenderFn } from './types';
import { Box, Flex } from '../Box';
import { Body } from '../Typography';
import styled from '@emotion/styled';
import { padding } from '../Box/interpolations/spacing';
import { color } from '../Box/interpolations/color';
import { Input } from '../Input';
import { Button } from '../Button';

export default {
  title: 'DropdownList',
};

const filterFn = (item: Game, searchTerm: string) => {
  return (
    (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.system.toLowerCase().includes(searchTerm.toLowerCase())) &&
    searchTerm.toLowerCase() !== item.name.toLowerCase()
  );
};

const render = ({ item }) => {
  return (
    <Box>
      <Body inline>{item.name}</Body>
      <Body inline small textColor="gray.300">
        {item.system}
      </Body>
    </Box>
  );
};

const Wrapper = styled(Flex)`
  ${padding.all(4)};
  ${color.bgColor('gray.200')};
  min-width: 400px;
  cursor: pointer;
`;

const Component = ({ filter, items, ...props }) => {
  const [value, setValue] = useState<Game | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOpenStateChange = (open) => {
    setDropdownOpen(open);
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      });
    } else {
      inputRef.current?.blur();
      setSearchTerm('');
    }
  };
  console.log('searchTerm', searchTerm);

  return (
    <DropdownList
      showOnEmpty
      renderItem={render}
      filterTerm={searchTerm}
      itemFilter={filter}
      items={items}
      onOpenStateChange={handleOpenStateChange}
      onChange={setValue}
      {...props}
    >
      <Wrapper gap={2}>
        <Box grow>
          {(!filter || (filter && !dropdownOpen)) && <Body inline>{value?.name}</Body>}
          {filter && dropdownOpen && (
            <Input width={200} inputRef={inputRef} value={searchTerm} onChange={setSearchTerm} />
          )}
        </Box>
        <Box
          onClick={(e) => {
            e.stopPropagation();
            setValue(null);
          }}
        >
          <Body inline bold>
            clear
          </Body>
        </Box>
      </Wrapper>
    </DropdownList>
  );
};

interface Game {
  name: string;
  system: string;
}

const defaultItems: DropdownListItem<Game>[] = [
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

const baseStory = (args) => <Component items={defaultItems} {...args} />;

export const SimpleDropdownList = baseStory.bind(null);
SimpleDropdownList.args = {};

export const WithFilter = baseStory.bind(null);
WithFilter.args = { filter: filterFn };

export const NonClosingDropdownList = baseStory.bind(null);
NonClosingDropdownList.args = {
  closeOnSelect: false,
};

const customRenderer: DropdownListItemRenderFn<Game> = ({ item }) => (
  <Box bgColor="red">{item.name}</Box>
);

export const WithCustomRender = baseStory.bind(null);
WithCustomRender.args = {
  renderItem: customRenderer,
};

const CustomWrapper = styled(Flex)<{ selected?: boolean }>`
  ${padding.all(2)};
  transition: background-color 0.2s ease-in-out;
  justify-content: space-between;
  align-items: center;
  ${(props) => props.selected && `text-decoration: underline;`}
`;

const customUnwrappedRenderer: DropdownListItemRenderFn<Game> = ({ item, selected, onSelect }) => (
  <CustomWrapper selected={selected} gap={2}>
    <Body inline>
      {item.name} ({item.system})
    </Body>
    <Button size="small" onClick={onSelect}>
      select
    </Button>
  </CustomWrapper>
);

export const WithCustomUnwrappedRender = baseStory.bind(null);
WithCustomUnwrappedRender.args = {
  renderItem: customUnwrappedRenderer,
  wrapItems: false,
};

export const WithItemCustomRender = baseStory.bind(null);
WithItemCustomRender.args = {
  items: [
    ...defaultItems,
    {
      key: 'custom-item',
      value: { name: 'Custom Item', system: 'Custom System' },
      render: customRenderer,
    },
  ],
};
