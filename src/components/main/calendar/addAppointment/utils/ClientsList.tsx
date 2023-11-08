import FormControl from '@mui/joy/FormControl';

import Autocomplete from '@mui/joy/Autocomplete';
import CircularProgress from '@mui/joy/CircularProgress';
import { useEffect, useState } from 'react';
import { Button } from '@mui/joy';
import { clients } from '../../../../../utils/db';
import { useAuth } from '../../../../../context/AuthContext';

// function sleep(duration: number): Promise<void> {
//   return new Promise<void>((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, duration);
//   });
// }
function sleep(uid: string): Promise<void> {
  getAllOwnersClients
}

export default function ClientsList() {

  const {currentUser} = useAuth() || {};
  const uid = currentUser?.uid;

  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<typeof clients>([]);
  const loading = open && options.length === 0;
  const [selectedOption, setSelectedOption] = useState(null);
  
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3); // For demo purposes.

      if (active) {
        // setOptions([...topFilms]);
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

  function handleChange(event, newValue) {
    setSelectedOption(newValue); // Update the selected option in state
    // set newValue to redux 
  }
  return (
    <FormControl id="clients-list">
      <h1 style={{ marginInline: 'auto' }}>Choose Client</h1>
      <Autocomplete
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
        getOptionLabel={(option) => option.name}
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
      <Button sx={{ mt: '3rem', mb: '1rem', marginInline: 'auto', width: 300 }}>
        Ok
      </Button>
    </FormControl>
  );
}
