import { Modal, Sheet } from '@mui/joy';
import React from 'react';
import SignIn from './SignIn';
import ForgotPassword from '../forgotPassword/ForgotPassword';

export default function SignInModal({
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
        <SignIn />
      </Sheet>
    </Modal>
  );
}
