import { Typography } from '@mui/joy';
import clientBookingGIF from '../../../assets/video/clientBookingGIF.gif';

export default function PrivateLinkMobile() {
  return (
    <div
      style={{
        height: '80vh', //changed
        background: ' #f8f7fe',
        borderRadius: '20px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // added
      }}>
      <Typography
        level="body-xs"
        sx={{ color: '#7c67ee', marginInline: 'auto', mt: 2 }}>
        PRIVATE LINK
      </Typography>

      <div
        style={{
          marginBlock: '2rem',
        }}>
        <Typography sx={{ textAlign: 'center' }} level="title-lg">
          Seamless Booking Experience
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '70%' }}>
        <img
          style={{
            borderRadius: '20px',
            border: '1px solid #d4dce5',
            boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
          }}
          src={clientBookingGIF}
          alt="user set appointment"
        />
      </div>
    </div>
  );
}
