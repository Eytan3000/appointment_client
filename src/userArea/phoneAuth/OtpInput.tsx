import { Link, useNavigate } from 'react-router-dom';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { Alert, Button, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../components/utilsComponents/BackArrow';
import { SyntheticEvent, useRef, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { otpConfirmation } from './PhoneAuthInput';
import { FirebaseError } from 'firebase/app';

function simplePhoneFormatter(e164Phone: string) {
  return '0' + e164Phone.slice(4);
}

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
      appointmentSignal.value.client.uid = data.user.uid;
      
      const formattedPhone = simplePhoneFormatter(data.user.phoneNumber); // formate to 0508657032
      appointmentSignal.value.client.phone = formattedPhone;

      setLoading(false);
      navigate('/client/booking-summary');
      
    } catch (error: unknown) {
      console.log(error.code);
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/code-expired') setAlert('This code has expired. Please go back and try again.');
        else if (error.code === 'auth/invalid-verification-code') setAlert('Invalid code.');
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
            autoFocus
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
