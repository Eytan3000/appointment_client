import {
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy';
import ClientsList from '../utils/ClientsList';
import { Dispatch, SyntheticEvent } from 'react';


export default function AddClientModal({
  open,
  setOpen,
  setOpenAddClientModal

}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
  setOpenAddClientModal: Dispatch<React.SetStateAction<boolean>>;

}) {
  // const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
  //     undefined,
  // const p[]

  function handleOk(e: SyntheticEvent) {
    e.preventDefault();
    setOpen(false);
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog 
      // layout={'fullscreen'}
      layout={'center'}
      
      >
        <ModalClose />

        <ClientsList />

        <Button
          sx={{ mt: '3rem', mb: '1rem', marginInline: 'auto', width: 300 }}
          onClick={handleOk}>
          Ok
        </Button>
        <div
          style={{
            display: 'flex',
            // flexDirection: 'column',
            justifyContent: 'space-around',
            // textAlign:'center'
          }}>
          <Stack spacing={2} mt={2}>
            <Divider />

            <h4 style={{ color: '#7a848e', marginInline: 'auto' }}>Or</h4>
            <Button variant="plain" 
            onClick={()=>{
              setOpen(false); // closses this modal before opening the add new client modal.
              setOpenAddClientModal(true);
            }}
            >Add new Client</Button>
          </Stack>
        </div>
      </ModalDialog>
    </Modal>
  );
}
