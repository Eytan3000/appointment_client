import {
  Button,
  DialogContent,
  DialogTitle,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy';
import ClientsList from '../utils/ClientsList';
import { Dispatch } from 'react';

export default function AddClientModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  // const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
  //     undefined,
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog layout={'fullscreen'}>
        <ModalClose />
        {/* <DialogTitle>Modal Dialog</DialogTitle> */}
        {/* <DialogContent> */}
        <ClientsList />
        {/* </DialogContent> */}
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
            <Button variant="plain">Add new Client</Button>
          </Stack>
        </div>
      </ModalDialog>
    </Modal>
  );
}
