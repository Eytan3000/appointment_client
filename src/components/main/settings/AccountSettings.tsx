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
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAuth } from '../../../context/AuthContext';
import { ErrorData } from '@firebase/util';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { FirebaseError } from '@firebase/util';

export default function AccountSettings() {
  const { currentUser, updatePasswordCtx, isMobile } = useAuth() || {};

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [alert, setAlert] = useState('');
  const [alertSuccess, setAlertSuccess] = useState('');
  const [noGoogleChangePass, setNoGoogleChangePass] = useState(false);
  const [loginModal, setLoginModal] = useState(false);

  const [loginPass, setLoginPass] = useState('');
  const [reAuthAlert, setReAuthAlert] = useState('');

  function validation() {
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

    if (currentUser?.providerData[0].providerId !== 'password') {
      setNoGoogleChangePass(true);
      return;
    }
    //validation:
    if (!validation()) return;

    if (updatePasswordCtx) {
      try {
        const result = await updatePasswordCtx(password);
        console.log(result);
        setPassword('');
        setConfirmPassword('');
        setAlertSuccess('Password changed successfully.');
      } catch (error: unknown) {
        console.log(error);
        const firebaseError1 = error as ErrorData;
        if (firebaseError1.code === 'auth/requires-recent-login')
          setLoginModal(true);
      }
    }
  }

  console.log(password);
  console.log(confirmPassword);
  return (
    <>
      <Container style={{ marginTop: '1rem' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',

            margin: '2rem',
          }}>
          {isMobile && <div style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <Link to="/settings" style={{ margin: -3, paddingTop: '0.4rem' }}>
              <ArrowBackIcon
                style={{ marginLeft: '-2rem', marginBlock: 'auto' }}
              />
            </Link>
            <Typography level="h3">Account Settings</Typography>
          </div>}
          <div
            style={{
              marginBlock: '2rem 2rem',
              marginLeft: '0.4rem',
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
            {noGoogleChangePass && (
              <Alert sx={{ mt: 2 }} color="danger">
                Google-authenticated users cannot change passwords.{' '}
              </Alert>
            )}
          </form>

        </div>
      </Container>

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
            <Input
              required
              onChange={(e) => setLoginPass(e.target.value)}
              type="password"
              placeholder="Password"
            />
          </Stack>
          {reAuthAlert !== '' && (
            <Alert color="danger" sx={{ width: '80%', margin: '0 auto' }}>
              {reAuthAlert}
            </Alert>
          )}
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
    try {
      if (currentUser?.email && updatePasswordCtx) {
        const credential = EmailAuthProvider.credential(
          currentUser?.email,
          loginPass
        );

        await reauthenticateWithCredential(currentUser, credential);
        setLoginModal(false);

        await updatePasswordCtx(password);
        setAlertSuccess('Password updated successfully');
      }
    } catch (error: unknown) {
      if (error instanceof FirebaseError) {
        if (error.code === 'auth/invalid-login-credentials')
          setReAuthAlert('Invalid Password');
      } else setReAuthAlert('Something went wrong');
    }
  }
}
