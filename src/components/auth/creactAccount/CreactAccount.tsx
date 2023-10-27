import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import { Alert, Button, Input, Stack, Typography } from '@mui/joy';
import { useAuth } from '../../../context/AuthContext';
import { SyntheticEvent, useRef, useState } from 'react';
import { FirebaseError } from '@firebase/util';
import { insertNewUserInDb } from '../../../utils/http';

//-----------------------------------------
//-----------------------------------------
export default function SignIn() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [alert, setAlert] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    if (e.nativeEvent.submitter.name === 'email-submitter') {
      try {
        const email = emailRef?.current?.value;
        const password = passwordRef?.current?.value;
        const fullName = fullNameRef?.current?.value;

        //signin with email and password refs
        const { user } = await signup(email, password);

        const uid = user.uid;
        const accessToken = user.accessToken;

        console.log('uid: ' + uid); //remove later
        console.log('access Token: ' + accessToken); //remove later
        console.log('email: ' + email); //remove later
        console.log('password: ' + password); //remove later
        console.log('fullName: ' + fullName); //remove later

        //Creating new user row in db
        // insertNewUserInDb(uid, fullName, email);

        navigate('/services');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          const errorCode = error.code;
          const errorMessage = error.message;

          if (errorCode === 'auth/email-already-in-use')
            setAlert('Email already exists');
          else if (errorCode === 'auth/weak-password')
            setAlert('Password should be at least 6 characters');
          else setAlert(errorMessage);
        }
      }

      console.log('email signUp'); //remove later
    } else if (e.nativeEvent.submitter.name === 'google-submitter') {
      console.log('google signUp'); //remove later
    }
  }

  function changeHandler() {
    setAlert(null);
  }
  return (
    <>
      <div>
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

          <Button
            onClick={() => navigate('/signin')}
            variant="plain"
            style={{ margin: -10 }}>
            Sign In
          </Button>
        </div>

        <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
          Create Account
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mx={2}>
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: fullNameRef } }}
              type="text"
              placeholder="Full Name"
            />
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: emailRef } }}
              type="email"
              placeholder="Email"
            />
            <Input
              onChange={changeHandler}
              slotProps={{ input: { ref: passwordRef } }}
              type="password"
              placeholder="Password"
            />
            <Input
              onChange={changeHandler}
              type="password"
              placeholder="Confirm Password"
            />
            <Button type="submit" name="email-submitter">
              Create Account
            </Button>
            <Button
              variant="outlined"
              type="submit"
              name="google-submitter"
              startDecorator={<img className="google" src={google} alt="" />}>
              Continue with google
            </Button>
            {alert && (
              <Alert
                // startDecorator={<WarningIcon />}
                variant="soft"
                color="danger">
                {alert}
              </Alert>
            )}
          </Stack>
        </form>
      </div>
    </>
  );
}
