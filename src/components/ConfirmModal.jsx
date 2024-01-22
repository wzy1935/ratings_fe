import { Card, Image, Text, Badge, Title, Button, Group, Rating, Stack, Modal, Textarea } from '@mantine/core';

function ConfirmModal({ children, opened, setOpened, onConfirm }) {

  return (
    <Modal
      opened={opened}
      onClose={() => setOpened(false)}
      title={<Title order={3} className="text-center w-full">Confirm your action</Title>}
    >
      <div className=''>{ children }</div>
      <Group justify="flex-end" className='p-4'>
        <Button onClick={() => setOpened(false)}>Cancel</Button>
        <Button onClick={() => {onConfirm(); setOpened(false)}} color="red">
          Confirm
        </Button>
      </Group>
    </Modal>
  );
}

export default ConfirmModal;