import styled from '@emotion/styled';
import React from 'react';
import { componentPrimitive, getPrimitiveStyle } from '../styleHelpers';
import { Body } from '../Typography';
import { useComponentStyle } from '../theme';

const padding = getPrimitiveStyle('padding');
const backgroundColor = getPrimitiveStyle('backgroundColor');
const borderWidth = getPrimitiveStyle('borderWidth');
const borderColor = getPrimitiveStyle('borderColor');
const borderOffset = getPrimitiveStyle('borderOffset');
const borderRadius = getPrimitiveStyle('borderRadius');
const fontWeight = getPrimitiveStyle('fontWeight');

const borderStyles = (props) => `
  * > &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    height: ${borderWidth(props)};
    width: 100%;
    background: ${borderColor(props)};
  }

  *:last-of-type > &:after {
    width: calc(100% - ${borderOffset(props)});
  }
  &:first-of-type > &:after {
    left: ${borderOffset(props)};
    width: calc(100% - ${borderOffset(props)});
  }

  tr:last-of-type > * > &:after {
    content: none;
  }
`;

const Thead = componentPrimitive(['table', 'header'], { tag: 'thead' })`
  background-color: ${backgroundColor};
`;

const TableHeader = (props) => {
  return <Thead {...props}>{props.children}</Thead>;
};

const TableBody = styled.tbody``;

const Tr = styled.tr``;

const TableRow = (props) => {
  return <Tr {...props}>{props.children}</Tr>;
};

const TableCellDiv = componentPrimitive(['table', 'body'])`
  padding: ${padding};
  padding-bottom: calc(${padding} + ${borderWidth});
  font-weight: ${fontWeight};
  position: relative;
  height: 100%;
  box-sizing: border-box;

  ${borderStyles}
`;

const Td = styled.td`
  padding: 0;
`;

const createCell = (type, component, divComponent) => {
  const Component = component;
  const DivComponent = divComponent;
  return (props) => {
    const isBold = useComponentStyle(`table.${type}.isBold`, props) as unknown as boolean;
    const clonedChildren =
      typeof props.children === 'string' || typeof props.children === 'number' ? (
        <Body inline bold={isBold}>
          {props.children}
        </Body>
      ) : (
        props.children
      );
    return (
      <Component {...props}>
        <DivComponent>{clonedChildren}</DivComponent>
      </Component>
    );
  };
};

const TableCell = createCell('body', Td, TableCellDiv);

const TableColumnDiv = componentPrimitive(['table', 'header'])`
  padding: ${padding};
  padding-bottom: calc(${padding} + ${borderWidth});
  font-weight: ${fontWeight};
  position: relative;
  height: 100%;
  box-sizing: border-box;

  ${borderStyles}
`;

const Th = componentPrimitive(['table', 'header'], { tag: 'th' })`
  padding: 0;
  text-align: left;

  :first-of-type {
    border-top-left-radius: ${borderRadius};
    border-bottom-left-radius: ${borderRadius};
  }

  :last-of-type {
    border-top-right-radius: ${borderRadius};
    border-bottom-right-radius: ${borderRadius};
  }
`;

const TableColumn = createCell('header', Th, TableColumnDiv);

const StyledTable = styled.table`
  width: 100%;
  height: 1px;
  border-collapse: collapse;
  border: 0;
`;

const Table = (props) => {
  return <StyledTable {...props}>{props.children}</StyledTable>;
};

Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;
Table.Header = TableHeader;
Table.Column = TableColumn;

export { Table, TableBody, TableRow, TableCell, TableHeader, TableColumn };
