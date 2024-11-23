import React from 'react';

import { MoreHorizontal, X } from 'react-feather';
import { css } from '@emotion/react';
import { Button } from '../Button';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { IconButton } from '../IconButton';
import { getComponentStyle, getSpacing } from '../styleHelpers';
import { PabloThemeProvider } from '../theme';
import { Paragraph } from '../Typography';
import { Modal } from './Modal';

export default {
  title: 'Modal',
};

const TextContent = () => (
  <Paragraph>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </Paragraph>
);

const ModalButtonBar = ({ setOpen }) => (
  <ButtonBar>
    <Button size="medium" color="plain" variant="primary" onClick={() => setOpen(false)}>
      Cancel
    </Button>
    <Button size="medium" onClick={() => setOpen(false)}>
      Done
    </Button>
  </ButtonBar>
);

const BaseStory = ({ additionalBody: AdditionalBody, ...args }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>open modal</Button>
      <Modal onClose={() => setOpen(false)} open={open} {...args}>
        <TextContent />
        {AdditionalBody && <AdditionalBody setOpen={setOpen} />}
      </Modal>
    </>
  );
};

export const SimpleModal = BaseStory.bind(null);
SimpleModal.args = {
  title: 'Hallo',
};

export const ModalWithButtons = BaseStory.bind(null);
ModalWithButtons.args = {
  title: 'Hallo',
  additionalBody: ModalButtonBar,
};

export const WithTopRightItem = BaseStory.bind(null);
WithTopRightItem.args = {
  title: 'Hallo',
  topRightItem: ({ onClose }) => (
    <IconButton size="medium">
      <X onClick={onClose} />
    </IconButton>
  ),
  additionalBody: ModalButtonBar,
};

export const WithMultipleTopRightItems = BaseStory.bind(null);
WithMultipleTopRightItems.args = {
  title: 'Hallo',
  topRightItem: ({ onClose }) => (
    <ButtonBar>
      <IconButton size="medium">
        <MoreHorizontal />
      </IconButton>
      <IconButton size="medium" onClick={onClose}>
        <X />
      </IconButton>
    </ButtonBar>
  ),
  additionalBody: ModalButtonBar,
};

export const WithoutTitle = BaseStory.bind(null);
WithoutTitle.args = {
  additionalBody: ModalButtonBar,
};

export const WithAdditionalPanes = BaseStory.bind(null);
WithAdditionalPanes.args = {
  title: 'Hallo',
  topRightItem: ({ onClose }) => (
    <IconButton size="medium">
      <X onClick={onClose} />
    </IconButton>
  ),
  additionalPanes: [
    <>
      <TextContent />
      <TextContent />
      <TextContent />
    </>,
    <Paragraph mb={0}>Goodbye</Paragraph>,
    <Paragraph mb={0}>I am the Walrus</Paragraph>,
  ],
  additionalBody: ModalButtonBar,
};

export const WithCustomStyles = BaseStory.bind(null);
WithCustomStyles.args = {
  title: 'Hallo',
  topRightItem: ({ onClose }) => (
    <IconButton size="medium">
      <X onClick={onClose} />
    </IconButton>
  ),
  additionalPanes: [
    <>
      <TextContent />
      <TextContent />
      <TextContent />
    </>,
    <Paragraph mb={0}>Goodbye</Paragraph>,
    <Paragraph mb={0}>I am the Walrus</Paragraph>,
  ],
  additionalBody: ModalButtonBar,
  customStyles: {
    backdrop: css`
      background-color: rgba(0, 0, 255, 0.2);
    `,
    box: css`
      border: 5px solid red;
    `,
    area: (props) => css`
      background-color: rgba(0, 0, 255, 0.2);
      border-radius: ${getComponentStyle('modal.box.borderRadius')(props)}px;
    `,
    paneBox: (props) => css`
      border: 5px solid blue;
      border-radius: ${getComponentStyle('modal.box.borderRadius')(props)}px;
      padding: ${getSpacing(4)(props)};
    `,
  },
};

export const WithCustomStylesFromTheme = () => {
  const [open, setOpen] = React.useState(false);
  const args = {
    title: 'Hallo',
    topRightItem: ({ onClose }) => (
      <IconButton size="medium">
        <X onClick={onClose} />
      </IconButton>
    ),
    additionalPanes: [
      <>
        <TextContent />
        <TextContent />
        <TextContent />
      </>,
      <Paragraph mb={0}>Goodbye</Paragraph>,
      <Paragraph mb={0}>I am the Walrus</Paragraph>,
    ],
    customStyles: {
      backdrop: css`
        background-color: rgba(0, 0, 255, 0.2);
      `,
      box: css`
        border: 5px solid red;
      `,
      area: (props) => css`
        background-color: rgba(0, 0, 255, 0.2);
        border-radius: ${getComponentStyle('modal.box.borderRadius')(props)}px;
      `,
      paneBox: (props) => css`
        border: 5px solid blue;
        border-radius: ${getComponentStyle('modal.box.borderRadius')(props)}px;
        padding: ${getSpacing(4)(props)};
      `,
    },
  };

  return (
    <PabloThemeProvider
      componentStyles={{
        modal: {
          styles: {
            box: css`
              padding: 200px;
            `,
          },
        },
      }}
    >
      <Button onClick={() => setOpen(true)}>open modal</Button>
      <Modal onClose={() => setOpen(false)} open={open} {...args}>
        <TextContent />
      </Modal>
    </PabloThemeProvider>
  );
};
