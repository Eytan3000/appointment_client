import {
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function AccountSettings() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  function handleChangePassSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //Form Validation:
    // https://www.freecodecamp.org/news/how-to-validate-forms-in-react/

    console.log('handleChangePassSubmit');
  }

  function handleDeleteAccount() {
    setOpen(false);
    navigate('/');
  }

  return (
    <>
      <Container style={{ marginTop: '1rem' }}>
        {/* <Stack spacing={2} display={'flex'} justifyContent={'center'}> */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            margin: '2rem',
          }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <Link to="/settings" style={{ margin: -3, paddingTop:'0.4rem' }}>
              <ArrowBackIcon style={{ marginLeft: '-2rem', marginBlock:'auto' }} />
            </Link>
            <Typography level="h3">Account Settings</Typography>

          </div>
          <div style={{
              marginBlock: '2rem 2rem',
              marginLeft: '0.4rem',
              // width: '80%'
              // display:'flex'
            }}>
            <Typography level="title-md">Email</Typography>
            <Typography  sx={{mt:'0.5rem'}} level='body-md'>eytankrief@gmail.com</Typography>
            </div>
          <form
            onSubmit={handleChangePassSubmit}
            style={{
              marginBottom: '2rem',
              marginLeft: '0.4rem',
              // width: '80%'
            }}>
            <Typography level="title-md">Change Password</Typography>
            <Input
              sx={{ my: '1rem' }}
              type="password"
              placeholder="Edit Password"
            />
            <Input
              sx={{ my: '1rem' }}
              type="password"
              placeholder="Re-enter Password"
            />
            <Button type="submit">Change Password</Button>
          </form>
          <Divider />

          <Button
            variant="outlined"
            color="danger"
            style={{
              marginTop: '2rem',
              marginLeft: '0.4rem',
            }}
            onClick={() => setOpen(true)}>
            Delete Account
          </Button>
        </div>
      </Container>

      {/* "Are you sure" delete account Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Confirmation
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete your account? <br />
            <small>All your data will be lost permanently</small>
          </DialogContent>
          <DialogActions>
            <Button
              variant="solid"
              color="danger"
              onClick={handleDeleteAccount}>
              Delete Account
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setOpen(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
}
