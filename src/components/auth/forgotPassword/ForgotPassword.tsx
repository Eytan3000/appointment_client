import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import {
  Typography,
  Button,
  Input,
  Stack,
  Box,
  ModalDialog,
  Modal,
} from '@mui/joy';
import { ReactElement, useState } from 'react';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    setOpen(true);
  }

  function handleModalOk() {
    setOpen(false);
    navigate('/signIn');
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
            <Input type="email" placeholder="Email" />
            {/* <Input type="password" placeholder="Password" /> */}
          </Stack>

          <Stack spacing={2} mx={2}>
            <Button type="submit">OK</Button>
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
          {/* <Typography id="nested-modal-title" level="h2">
            Are you absolutely sure?
          </Typography> */}
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

//--------------------------------------------------------------
