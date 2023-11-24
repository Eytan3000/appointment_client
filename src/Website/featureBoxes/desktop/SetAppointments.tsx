import { Divider, Typography } from '@mui/joy';
import setAppointmentGIF from '../../../assets/video/SetAppointmentGIF.gif';
import './setAppointments.css';

export default function SetAppointments() {
  return (
    <div
      // style={{
      //   height: '28rem',
      //   background: ' rgba(162, 223, 253, 0.3)',
      //   borderRadius: '20px',
      //   boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
      //   padding: '6rem',
      //   display: 'flex',
      // }}
      className="setAppointments__main__div">
      <div
        className="setAppointments__typography__div"
        // style={{
        //   display: 'flex',
        //   flexDirection: 'column',
        //   gap: '4%',
        //   justifyContent: 'center',
        //   alignItems: 'center',
        //   marginLeft: '4rem',
        // }}
        >
        <Typography
          className={'setAppointments__Typography1'}
          level="body-xs"
          sx={{ color: '#0395de ' }}
          >
          APPOINTMENTS SCHEDULING
        </Typography>
        <Typography
        // sx={{ paddingRight: '4rem' }}
         fontSize={'40px'} level="h1" className={'setAppointments__Typography2'}>
          Set appointments and track time
        </Typography>
        <Divider
        className={'setAppointments__Typography__divider'}
          // sx={{
          //   width: '20%',
          //   height: '4px',
          //   borderRadius: '2px',
          //   background: '#0395de',
          // }}
        />
        <Typography
        // sx={{ paddingRight: '4rem' }}
         level="body-md"  className={'setAppointments__Typography3'}>
          Simplify your schedule: Easily set appointments and efficiently track
          time with our user-friendly tool, ensuring optimal productivity and
          organization.
        </Typography>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          // className='setAppointments__img'
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
// ------------------------------------------------------
// import { Typography } from '@mui/joy';
// import setAppointmentGIF from '../../assets/video/SetAppointmentGIF.gif';

// export default function SetAppointments() {
//   return (
//     <div
//       style={{
//         height: '80vh', //changed
//         background: ' rgba(162, 223, 253, 0.3)',
//         borderRadius: '20px',
//         boxShadow: '0px 0.1px 8px rgba(0, 0, 0, 0.1)',
//         // padding: '6rem',
//         display: 'flex',
//         flexDirection: 'column', // added
//       }}>
//       <div
//         style={{
//           marginBlock: '2rem',
//         }}>
//         <Typography sx={{ textAlign: 'center' }} level="h4">
//           Set appointments and track time
//         </Typography>
//       </div>

//       <div style={{ display: 'flex', justifyContent: 'center', height: '70%' }}>
//         <img
//           style={{
//             borderRadius: '20px',
//             border: '1px solid #d4dce5',
//             boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
//             zIndex: '1000', //added
//           }}
//           src={setAppointmentGIF}
//           alt="user set appointment"
//         />
//       </div>
//     </div>
//   );
// }
