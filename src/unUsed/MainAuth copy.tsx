import { useNavigate } from 'react-router-dom';
import { StyledButton } from '../../../StyledComponents';
import icon from '../../../assets/icons/main-appointment-icon.png';
// import './MainAuth.css';
import { useEffect } from 'react';
import { useTheme } from 'styled-components';
//---------------------------------------------------
export default function MainAuth() {
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    // Change the body background color
    document.body.style.background = theme.colors.primary;
    return () => {
      document.body.style.background = ''; // Restore to the default or previous background color
    };
  }, []);

  function handleSignin() {
    navigate('/signin');
  }
  function handleCreateAccount() {
    navigate('/create-account');
  }
  return (
    <>
      {/* <div className="bodyBox"> */}
      <div className="mainBox">
        <div></div>
        <img src={icon} style={{ maxWidth: '20%' }} alt="main-icon" />

        <div className="secondaryBox">
          <p className='terms'>
            By tapping ‘Sign in’ you agree to our{' '}
            <span className="highlighted-text">Terms</span>. Learn how we
            process your data in our{' '}
            <span className="highlighted-text">Privacy Policy</span>.
          </p>
          <StyledButton onClick={handleCreateAccount} variant="secondary">CREATE ACCOUNT</StyledButton>
          <StyledButton onClick={handleSignin} variant="primary">
            SIGN IN
          </StyledButton>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
