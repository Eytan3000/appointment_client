import {
  Alert,
  Button,
  CircularProgress,
  Container,
  Input,
  Typography,
} from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React, { useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getBusiness, updateBusiness } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';

export default function BusinessSettings() {
  // const navigate = useNavigate();

  const { currentUser, isMobile } = useAuth() || {};
  const uid = currentUser?.uid;
  const queryClient = useQueryClient();

  const [alert, setAlert] = useState({ success: false, message: '' });

  // const nameRef = useRef<HTMLInputElement | null>(null);
  // const addressRef = useRef<HTMLInputElement | null>(null);
  // const phoneRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const addressRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  // query
  const { data, isLoading } = useQuery({
    queryFn: () => getBusiness(uid!),
    queryKey: ['business', uid!],
    enabled: !!uid,
  });

  // mutate
  const { mutate, isPending, isError } = useMutation({
    mutationFn: updateBusiness,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['business'] });
      console.log('success');
      setAlert({ success: true, message: 'Business details updated' });
    },
  });
  console.log(alert);
  let form;
  if (isLoading) {
    form = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: ' 50vh',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }
  if (data) {
    form = (
      <form
        onSubmit={handleSubmit}
        style={{
          marginBlock: '2rem',
          marginLeft: '0.4rem',
          // width: '80%'
          // height: '70vh',
        }}>
        <Typography level="title-md">Business Name</Typography>
        <Input
          slotProps={{ input: { ref: nameRef } }}
          sx={{ my: '1rem' }}
          type="text"
          defaultValue={data.name}
        />

        <Typography level="title-md">Business Address</Typography>
        <Input
          slotProps={{ input: { ref: addressRef } }}
          sx={{ my: '1rem' }}
          type="text"
          defaultValue={data.address}
        />

        <Typography level="title-md">Business Phone</Typography>
        <Input
          slotProps={{ input: { ref: phoneRef } }}
          sx={{ my: '1rem' }}
          type="text"
          defaultValue={data.phone}
        />

        <Button
          style={{ marginTop: 'auto' }}
          type="submit"
          disabled={isPending}>
          Save Changes
        </Button>
      </form>
    );
  }

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const name = nameRef?.current?.value;
    const address = addressRef?.current?.value;
    const phone = phoneRef?.current?.value;
    const ownerId = uid;

    if (name && address && phone && ownerId)
      mutate({ name, address, phone, ownerId });

    // navigate('/settings');
  }
  return (
    <>
      <Container style={{ marginTop: '1rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',

            margin: '2rem',
          }}>
          {isMobile && <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <Link to="/settings" style={{ margin: -3, paddingTop: '0.4rem' }}>
              <ArrowBackIcon
                style={{ marginLeft: '-2rem', marginBlock: 'auto' }}
              />
            </Link>
            <Typography level="h4">Business Settings</Typography>
          </div>}

          {form}
          {alert.message && (
            <Alert color={alert.success ? 'success' : 'danger'}>
              {alert.message}
            </Alert>
          )}
        </div>
      </Container>
    </>
  );
}
