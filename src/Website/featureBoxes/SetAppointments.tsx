import { Divider, Typography } from '@mui/joy';
import setAppointmentGIF from '../../assets/video/SetAppointmentGIF.gif';

export default function SetAppointments() {
  return (
    <div
      style={{
        height: '28rem',
        background: ' rgba(162, 223, 253, 0.3)',
        borderRadius: '50px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        padding: '6rem',

        display: 'flex',
        justifyContent: 'center',
      }}>
      <div style={{ display: 'flex',justifyContent:'space-around' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '5%',
            justifyContent: 'center',
            maxWidth:'50%'
          }}>
          <Typography level="body-xs" sx={{ color: '#0395de ' }}>
            APPOINTMENTS SCHEDULING
          </Typography>
          <Typography
            sx={{ paddingRight: '4rem' }}
            fontSize={'40px'}
            level="h1">
            Set appointments and track time
          </Typography>
          <Divider
            sx={{
              width: '20%',
              height: '4px',
              borderRadius: '2px',
              background: '#0395de',
            }}
          />
          <Typography sx={{ paddingRight: '4rem' }} level="body-md">
            Simplify your schedule: Easily set appointments and efficiently
            track time with our user-friendly tool, ensuring optimal
            productivity and organization.
          </Typography>
        </div>

        <img 
        style={{borderRadius:'20px', border:'1px solid #d4dce5', boxShadow:'0px 2px 16px rgba(0, 0, 0, 0.1)'}}
         src={setAppointmentGIF} 
         alt="user set appointment"
         />
      </div>
    </div>
  );
}
