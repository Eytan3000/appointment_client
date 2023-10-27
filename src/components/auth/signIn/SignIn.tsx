import { Link, useNavigate } from 'react-router-dom';
import { StyledButton } from '../../../StyledComponents';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import { Typography, Button, Input, Stack } from '@mui/joy';
// import './signIn.css';

export default function SignIn() {
  const navigate = useNavigate();

  function handleSubmit() {}

  function handleForgotPassword() {
    navigate('/forgot-password');
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginInline: '1rem',
          marginBlock: '2rem',
        }}>
        <Link to={-1}>
          <img src={backArrow} alt="back-arrow" />
        </Link>
        {/* <Link to="/signin" style={{ textDecoration: 'none' }}>
          <Typography>Create Account</Typography>
        </Link> */}

        <Button onClick={()=>navigate('/create-account')} variant='plain' style={{margin:-10}}>Create Account</Button>
      </div>
      {/*  */}

      <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
        Sign In
      </Typography>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            // gap:'2rem'
            height: '50vh',
          }}>
          <Stack spacing={2} mx={2}>
            <Input type="email" placeholder="Email" />
            <Input type="password" placeholder="Password" />
          </Stack>

          <Stack spacing={2} mx={2}>
            <Button
              onClick={handleForgotPassword}
              variant="plain"
              style={{ marginTop: '1rem' }}>
              Forgot Password?
            </Button>
            <Button type="submit">Sign In</Button>
            <Button
              variant="outlined"
              startDecorator={<img className="google" src={google} alt="" />}>
              Continue with google
            </Button>
          </Stack>
        </div>
      </form>

      {/* // to="/signin" */}
      {/* style={{ textDecoration: 'none',  }}> */}
    </>
  );
}

//--------------------------------------------------------------
