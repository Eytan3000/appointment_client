import { Divider, Typography } from '@mui/joy';

import desktop from '../../../assets/Images/desktopCalendar.png';
import mobile from '../../../assets/Images/mobileCalendar.png';


export default function MultipleDevices() {
  return (
    <div
      style={{
        // marginTop: '6rem',
        height: '28rem',
        // background:' rgba(162, 223, 253, 0.3)',
        background: ' #effbf8',
        borderRadius: '50px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        padding: '6rem',

        display:'flex',
        justifyContent:'center'
      }}>
      <div style={{ display: 'flex'}}>

        <div style={{display:'flex', flexDirection:'column', gap:'5%' , justifyContent:'center'}}>
        <Typography level="body-xs" sx={{color:'#01b884'}}>MULTIPLE DEVICES</Typography>
        <Typography sx={{paddingRight:'4rem'}} fontSize={'40px'} level="h1">Track your schedule from any device.</Typography>
        <Divider sx={{width:'20%', height:'4px', borderRadius:'2px', background:'#01b884'}}/>
        <Typography sx={{paddingRight:'4rem'}} level='body-md'>Scheduling appointments with your clients on your mobile or web browser.</Typography>

        </div>

        <img
          src={desktop}
          alt="desktop"
          style={{ height: '300px', 
          borderRadius:'10px', border:'1px solid #b7b7b7', boxShadow:'0px 2px 16px rgba(0, 0, 0, 0.1)', 
          alignSelf:'center',
        maxWidth:'500px'
        }}
        />
        <img
          src={mobile}
          alt="mobile"
          style={{height:'200px',borderRadius:'10px', border:'3px solid #b7b7b7', boxShadow:'0px 2px 16px rgba(0, 0, 0, 0.1)', alignSelf:'center',
        marginLeft:'-70px'
        }}
        />
      </div>
    </div>
  );
}
