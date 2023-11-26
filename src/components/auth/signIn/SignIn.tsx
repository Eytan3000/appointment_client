import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import { Typography, Button, Input, Stack, Alert } from '@mui/joy';
import { SyntheticEvent, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { FirebaseError } from 'firebase/app';

export default function SignIn() {
  const navigate = useNavigate();
  const { login, googleSignIn, isMobile } = useAuth() || {};

  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  // SUBMIT
  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;

    // Data validation
    if (!email || !password) {
      return setAlert('Please fill in all fields.');
    }

    // Check which submitter - email or google:
    if (e.nativeEvent.submitter) {
      //check if exist(typwscript)

      const submitterName = e.nativeEvent.submitter.getAttribute('name');

      if (submitterName === 'email-submitter') {
        try {
          setLoading(true);

          const { user } = await login(email, password);

          const uid = user.uid;
          const accessToken = user.accessToken;

          // console.log('uid: ' + uid); //remove later
          // console.log('access Token: ' + accessToken); //remove later
          // console.log('email: ' + email); //remove later
          // console.log('password: ' + password); //remove later

          // db functions here if needed

          navigate('/main-calendar');
        } catch (error: unknown) {
          if (error instanceof FirebaseError) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/invalid-login-credentials')
              setAlert('Incorrect email or password');
            else setAlert(errorMessage);
          }
        }
      } else if (submitterName === 'google-submitter') {
        setLoading(true);
        console.log('google signUp'); //remove later
      }
    }
    setLoading(false);
  }

  function changeHandler() {
    setAlert(null);
  }
  function handleForgotPassword() {
    navigate('/forgot-password');
  }
  return (
    <>
      {isMobile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginInline: '1rem',
            marginBlock: '2rem',
          }}>
          <Link to="#" onClick={() => window.history.back()}>
            <img src={backArrow} alt="back-arrow" />
          </Link>

          <Button
            onClick={() => navigate('/create-account')}
            variant="plain"
            style={{ margin: -10 }}>
            Create Account
          </Button>
        </div>
      )}

      <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
        Sign In
      </Typography>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: isMobile ? 'calc(100vh - 12rem)' : '30vh',
          }}>
          <Stack spacing={2} mx={2}>
            <Input
              required
              onChange={changeHandler}
              slotProps={{ input: { ref: emailRef } }}
              type="email"
              placeholder="Email"
            />
            <Input
              required
              onChange={changeHandler}
              slotProps={{ input: { ref: passwordRef } }}
              type="password"
              placeholder="Password"
            />
          </Stack>

          <Stack spacing={2} mx={2}>
            <Button
              onClick={handleForgotPassword}
              variant="plain"
              style={{ marginTop: '1rem' }}>
              Forgot Password?
            </Button>
            <Button loading={loading} type="submit" name="email-submitter">
              Sign In
            </Button>
            <Button
              onClick={handleGoogle}
              variant="outlined"
              startDecorator={<img className="google" src={google} alt="" />}>
              Continue with google
            </Button>
            {alert && (
              <Alert variant="soft" color="danger">
                {alert}
              </Alert>
            )}
          </Stack>
        </div>
      </form>
    </>
  );
  function handleGoogle() {
    if (googleSignIn) googleSignIn();

    setLoading(true);
    navigate('/google-signin');
  }
}
