import { useNavigate } from 'react-router-dom';
import { Button, Stack, Typography } from '@mui/joy';

import { BsCalendarCheckFill } from 'react-icons/bs';

//---------------------------------------------------
export default function MainAuth() {
  const navigate = useNavigate();

  function handleSignin() {
    navigate('/signin');
  }
  function handleCreateAccount() {
    navigate('/create-account');
  }

  return (
    <>
      <div
        style={{
          height: '90vh',
          margin: '3rem',
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          justifyContent: 'space-between',
          
        }}>
        <div style={{ height: '2rem' }}></div>
        <BsCalendarCheckFill
          style={{ width: '100%', fontSize: '100px' }}
          color="#0c6bca"
        />

        <Stack spacing={2}>
          <Typography level="body-sm" style={{}}>
            By tapping ‘Sign in’ you agree to our <span>Terms</span>. Learn how
            we process your data in our <span>Privacy Policy</span>.
          </Typography>
          <Button onClick={handleCreateAccount}>CREATE ACCOUNT</Button>
          <Button onClick={handleSignin} variant="outlined">
            SIGN IN
          </Button>
        </Stack>
      </div>
    </>
  );
}
