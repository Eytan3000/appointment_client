import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoSvg from '../../assets/Images/LogoBlack.svg';
import { Button, IconButton } from '@mui/joy';
import MenuIcon from '@mui/icons-material/Menu';
import MenuModalNavbarMobile from './menuModalNavbarMobile';

export default function NavbarMobile({
  handleLogin,
  handleCreateAccount
}: {
  handleLogin: () => void;
  handleCreateAccount: ()=>void;
}) {
  const [open, setOpen] = useState<boolean>(false);

  // State to keep track of the scroll position
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  // State to keep track of whether the navbar should be visible
  const [visible, setVisible] = useState(true);

  // Effect to update the scroll position and visibility state on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Get the current scroll position
      const currentScrollPos = window.pageYOffset;

      // Check if scrolling down
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);

      // Update the previous scroll position
      setPrevScrollPos(currentScrollPos);
    };

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos]);

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
        top: visible ? '10px' : '-100px', // Toggle  top position
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
      <div style={{ display: 'flex', marginRight: '2rem' }}>
        {/* <Button variant="outlined" size="lg">
          Go to console
        </Button> */}

        {/* <Box display="flex" alignSelf={'center'} gap={10} mr={3}>
          <Typography>Features</Typography>
          <Typography>For Teams</Typography>
          <Typography>Resources</Typography>
          <Typography>Pricing</Typography>
        </Box> */}

        <Button
          sx={{ width: '100px', marginRight: '10px', marginLeft: '-20px' }}
          variant="plain"
          size="lg"
          onClick={handleLogin}>
          Log In
        </Button>

        <IconButton
          variant="outlined"
          color="neutral"
          sx={{ p: 1 }}
          onClick={() => setOpen(true)}>
          <MenuIcon />
        </IconButton>

        {/* <MenuIcon sx={{ fontSize: '300%', marginBlock: 'auto' }}/> */}
      </div>
      <MenuModalNavbarMobile open={open} setOpen={setOpen} handleCreateAccount={handleCreateAccount} />
    </nav>
  );
}
