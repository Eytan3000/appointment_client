
import { Modal, Sheet } from '@mui/joy';
import React from 'react';
import CreateAccount from './CreactAccount';

export default function CreateAccountModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Sheet
        variant="outlined"
        sx={{
          width: '20vw',
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}>
        <CreateAccount />
      </Sheet>
    </Modal>
  );
}
