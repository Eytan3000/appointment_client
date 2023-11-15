import { Button, Container, Input, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBusiness } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';

export default function AddBusiness() {
  const navigate = useNavigate();
  const { currentUser } = useAuth() || {};
console.log(currentUser);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: createBusiness,
    mutationKey: ['business'],
    onSuccess: () => {
      navigate('/services');
    },
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const ownerId = currentUser?.uid;

    if (ownerId) mutate({ ownerId, name, address, phone });
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <Typography level="h4">Business Detalis</Typography>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              marginBlock: '2rem',
              marginLeft: '0.4rem',
              // width: '80%'
              height: '80vh',
            }}>
            <Typography level="title-md">Business Name</Typography>
            <Input
              required
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <Typography level="title-md">Business Address</Typography>
            <Input
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />

            <Typography level="title-md">Business Phone</Typography>
            <Input
              required
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              style={{ marginTop: 'auto' }}
              type="submit"
              disabled={isPending}>
              Continue
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
