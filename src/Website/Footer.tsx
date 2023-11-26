import { Button, Divider, Stack, Typography } from '@mui/joy';
import logoGrey from '../assets/Images/LogoGrey.svg';

import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

export default function Footer({isMobile, handleCreateAccount}:{isMobile:boolean;
  handleCreateAccount:()=>void}) {

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: isMobile ? '0rem' : '7rem',
          marginBottom: isMobile ? '4rem' : '7rem',
        }}>
        <Typography
          level={isMobile ? 'body-lg' : 'h1'}
          fontSize={isMobile ? '' : '40px'}
          textAlign={'center'}
          width={'70%'}
          marginInline={'auto'}
          marginBlock={'3rem'}>
          Gain calmness and clarity with the world’s most beloved productivity
          app
        </Typography>
        <Button
          sx={{
            background: '#2f9fdf',
            width: isMobile ? '80%' : '20%',
            marginInline: 'auto',
          }}
          onClick={handleCreateAccount}>
          Sign Up for free
        </Button>
      </div>
      <Divider />

      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
        }}>
        <div style={{ margin: '2rem 0', width: '20rem', height: '100%' }}>
          <img
            src={logoGrey}
            alt="grey planify logo"
            style={{ height: '3rem' }}
          />
          <Typography textColor={'grey'} mt={2}>
            Join millions of people who organize their business days with
            Planify.
          </Typography>
        </div>

        <div>
          <Stack spacing={2} my={4}>
            <Typography level="title-md">Features</Typography>

            <Typography>How It Works</Typography>
            <Typography>For Teams</Typography>
            <Typography>Upgrade</Typography>
            <Typography>Templates</Typography>
          </Stack>
        </div>

        <div>
          <Stack spacing={2} my={4}>
            <Typography level="title-md">Resources</Typography>

            <Typography>Download Apps</Typography>
            <Typography>Help Center</Typography>
            <Typography>Productivity Methods</Typography>
            <Typography>Integrations</Typography>
            <Typography>Channel Partners</Typography>
            <Typography>Developer API</Typography>
            <Typography>Status</Typography>
          </Stack>
        </div>

        <div>
          <Stack spacing={2} my={4}>
            <Typography level="title-md">Company</Typography>

            <Typography>About Us</Typography>
            <Typography>Careers</Typography>
            <Typography>Inspiration Hub</Typography>
            <Typography>Press</Typography>
            <Typography>Twist</Typography>
          </Stack>
        </div>
        <div>
          <Stack spacing={3} ml={-8} my={4}>
            <TwitterIcon />
            <YouTubeIcon />
            <FacebookIcon />
            <InstagramIcon />
          </Stack>
        </div>
      </div>
    </>
  );
}
