import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import { Alert, Button, Divider, Input, Stack, Typography } from '@mui/joy';
import { useAuth } from '../../../context/AuthContext';
import { SyntheticEvent, useRef, useState } from 'react';
import { FirebaseError } from '@firebase/util';
import {
  insertNewUserInDb,
  updateNewUser_temp_to_uid,
} from '../../../utils/http';
//-----------------------------------------

export default function SignIn() {
  const navigate = useNavigate();

  const { signup, googleSignIn, isMobile } = useAuth() || {};

  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const passwordConfirmRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const fullName = fullNameRef?.current?.value;
    const email = emailRef?.current?.value;
    const password = passwordRef?.current?.value;
    const passwordConfirm = passwordConfirmRef?.current?.value;

    // Data validation
    if (!fullName || !email || !password || !passwordConfirm) {
      return setAlert('Please fill in all fields.');
    }
    if (password !== passwordConfirm) return setAlert('Passwords do not match');

    // Check which submitter - email or google:
    if (e.nativeEvent.submitter) {
      //check if exist(typescript)

      const submitterName = e.nativeEvent.submitter.getAttribute('name');

      if (submitterName === 'email-submitter') {
        try {
          setLoading(true);
          let response = await insertNewUserInDb(
            'temp',
            fullName,
            email,
            password
          );

          if (response.status !== 201) {
            if (response.response.status === 400)
              throw new Error(response.response.data);
            if (response.response.data.startsWith('Duplicate entry'))
              throw new Error('Email already exists');
          }

          const { user } = await signup(email, password);

          const uid = user.uid;
          // const accessToken = user.accessToken;

          response = await updateNewUser_temp_to_uid(uid);

          if (response.status !== 201) {
            if (response.response.status === 400) {
              setAlert(response.response.data.error[0].msg);
              setLoading(false);
              return;
            }
            throw new Error();
          }
          navigate('/add-business');
        } catch (error: unknown) {
          if (error instanceof FirebaseError) {
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/email-already-in-use')
              setAlert('Email already exists');
            else if (errorCode === 'auth/weak-password')
              setAlert('Password should be at least 6 characters');
            else setAlert(errorMessage);
          } else if (error) setAlert(error.message);
          else
            setAlert(
              `Oops! Something went wrong while trying to create your account.`
            );
        }
      }
    }
    setLoading(false);
  }

  function changeHandler() {
    setAlert(null);
  }
  return (
    <>
      <div>
        {isMobile && <div
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
            onClick={() => navigate('/signin')}
            variant="plain"
            style={{ margin: -10 }}>
            Sign In
          </Button>
        </div>}

        <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
          Create Account
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: isMobile ? 'calc(100vh - 12rem)' : '40vh',
          }}>
          <Stack spacing={2} mx={2}>
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: fullNameRef } }}
              type="text"
              placeholder="Full Name"
              required
            />
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: emailRef } }}
              type="email"
              placeholder="Email"
              required
            />
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: passwordRef } }}
              type="password"
              placeholder="Password"
              required
            />
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: passwordConfirmRef } }}
              type="password"
              placeholder="Confirm Password"
              required
            />
          </Stack>
          <Stack spacing={2} mx={2}>
            <Button type="submit" name="email-submitter" loading={loading}>
              Create Account
            </Button>

            <Divider />
            <Typography textAlign={'center'}>OR</Typography>

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
        </form>
      </div>
    </>
  );

  function handleGoogle() {
    if (googleSignIn) googleSignIn();

    setLoading(true);
    navigate('/google-signin');
  }
}
