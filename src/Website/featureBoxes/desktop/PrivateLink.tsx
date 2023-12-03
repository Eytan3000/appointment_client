import { Divider, Typography } from '@mui/joy';
import clientBookingGIF from '../../../assets/video/clientBookingGIF.gif';


export default function PrivateLink() {
  return (
    <div
      style={{
        // marginTop: '6rem',
        height: '28rem',
        // background:' rgba(147, 215, 249, 0.3)',
        background: ' #f8f7fe',
        borderRadius: '50px',
        boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
        padding: '6rem',

        display:'flex',
        justifyContent:'center'
      }}>
      <div style={{ display: 'flex', justifyContent:'space-around'}}>

        <div style={{display:'flex', flexDirection:'column', gap:'5%' , justifyContent:'center', maxWidth:'50%'}}>
        <Typography level="body-xs" sx={{color:'#7c67ee'}}>PRIVATE LINK</Typography>
        <Typography sx={{paddingRight:'4rem'}} fontSize={'40px'} level="h1">Seamless Booking Experience</Typography>
        <Divider sx={{width:'20%', height:'4px', borderRadius:'2px', background:'#7c67ee'}}/>
        <Typography sx={{paddingRight:'4rem'}} level='body-md'>Save time by letting Clients reserve appointments themselves with a personalized Link.</Typography>

        </div>

        <img
          src={clientBookingGIF}
          alt="client booking process"
          style={{borderRadius:'20px', border:'1px solid #d4dce5', boxShadow:'0px 2px 16px rgba(0, 0, 0, 0.1)'}}

        />
      </div>
    </div>
  );
}
