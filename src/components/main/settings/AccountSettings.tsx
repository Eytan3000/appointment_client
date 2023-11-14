import {
  Alert,
  Avatar,
  Button,
  Container,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Input,
  Modal,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../../context/AuthContext';
import { ErrorData } from '@firebase/util';
import { reauthenticateWithCredential } from 'firebase/auth';

export default function AccountSettings() {
  const { currentUser, updatePasswordCtx, login } = useAuth() || {};

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alert, setAlert] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [loginModal, setLoginModal] = useState(false);

  const [loginPass, setLoginPass] = useState('');

  function validation(password: string, confirm: string) {
    if (password.length < 6) {
      setAlert('Password must be 6+ characters');
      return false;
    }
    if (password !== confirmPassword) {
      setAlert("Passwords don't match");
      return false;
    }
    return true;
  }
  async function handleChangePassSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    //validation:
    if (!validation(password, confirmPassword)) return;

    if (updatePasswordCtx) {
      try {
        const result = await updatePasswordCtx(password);
        // if(result.message === 'auth/requires-recent-login'){
        //   console.log('message')
        // }
        console.log(result);
        // setPassword('');
        // setConfirmPassword('');
        // setAlertSuccess('Password changed successfully.');
      } catch (error: unknown) {
        console.log(error);
        const firebaseError = error as ErrorData;
        if (firebaseError.code === 'auth/requires-recent-login')
          setLoginModal(true);
      }
    }
  }

  // function handleDeleteAccount() {
  //   setOpen(false);
  //   navigate('/');
  // }

  console.log(password);
  console.log(confirmPassword);
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
            <Link to="/settings" style={{ margin: -3, paddingTop: '0.4rem' }}>
              <ArrowBackIcon
                style={{ marginLeft: '-2rem', marginBlock: 'auto' }}
              />
            </Link>
            <Typography level="h3">Account Settings</Typography>
          </div>
          <div
            style={{
              marginBlock: '2rem 2rem',
              marginLeft: '0.4rem',
              // width: '80%'
              // display:'flex'
            }}>
            <Typography level="title-md">Email</Typography>
            <Typography sx={{ mt: '0.5rem' }} level="body-md">
              {currentUser?.email}
            </Typography>
          </div>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginBottom: '2rem',
            }}>
            <Avatar size="lg" sx={{ height: '5rem', width: '5rem' }} />
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
              required
              sx={{ my: '1rem' }}
              type="password"
              placeholder="Edit Password"
              onChange={(e) => {
                setAlert('');
                setPassword(e.target.value);
              }}
            />
            <Input
              required
              sx={{ my: '1rem' }}
              type="password"
              placeholder="Re-enter Password"
              onChange={(e) => {
                setAlert('');
                setConfirmPassword(e.target.value);
              }}
            />
            <Button type="submit">Change Password</Button>
            {alert !== '' && (
              <Alert sx={{ mt: 2 }} color="danger">
                {alert}
              </Alert>
            )}
            {alertSuccess !== '' && (
              <Alert sx={{ mt: 2 }} color="success">
                {alertSuccess}
              </Alert>
            )}
          </form>

          {/* <Divider />
          <Button
            variant="outlined"
            color="danger"
            style={{
              marginTop: '2rem',
              marginLeft: '0.4rem',
            }}
            onClick={() => setOpen(true)}>
            Delete Account
          </Button> */}
        </div>
      </Container>

      {/* "Are you sure" delete account Modal */}
      {/* <Modal open={open} onClose={() => setOpen(false)}>
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
      </Modal> */}

      {/* "Login Modal */}
      <Modal open={loginModal} onClose={() => setLoginModal(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle>
            <WarningRoundedIcon />
            Login required
          </DialogTitle>
          <Divider />
          <DialogContent>Please insert your current password.</DialogContent>
          <Stack spacing={2} mx={2}>
            {/* <Input
              required
              onChange={(e) => setLoginEmail(e.target.value)}
              type="email"
              placeholder="Email"
            /> */}
            <Input
              required
              onChange={(e) => setLoginPass(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Stack>
          <DialogActions>
            <Button variant="solid" onClick={handleLogin}>
              Login{' '}
            </Button>
            <Button
              variant="plain"
              color="neutral"
              onClick={() => setLoginModal(false)}>
              Cancel
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </>
  );
  async function handleLogin() {
    console.log(currentUser?.email, loginPass);
    try {
      if (login && currentUser?.email) {
        // const x = await login(currentUser?.email, loginPass);
        // console.log(x);
        login(currentUser?.email, loginPass);
        setLoginModal(false);

        // reauthenticateWithCredential()

        // // TODO(you): prompt the user to re-provide their sign-in credentials
        // const credential = promptForCredentials();

        // reauthenticateWithCredential(currentUser, credential)
        //   .then(() => {
        //     // User re-authenticated.
        //   })
        //   .catch((error) => {
        //     // An error ocurred
        //     // ...
        //   });




      }
    } catch (error) {
      console.log(error);
    }
  }
}
