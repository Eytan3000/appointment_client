import { Link } from 'react-router-dom';
import { StyledButton } from '../../../StyledComponents';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import google from '../../../assets/icons/google.png';
import './signIn.css';

export default function SignIn() {
  function handleSubmit() {}
  // function handleBack(){
  //   navigate('/signin');
  // }
  return (
    <>

        <div className="flex-container">
          <Link to='..' ><img src={backArrow} alt="back-arrow" /></Link>
          <Link to='/create-account' ><p className="text-styling">Create Account</p></Link>
        </div>

        <h1 className='signIn-h1'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input className='signIn-input' type="email" placeholder="Email" />
          <input className='signIn-input' type="password" placeholder="Password" />
          <StyledButton type="submit" className="styled-button" variant="full">
            Sign In
          </StyledButton>
        </form>
        <p className='forgot-password'>Forgot Password?</p>

        <div className="continue">
          <hr style={{ width: '35%' }} />
          <text>Or</text>
          <hr style={{ width: '35%' }} />
        </div>
        <div className="center-container">
          <img className="google" src={google} alt="" />
        </div>

    </>
  );
}
