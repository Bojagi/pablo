import React from 'react';

import { Table } from './Table';
import { Box, Flex } from '../Box';
import { Body } from '../Typography';

export default {
  title: 'Table',
};

const defaultContent = [
  {
    game: 'Final Fantasy VI',
    year: 1994,
    platform: 'SNES',
  },
  {
    game: 'Metal Gear Solid',
    year: 1998,
    platform: 'PS1',
  },
  {
    game: 'The Legend of Zelda: Ocarina of Time',
    year: 1998,
    platform: 'N64',
  },
];

const BaseStory = ({ content = defaultContent, withHeader = true }) => {
  return (
    <Flex center width="80vw" gap={2}>
      <Table>
        {withHeader && (
          <Table.Header>
            <Table.Row>
              <Table.Column>Game</Table.Column>
              <Table.Column>Year</Table.Column>
              <Table.Column>Platform</Table.Column>
            </Table.Row>
          </Table.Header>
        )}
        <Table.Body>
          {content.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{item.game}</Table.Cell>
              <Table.Cell>{item.year}</Table.Cell>
              <Table.Cell>{item.platform}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Flex>
  );
};

export const SimpleTable = BaseStory.bind(null);

export const WithoutHeader = BaseStory.bind(null);
WithoutHeader.args = {
  withHeader: false,
};

export const ComponentContentTable = BaseStory.bind(null);
ComponentContentTable.args = {
  content: [
    {
      game: (
        <Box>
          <Body inline>Final Fantasy VI</Body>
          <Body inline small textColor="gray.400">
            Director: Yoshinori Kitase
          </Body>
        </Box>
      ),
      year: 1994,
      platform: 'SNES',
    },
    {
      game: (
        <Box>
          <Body inline>Metal Gear Solid</Body>
          <Body inline small textColor="gray.400">
            Director: Hideo Kojima
          </Body>
        </Box>
      ),
      year: 1998,
      platform: 'PS1',
    },
    {
      game: (
        <Box>
          <Body inline>The Legend of Zelda: Ocarina of Time</Body>
          <Body inline small textColor="gray.400">
            Director: Shigeru Miyamoto
          </Body>
        </Box>
      ),
      year: 1998,
      platform: 'N64',
    },
  ],
};
