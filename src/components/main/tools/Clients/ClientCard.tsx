import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { getClient } from '../../../../utils/http';
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
import { useAuth } from '../../../../context/AuthContext';

export default function ClientCard() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const { isMobile } = useAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['client'],
    queryFn: () => getClient(clientId!),
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
          style={{ marginInline: 'auto', height: '80vh', marginTop: '-1rem', width: isMobile ? '' : '30vw',}}>
          <Typography textAlign={'center'} level="h4">
            Client
          </Typography>
          <div />
          <form
          >
            <Stack
              spacing={4}
              mt={6}
              height="100%"
              display={'flex'}
              minHeight={'70vh'}>
              <Box display="flex" justifyContent={'space-between'}>
                <Input
                  defaultValue={Name}
                  type="text"
                  disabled
                />
                <Button variant="soft" onClick={() => copyToClipboard(Name)}>
                  Copy
                </Button>
              </Box>

              <Box display="flex" justifyContent={'space-between'}>
                <Input
                  defaultValue={phone}
                  type="tel"
                  disabled
                />
                <Button variant="soft" onClick={() => copyToClipboard(phone)}>
                  Copy
                </Button>
              </Box>

              <Box display="flex" justifyContent={'space-between'}>
                <Input
                  defaultValue={email}
                  type="email"
                  disabled
                />
                <Button variant="soft" onClick={() => copyToClipboard(email)}>
                  Copy
                </Button>
              </Box>

              <Button
                type="submit"
                style={{ marginTop: 'auto' }}
                onClick={() => navigate('../client-edit/' + clientId)}>
                Edit
              </Button>
            </Stack>
          </form>
        </div>
        </Container>
      </>
    );
  }
}
