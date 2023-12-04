import { Avatar, Button } from '@mui/joy';
import { useState } from 'react';
import { serviceSignal } from '../AddAppointment';

interface Props{
  setOpenServiceModal:React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ServiceCardContainer({ setOpenServiceModal }:Props) {
    const [isServiceChosen, setIsServiceChosen] = useState(false);

  const defaultServic = {
    img_url: '',
    name: 'default',
  };

  function handleServiceList() {
    setOpenServiceModal(true);
    setIsServiceChosen(true);
  }
if(!isServiceChosen){
    return (
        <>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Avatar src={defaultServic.img_url} />
    
            <div>{<h5 style={{ margin: 0 }}>{defaultServic.name}</h5>}</div>
          </div>
          <div>
            <Button variant="outlined" onClick={handleServiceList}>
              Change
            </Button>
          </div>
        </>
      );
}

return <>
    <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Avatar src={serviceSignal.value.img_url} />

          <div>{<h5 style={{ margin: 0 }}>{serviceSignal.value.name}</h5>}</div>
        </div>
        <div>
          <Button variant="outlined" onClick={handleServiceList}>
            Change
          </Button>
        </div>
</>
  
}
