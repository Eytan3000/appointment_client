// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import FormControl from '@mui/joy/FormControl';
import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import { ChangeEvent, useEffect, useState } from 'react';
import { useAuth } from '../../../../../context/AuthContext';
import { getAllOwnersClients } from '../../../../../utils/http';
import { clientSignal } from '../AddAppointment';
import { useQueryClient } from '@tanstack/react-query';


interface Client {
  id: string;
  Name: string;
  // Add other properties as needed
}


export default function ClientsList() {
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<Client[]>([]);
  const loading = open && options.length === 0;
  // const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      const clients = await getAllOwnersClients(uid!);
      console.log(clients);
      if (active) {
        //list opens
        setOptions([...clients]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  function handleChange(event: ChangeEvent, newValue: Client | null) {
    clientSignal.value = newValue as Client;
    queryClient.invalidateQueries({ queryKey: ['client', newValue?.id] });
  }

  // function handleSubmit() {
  //   setOpen(false);
  // }
  return (
    <FormControl id="clients-list">
      <h1 style={{ marginInline: 'auto' }}>Choose Client</h1>
      <Autocomplete
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
        onChange={handleChange}
        sx={{ marginInline: 'auto', width: 300 }}
        placeholder="Existing client"
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.name === value.name}
        // isOptionEqualToValue={(option, value) => option.Name === value.Name}
        getOptionLabel={(option) => option.Name}
        options={options}
        loading={loading}
        endDecorator={
          loading ? (
            <CircularProgress
              size="sm"
              sx={{ bgcolor: 'background.surface' }}
            />
          ) : null
        }
      />
    </FormControl>
  );
}
