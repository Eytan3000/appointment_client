import { Link, useNavigate } from 'react-router-dom';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { Alert, Button, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../components/utilsComponents/BackArrow';
import { SyntheticEvent, useRef, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { otpConfirmation } from './PhoneAuthInput';
import { FirebaseError } from 'firebase/app';

export default function OtpInput() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const otpRef = useRef<HTMLInputElement | null>(null);

  async function handleOtpSubmit(e: SyntheticEvent) {
    e.preventDefault();

    const otp = otpRef?.current?.value;

    try {
      setLoading(true);
      const data = await otpConfirmation.value.confirm(otp);

      console.log(data);
      console.log(data.user.uid);
      console.log(data.user.phoneNumber);

      setLoading(false);
      // navigate('/client/summery');
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/code-expired') setAlert('Incorrect code');
      } else
        setAlert(`We're experiencing an issue. Please retry at a later time.`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <BackArrow />

      <Typography mt={4} level="h4" textAlign="center" marginBottom={'2rem'}>
        Insert code
      </Typography>
      <form onSubmit={handleOtpSubmit}>
        <Stack spacing={2} mx={2}>
          <Input
            slotProps={{ input: { ref: otpRef } }}
            type="text"
            placeholder="SMS code"
            required
          />

          <Button type="submit" name="email-submitter" loading={loading}>
            continue
          </Button>
          {alert !== '' && <Alert color="danger">{alert}</Alert>}
        </Stack>
      </form>
    </>
  );
}
