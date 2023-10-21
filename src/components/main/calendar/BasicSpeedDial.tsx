import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';


// const actions = [
//   { icon: <FileCopyIcon />, name: 'New Appointment' },
//   { icon: <SaveIcon />, name: 'Share Booking Page' },
//   { icon: <PrintIcon />, name: 'Print' },
//   { icon: <ShareIcon />, name: 'Share' },
// ];

export default function BasicSpeedDial({setIsDrawerOpen}) {
  // const [openDrawer, setOpenDrawer] = React.useState(false);
  function handleClick(){
    setIsDrawerOpen(true);
  }
  return (
    <>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 80, right: 30 }}
        icon={<SpeedDialIcon />}
        onClick={handleClick}
        >


      </SpeedDial>
    </>
  );
}
