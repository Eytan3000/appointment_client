import {
  Button,
  Input,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../../context/AuthContext';
import { createNewClient } from '../../../../../utils/http';
import { Alert } from '@mui/joy';
import { clientSignal } from '../AddAppointment';
import { Dispatch, FormEvent, useRef } from 'react';
import { AxiosError } from 'axios';

export default function AddNewClientModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;

  const queryClient = useQueryClient();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  // tanstack
  const { mutate, isPending, isSuccess, data, isError, error } = useMutation({
    mutationFn: createNewClient,
    onSuccess: (clientId) => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });

      clientSignal.value = {
        // creating signal with: id(appointment need id of client), name + phone(to show in the client card)
        id: clientId,
        Name: nameRef.current?.value,
        phone: phoneRef.current?.value,
      };

      setOpen(false);
    },
  });

  let errorMessage = null;

  if (isError) {
    if (error instanceof AxiosError) {
      if (error.response?.status === 404) {
        errorMessage = `There's a problem with adding new clients at the moment`;
      } else if (error.response?.status === 400) {
        errorMessage = error.response.data.error[0].msg;
      }
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameRef?.current?.value || '';
    const phone = phoneRef?.current?.value || '';
    const email = emailRef?.current?.value || '';
    if (uid) mutate({ name, phone, email, uid });
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog layout={'center'}>
        <div style={{ marginBlock: '1rem' }}>
          <ModalClose />
        </div>

        <div style={{ marginInline: '2rem', height: '50vh' }}>
          <Typography textAlign={'center'} level="h4">
            Add New Client
          </Typography>
          <div />
          <form onSubmit={handleSubmit}>
            <Stack spacing={3} mt={6} height="100%" display={'flex'}>
              <Input
                required
                slotProps={{ input: { ref: nameRef } }}
                type="text"
                placeholder="Name"
              />
              <Input
                required
                slotProps={{ input: { ref: phoneRef } }}
                type="tel"
                placeholder="Phone"
              />
              <Input
                required
                slotProps={{ input: { ref: emailRef } }}
                type="email"
                placeholder="email"
              />
              {isSuccess && <Alert color="success">{data}</Alert>}
              {isError && <Alert color="danger">{errorMessage}</Alert>}
              <Button type="submit" loading={isPending}>
                Save
              </Button>
            </Stack>
          </form>
        </div>
      </ModalDialog>
    </Modal>
  );
}
