import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getClient, updateClient } from '../../../../utils/http';
import BackArrow from '../../../utilsComponents/BackArrow';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Input,
  Stack,
  Typography,
} from '@mui/joy';
import { copyToClipboard } from '../../../../utils/helperFunctions';
import { SyntheticEvent, useRef } from 'react';
import { useAuth } from '../../../../context/AuthContext';

export default function ClientEdit() {
  const { clientId } = useParams();
  // const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isMobile } = useAuth();

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['client'],
    queryFn: () => getClient(clientId!),
  });

  const {
    mutate,
    isPending,
    isSuccess,
    isError: mutateError,
  } = useMutation({
    mutationFn: updateClient,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['client', 'clients'],
        // refetchType: 'none',
        // refetchType: 'active',
      });
      console.log('success');
      // navigate('/settings');
    },
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent={'center'}
        height={'50vh'}
        alignItems={'center'}>
        <CircularProgress />
      </Box>
    );
  }
  if (isError) {
    return (
      <>
        <BackArrow />

        <div
          style={{ marginInline: '2rem', height: '10vh', marginTop: '-1rem' }}>
          <Typography textAlign={'center'} level="h4">
            Client
          </Typography>
        </div>
        <Alert color="danger">
          {' '}
          We couldn't find this client at the moment{' '}
        </Alert>
      </>
    );
  }

  if (data) {
    const { Name, phone, email } = data[0];
    return (
      <>
        <Container>
          <BackArrow />

          <div
            style={{
              marginInline: 'auto',
              height: '80vh',
              marginTop: '-1rem',
              width: isMobile ? '' : '30vw',
            }}>
            <Typography textAlign={'center'} level="h4">
              Edit client details
            </Typography>
            <div />
            {/* <form onSubmit={(e) => handleSubmit(e, Name, phone, email)}> */}
            <form onSubmit={handleSubmit}>
              <Stack
                spacing={4}
                mt={6}
                height="100%"
                display={'flex'}
                minHeight={'70vh'}>
                <Box display="flex" justifyContent={'space-between'}>
                  <Input
                    defaultValue={Name}
                    slotProps={{ input: { ref: nameRef } }}
                    type="text"
                    // placeholder="Name"
                    // disabled
                  />
                  <Button
                    disabled
                    variant="soft"
                    onClick={() => copyToClipboard(Name)}>
                    Copy
                  </Button>
                </Box>

                <Box display="flex" justifyContent={'space-between'}>
                  <Input
                    defaultValue={phone}
                    slotProps={{ input: { ref: phoneRef } }}
                    type="tel"
                    // disabled
                  />
                  <Button
                    disabled
                    variant="soft"
                    onClick={() => copyToClipboard(phone)}>
                    Copy
                  </Button>
                </Box>

                <Box display="flex" justifyContent={'space-between'}>
                  <Input
                    defaultValue={email}
                    slotProps={{ input: { ref: emailRef } }}
                    type="email"
                    // disabled
                  />
                  <Button
                    disabled
                    variant="soft"
                    onClick={() => copyToClipboard(email)}>
                    Copy
                  </Button>
                </Box>

                <Stack style={{ marginTop: 'auto' }} spacing={2}>
                  {isSuccess && (
                    <Alert color="success">Client updated successfully!</Alert>
                  )}
                  {mutateError && (
                    <Alert color="danger">
                      Couldn't update client. Try again later.
                    </Alert>
                  )}
                  <Button type="submit" loading={isPending}>
                    Save
                  </Button>
                </Stack>
              </Stack>
            </form>
          </div>
        </Container>
      </>
    );
  }

  //functions
  function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const name = nameRef?.current?.value || '';
    const phone = phoneRef?.current?.value || '';
    const email = emailRef?.current?.value || '';

    mutate({ name, phone, email, clientId });
  }
}
