import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { X } from 'react-feather';
import { Button } from '../Button';
import { ButtonBar } from '../ButtonBar/ButtonBar';
import { IconButton } from '../IconButton';
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
      <X onClick={onClose} size={24} />
    </IconButton>
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
  topRightItem: ({ onClose }) => <X onClick={onClose} size={24} />,
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
