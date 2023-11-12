import { Avatar, Button } from '@mui/joy';
import { useState } from 'react';
import { clientSignal } from '../AddAppointment';


export default function ClientCardContainer({ setOpenClientModal }) {
  const [isClientChosen, setIsClientChosen] = useState(false);

  function handleClientList() {
    setOpenClientModal(true);
    setIsClientChosen(true);
  }

  if (!isClientChosen)
    return (
      <Button
        variant="outlined"
        onClick={handleClientList}
        sx={{ width: '100%' }}>
        Choose Client
      </Button>
    );

  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Avatar />
      <div>
        <h5 style={{ margin: 0 }}>{clientSignal.value.Name}</h5>
        <p style={{ margin: 0 }}>{<small>{clientSignal.value.phone}</small>}</p>
      </div>
    </div>
  );
}
