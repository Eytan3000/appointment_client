import { Button, Typography } from '@mui/joy';
import heroImage from '../assets/Images/hero.png';
import star from '../assets/icons/star.svg';

export default function Hero() {
  return (
    <div style={{ display: 'flex', marginTop: '12rem' }}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: 100,
          gap: '5%',
        }}>
        <Typography level="h1">
          Business calendar for scheduling appointments
        </Typography>
        <Typography>
          Manage appointments, streamline your schedule, boost productivity: All in
          your hand. Say goodbye to hassles, embrace efficiency effortlessly.
        </Typography>
        <div
          style={{
            padding: '2rem',
          }}>
          <Button
            sx={{
              width: '50%',
              mt: '1rem',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              background: '#309fdf',
            }}>
            Sign Up
          </Button>
          <Typography
            level="body-xs"
            sx={{ mt: 2, textAlign: 'center', paddingRight: '48%' }}>
            FREE FOREVER. <br />
            NO CREDIT CARD.
          </Typography>

          
        </div>
        <div style={{display:'flex', marginTop:'-1rem'}}>
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <img src={star} alt="star" />
            <Typography ml={2} level="body-xs">Based on 10,000+ reviews</Typography>
          </div>
      </div>
      <img
        src={heroImage}
        alt="Hero Image"
        style={{
          height: '25rem',
          marginLeft: '-10rem',
        }}
      />
    </div>
  );
}

// style={{zIndex:0}}
