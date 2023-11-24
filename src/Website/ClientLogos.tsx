import { Grid, Typography } from '@mui/joy';
import upworkLogo from '../assets/clientsLogos/upwork.svg';
import freelancerLogo from '../assets/clientsLogos/freelancerLogo.svg';
import fiverrLogo from '../assets/clientsLogos/fiverr.svg';
import remoteLogo from '../assets/clientsLogos/remoteLogo.svg';
import deelLogo from '../assets/clientsLogos/deelLogo.svg';
import './clientLogos.css';

const style = {
  minWidth: '150px',
  maxWidth: '200px',
  marginInline: '20px',
  marginBlock: '20px',
  height: '40px',
};
export default function ClientLogos() {
  return (
    <>
      <div className='clientLogos__container__div'>
        <div className='clientLogos__typography__div'>
          <Typography level="body-sm">
            JOIN 800,000+ HIGHLY PRODUCTIVE PROFESSIONALS
          </Typography>
        </div>
        <div className="clientLogos__logo__div">
          <img src={upworkLogo} alt="upwork logo" style={style} />
          <img src={freelancerLogo} alt="freelancer Logo" style={style} />
          <img src={fiverrLogo} alt="fiverr Logo" style={style} />
          <img src={remoteLogo} alt="remote Logo" style={style} />
          <img src={deelLogo} alt="deel Logo" style={style} />
        </div>
      </div>
    </>
  );
}
