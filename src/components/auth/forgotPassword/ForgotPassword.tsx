import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import {
  Typography,
  Button,
  Input,
  Stack,
  Box,
  ModalDialog,
  Modal,
  Alert,
} from '@mui/joy';
import { useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export default function ForgotPassword() {
  const { resetPassword } = useAuth()|| {};

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const emailRef = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const email = emailRef?.current?.value;

    if (!email) {
      return setAlert('Please fill in your email');
    }

    try {
      setLoading(true);
      if(resetPassword) await resetPassword(email);

      setOpen(true);
      setLoading(false);
    } catch (error:unknown) {
      setAlert(error.message);
      setLoading(false);
    }
    setLoading(false);
  }

  function handleModalOk() {
    setOpen(false);
    navigate('/signIn');
  }
  function changeHandler() {
    setAlert(null);
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
        <Link
          //  to={-1}
          to="#"
          onClick={() => window.history.back()}>
          <img src={backArrow} alt="back-arrow" />
        </Link>
      </div>

      <Typography level="h2" textAlign="center" marginBottom={'2rem'}>
        Forgot Password
      </Typography>

      <form onSubmit={handleSubmit}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '50vh',
          }}>
          <Stack spacing={2} mx={2}>
            <Input
              type="email"
              placeholder="Email"
              onChange={changeHandler}
              slotProps={{ input: { ref: emailRef } }}
            />
          </Stack>

          <Stack spacing={2} mx={2}>
            <Button loading={loading} type="submit">OK</Button>

            {alert && (
              <Alert variant="soft" color="danger">
                {alert}
              </Alert>
            )}
          </Stack>
        </div>
      </form>

      {/* Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog
          aria-labelledby="nested-modal-title"
          aria-describedby="nested-modal-description"
          sx={(theme) => ({
            [theme.breakpoints.only('xs')]: {
              top: 'unset',
              bottom: 0,
              left: 0,
              right: 0,
              borderRadius: 0,
              transform: 'none',
              maxWidth: 'unset',
            },
          })}>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            A password reset email has been sent to your inbox
          </Typography>
          <Box
            sx={{
              mt: 1,
              display: 'flex',
              gap: 1,
              flexDirection: { xs: 'column', sm: 'row-reverse' },
            }}>
            <Button variant="solid" color="primary" onClick={handleModalOk}>
              Ok
            </Button>
          </Box>
        </ModalDialog>
      </Modal>
    </>
  );
}
