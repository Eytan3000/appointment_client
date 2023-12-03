import { useNavigate } from 'react-router-dom';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { Alert, Button, Container, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../components/utilsComponents/BackArrow';
import { SyntheticEvent, useRef, useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../../firebase';
import { signal } from '@preact/signals-react';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';
import { useAuth } from '../../context/AuthContext';

function validateIsraeliPhoneNumber(phoneNumber: string) {
  //removes country code to validate.
  const phoneForValidation_NoCountryCode = phoneNumber
    ?.split(' ')
    .slice(1)
    .join('');

  // Define the regular expression for an Israeli mobile number
  const israeliPhoneNumberRegex = /^(05\d{8})$/;

  // Test the input phoneNumber against the regular expression
  return israeliPhoneNumberRegex.test(phoneForValidation_NoCountryCode);
}
function e164PhoneFormater(phone: string) {
  const phoneSplitArr = phone?.split(' ');
  return phoneSplitArr
    .map((phonePart, index) => {
      if (index === 1) return phonePart.slice(1);
      return phonePart;
    })
    .join('');
}

export const otpConfirmation = signal({});

export default function PhoneAuthInput() {
  const { isMobile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setAlert('');
    try {
      setLoading(true);
      const name = nameRef?.current?.value || '';
      console.log(name);

      if (name?.length < 4)
        throw new Error('name must be at least 4 characters');

      const phone = phoneRef?.current?.value || '';

      if (!validateIsraeliPhoneNumber(phone)) {
        throw new Error('Invalid Phone number');
      }

      // phone E164 formating (eg +972508657032)
      const phoneE164Format = e164PhoneFormater(phone!);

      const recaptcha = new RecaptchaVerifier(auth, 'sign-in-button', {
        size: 'invisible',
      });

      const confirmation = await signInWithPhoneNumber(
        auth,
        phoneE164Format,
        recaptcha
      );
      otpConfirmation.value = confirmation; //signal
      appointmentSignal.value.client = {
        name: name!,
        uid: '',
        phone: '',
      };

      setLoading(false);
      navigate('/client/otp');
    } catch (error: unknown) {
      // setLoading(false);
      if (error.message === 'Invalid Phone number')
        setAlert('Invalid Phone number');
      if (error.message === 'name must be at least 4 characters')
        setAlert('Name must be at least 4 characters');
      else {
        console.log(error);
        setAlert('We are expreienceing a problem. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginInline: 'auto',
          borderRadius: '20px',
          height: '30vh',

          maxWidth: isMobile ? '' : '300px',
          marginTop: isMobile ? '' : '30vh',
          border: isMobile ? '' : '1px solid #d4dce5',
          padding: isMobile ? '' : '0 4rem 4rem 4rem',
        }}>
        {isMobile ? (
          <BackArrow />
        ) : (
          <div style={{ marginLeft: '-40px', marginBottom: '-20px' }}>
            <BackArrow />
          </div>
        )}
        <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
          SMS log in
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2} mx={2}>
            <Input
              slotProps={{ input: { ref: nameRef } }}
              type="text"
              placeholder="Full Name (min 4 characters)"
              autoFocus
              required
            />

            <PhoneInput
              country={'il'}
              // value={this.state.phone}
              // onChange={phone => this.setState({ phone })}
              inputProps={{ ref: phoneRef, shrink: false }}
              inputStyle={{ height: '10px', width: '100%' }}
              containerStyle={{ color: 'transparent' }}
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

        <Button //remove later
          sx={{ mt: 2 }}
          onClick={() => {
            appointmentSignal.value.client = {
              name: 'eytankrief',
              uid: 'juwZqBaLkZY3bfe6na45YGB1ryo1',
              phone: '0508657032',
            };

            navigate('../booking-summary');
          }}>
          Jump
        </Button>
      </div>
    </>
  );
}
