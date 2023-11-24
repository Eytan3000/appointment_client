import { Divider, Typography } from '@mui/joy';
import screens from '../../../assets/Images/Screens.svg';

export default function AutomaticReminders() {
  return (
    <div
      style={{
        height: '28rem',
        background: ' #fff7fb',
        borderRadius: '50px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        padding: '6rem',
        display:'flex',
        justifyContent:'center'
      }}>
        <img
          src={screens}
          alt="screens"
          style={{ height: '300px', alignSelf:'center' }}
        />
        
      <div style={{ display: 'flex'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'5%' , justifyContent:'center'}}>
        <Typography level="body-xs" sx={{color:'#fd71b0'}}>AUTOMATIC REMINDERS</Typography>
        <Typography sx={{paddingRight:'4rem'}} fontSize={'40px'} level="h1">Automatic reminders</Typography>
        <Divider sx={{width:'20%', height:'4px', borderRadius:'2px', background:'#fd71b0'}}/>
        <Typography sx={{paddingRight:'4rem'}} level='body-md'>Clients get automatic notifications before appointments, making sure they don't miss the important event. No more manual reminders. </Typography>

        </div>
      </div>
    </div>
  );
}
