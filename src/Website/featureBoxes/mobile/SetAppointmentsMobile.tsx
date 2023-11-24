import { Typography } from '@mui/joy';
import setAppointmentGIF from '../../../assets/video/SetAppointmentGIF.gif';

export default function SetAppointmentsMobile() {
  return (
    <div
      style={{
        height: '80vh', //changed
        background: ' rgba(162, 223, 253, 0.3)',
        borderRadius: '20px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column', // added
      }}>
      <Typography
        level="body-xs"
        sx={{ color: '#0395de', marginInline: 'auto', mt: 2 }}>
        APPOINTMENTS SCHEDULING
      </Typography>

      <div
        style={{
          marginBlock: '2rem',
        }}>
        <Typography sx={{ textAlign: 'center' }} level="title-lg">
          Set appointments and track time
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', height: '70%' }}>
        <img
          style={{
            borderRadius: '20px',
            border: '1px solid #d4dce5',
            boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
          }}
          src={setAppointmentGIF}
          alt="user set appointment"
        />
      </div>
    </div>
  );
}
