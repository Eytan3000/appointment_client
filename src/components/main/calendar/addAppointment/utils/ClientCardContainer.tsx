import { Avatar, Button } from '@mui/joy';
import React, { useState } from 'react';
import { clientSignal } from '../AddAppointment';

interface Props {
  setOpenClientModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Client {
  Name: string;
  phone: string;
  // Add other properties as needed
}

export default function ClientCardContainer({ setOpenClientModal }:Props) {
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

    const client: Client = clientSignal.value as Client;


  return (
    <div style={{ display: 'flex', gap: '2rem' }}>
      <Avatar />
      <div>
        <h5 style={{ margin: 0 }}>{client.Name}</h5>
        <p style={{ margin: 0 }}>{<small>{client.phone}</small>}</p>
      </div>
    </div>
  );
}
