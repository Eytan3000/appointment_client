
import BackArrow from '../../../utilsComponents/BackArrow';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../context/AuthContext';
import { getAllOwnersClients } from '../../../../utils/http';
import { Alert, Card, CircularProgress, Stack, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';

interface Client {
  Name: string;
  id: number;
}

export default function ClientsTable() {
  const navigate = useNavigate();
  const { currentUser, isMobile } = useAuth() || {};
  const uid = currentUser?.uid;

  // -- Tanstack Query --
  const { data, isPending, isError } = useQuery({
    queryKey: ['clients'],
    queryFn: () => getAllOwnersClients(uid!),
    enabled: !!currentUser,
  });
  let queryData;

  if (data) {
    queryData = data.map((client: Client) => {
      console.log(client);
      return (
        <div key={client.id} onClick={() => handleCardClick(client.id)}>
          <Card sx={{cursor:'pointer'}}>{client.Name}</Card>
        </div>
      );
    });
  }
  if (isPending) {
    queryData = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '50vh',
          alignItems: 'center',
        }}>
        <CircularProgress size="lg" />;
      </div>
    );
  }

  function handleCardClick(clientId: number) {
    navigate('/tools/client-card/' + clientId);
  }
  return (
    <>
      {isMobile ? <BackArrow /> : <div style={{ height: '2rem' }} />}

      <Typography
        sx={{ display: 'flex', justifyContent: 'center', mb: '1rem' }}
        level="h3">
        Clients
      </Typography>

      <Stack spacing={2}>
        {isError && <Alert color="danger">We're experiencing a problem</Alert>}
        {queryData}
      </Stack>

    </>
  );
}
