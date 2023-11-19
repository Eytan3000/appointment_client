import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getRedirectResult,
} from 'firebase/auth';
import { insertNewGoogleUserInDb } from '../../../utils/http';
import { CircularProgress } from '@mui/joy';
import { auth } from '../../../firebase';

export default function GoogleSignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      getRedirectResult(auth)
        .then(async (result) => {
          // const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          if (result) {
            console.log(result);
            const { isNewUser } = getAdditionalUserInfo(result);
            console.log(isNewUser);

            if (!isNewUser) {
              navigate('/main-calendar');
            } else {
              // create new user
              const { displayName, email, uid } = result.user;
              await insertNewGoogleUserInDb(uid, displayName!, email!);
              navigate('/add-business');
            }
          }
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
          console.log(error);
          navigate('/create-account');
        });
    })();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}>
      <CircularProgress />
    </div>
  );
}
