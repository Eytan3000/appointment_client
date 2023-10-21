import { Link, useNavigate } from 'react-router-dom';
import { StyledButton } from '../../../StyledComponents';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import './creatAccount.css';
//-----------------------------------------
export default function SignIn() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/services');
  }

  return (
    <>
      <div className="create-account-main-div">
        <div className="flex-container">
          <Link to="..">
            <img src={backArrow} alt="back-arrow" />
          </Link>
          <Link to="/signin">
            <p className="signin-text-styling">Sign In</p>
          </Link>
        </div>

        <h1 className="create-account-h1">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <input
            className="create-account-input"
            type="text"
            placeholder="Full Name"
          />
          <input
            className="create-account-input"
            type="email"
            placeholder="Email"
          />
          <input
            className="create-account-input"
            type="password"
            placeholder="Password"
          />
          <input
            className="create-account-input"
            type="password"
            placeholder="Confirm Password"
          />
          <StyledButton type="submit" className="styled-button" variant="full">
            Create Account
          </StyledButton>
        </form>

        <div className="continue">
          <hr style={{ width: '35%' }} />
          <text>Or</text>
          <hr style={{ width: '35%' }} />
        </div>
        <div className="center-container">
          <img className="google" src={google} alt="" />
        </div>
      </div>
    </>
  );
}
