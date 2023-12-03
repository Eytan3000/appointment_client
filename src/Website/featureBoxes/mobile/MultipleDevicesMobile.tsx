import { Typography } from '@mui/joy';

import desktop from '../../../assets/Images/desktopCalendar.png';
import mobile from '../../../assets/Images/mobileCalendar.png';

export default function MultipleDevicesMobile() {
  return (
    <div
      style={{
        height: '50vh', //changed
        background: ' #effbf8',
        borderRadius: '20px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // added
      }}>
      <Typography
        level="body-xs"
        sx={{ color: '#01b884', marginInline: 'auto', mt: 2 }}>
        MULTIPLE DEVICES
      </Typography>

      <div
        style={{
          marginBlock: '2rem',
        }}>
        <Typography sx={{ textAlign: 'center' }} level="title-lg">
          Seamless Booking Experience
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '50%' }}>
        <img
          src={desktop}
          alt="desktop"
          style={{
            height: '150px',
            borderRadius: '10px',
            border: '1px solid #b7b7b7',
            boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            maxWidth: '500px',
          }}
        />
        <img
          src={mobile}
          alt="mobile"
          style={{
            height: '100px',
            borderRadius: '10px',
            border: '3px solid #b7b7b7',
            boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
            alignSelf: 'center',
            marginLeft: '-40px',
          }}
        />
      </div>
    </div>
  );
}
