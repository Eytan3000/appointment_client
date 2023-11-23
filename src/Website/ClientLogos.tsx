import { Typography } from "@mui/joy";
import upworkLogo from '../assets/clientsLogos/upwork.svg'
import freelancerLogo from '../assets/clientsLogos/freelancerLogo.svg'
import fiverrLogo from '../assets/clientsLogos/fiverr.svg'
import remoteLogo from '../assets/clientsLogos/remoteLogo.svg'
import deelLogo from '../assets/clientsLogos/deelLogo.svg'

export default function ClientLogos() {
  return (
    <>
    <div style={{marginBlock:'6rem'}}>
    <div style={{display:'flex', justifyContent:'center'}}>

        <Typography level="body-sm">JOIN 800,000+ HIGHLY PRODUCTIVE PROFESSIONALS</Typography>
    </div>
        <div style={{display:'flex', justifyContent:'space-around',maxHeight:'2rem', marginTop:'2rem'}}>
        <img src={upworkLogo} alt="upwork logo" style={{minWidth:'200px',maxWidth:'200px'}} />
        <img src={freelancerLogo} alt="freelancer Logo" style={{minWidth:'200px',maxWidth:'200px'}} />
        <img src={fiverrLogo} alt="fiverr Logo" style={{minWidth:'200px',maxWidth:'200px'}} />
        <img src={remoteLogo} alt="remote Logo" style={{minWidth:'200px',maxWidth:'200px'}} />
        <img src={deelLogo} alt="deel Logo" style={{minWidth:'200px',maxWidth:'200px'}} />
    </div>
    </div>
    </>
  )
}

// style={{maxWidth:'200px'}}