import { Link, useNavigate } from 'react-router-dom';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { Alert, Button, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../components/utilsComponents/BackArrow';
import { SyntheticEvent, useRef, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { signal } from '@preact/signals-react';

export const otpConfirmation = signal({});

export default function PhoneAuthInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState();
  const [alert, setAlert] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const otpRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      // const name = nameRef?.current?.value;
      // const phone = phoneRef?.current?.value;
      const name = 'eytan';
      const phone = '+972508657032';

      const recaptcha = new RecaptchaVerifier(auth, 'sign-in-button', {
        size: 'invisible',
      });

      //   console.log(`+972${phone}`)
      const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha);
      // setConfirmation(confirmation);
      otpConfirmation.value=confirmation;

      // setLoading(false);
      // navigate('/client/otp');
    } catch (error) {
      // setLoading(false);
      setAlert('We are expreienceing a problem. Please try again later.');
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackArrow />

      <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
        SMS log in
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2} mx={2}>
          <Input
            slotProps={{ input: { ref: nameRef } }}
            type="text"
            placeholder="Full Name (min 4 characters)"
            // required
          />
          <Input
            slotProps={{ input: { ref: phoneRef } }}
            type="text"
            placeholder="Phone"
            // required
          />

          <Button
            id="sign-in-button"
            type="submit"
            name="email-submitter"
            loading={loading}>
            Send SMS
          </Button>
          {alert !== '' && <Alert color="danger">{alert}</Alert>}
        </Stack>
      </form>
    </>
  );
}
