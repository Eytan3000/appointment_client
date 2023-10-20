import { Button, Container, Input, Typography } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import React from 'react';

const businessName = 'Karnina Nails';
const businessAddress = 'Wilson 7, Tel Aviv';
const businessPhone = '050-865-7032';

export default function BusinessSettings() {
    const navigate = useNavigate();

    function handleSubmit(e: React.SyntheticEvent){
        e.preventDefault();

        // change settings

        navigate('/settings');
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
            <Link to="/settings" style={{ margin: -3, paddingTop: '0.4rem' }}>
              <ArrowBackIcon
                style={{ marginLeft: '-2rem', marginBlock: 'auto' }}
              />
            </Link>
            <Typography level="h3">Business Settings</Typography>
          </div>

          <form
            onSubmit={handleSubmit}
            style={{
              marginBlock: '2rem',
              marginLeft: '0.4rem',
              // width: '80%'
            }}>
            <Typography level="title-md">Business Name</Typography>
            <Input sx={{ my: '1rem' }} type="text" placeholder={businessName} />

            <Typography level="title-md">Business Address</Typography>
            <Input sx={{ my: '1rem' }} type="text" placeholder={businessAddress} />

            <Typography level="title-md">Business Phone</Typography>
            <Input sx={{ my: '1rem' }} type="text" placeholder={businessPhone} />

            <Button type="submit">Save Changes</Button>
          </form>

        </div>
      </Container>
    </>
  );
}
