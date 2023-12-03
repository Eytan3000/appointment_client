import { Alert, Button, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../../utilsComponents/BackArrow';
import { FormEvent, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../context/AuthContext';
import { createNewClient } from '../../../../utils/http';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddClient() {
  const queryClient = useQueryClient();
  // const navigate = useNavigate();

  const { currentUser, isMobile } = useAuth() || {};
  const uid = currentUser?.uid;

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  // tanstack
  const { mutate, isPending, isSuccess, data, isError, error } = useMutation({
    mutationFn: createNewClient,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'], exact: true });

      // Reset the input fields
      if (nameRef.current) {
        nameRef.current.value = '';
      }
      if (phoneRef.current) {
        phoneRef.current.value = '';
      }
      if (emailRef.current) {
        emailRef.current.value = '';
      }
    },
  });

  let errorMessage = null;

  if (isError) {
    if (error.response.status === 404) {
      errorMessage = `There's a problem with adding new clients at the moment`;
    } else if (error.response.status === 400) {
      errorMessage = error.response.data.error[0].msg;
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
    <>
      {isMobile ? <BackArrow /> : <div style={{ height: '2rem' }} />}

      <div style={{ marginInline: '2rem', height: '90vh' }}>
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
            {isSuccess && (
              <Alert color="success">Client Added Successfully</Alert>
            )}
            {isError && <Alert color="danger">{errorMessage}</Alert>}
            <Button type="submit" loading={isPending}>
              Save
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
