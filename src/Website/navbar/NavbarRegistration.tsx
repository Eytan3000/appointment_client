import { Link } from 'react-router-dom';
import logoSvg from '../../assets/Images/LogoBlack.svg';

export default function NavbarRegistration() {
  return (
    <nav
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
        paddingBlock: '1rem',
        paddingLeft: '2rem',
        margin: '-1rem',
        position: 'fixed',
        width: '98%',
        top: '10px',
        zIndex: '1000',
        background: '#ffffff',
        transition: 'top 0.3s', // transition
      }}>
      <Link to="/homepage">
        <img
          src={logoSvg}
          alt="logo"
          style={{ width: '60%', height: '100%' }}
        />
      </Link>
      <div
        style={{ display: 'flex', marginRight: '2rem', width: '20rem' }}></div>
    </nav>
  );
}
