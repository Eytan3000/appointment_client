import {
  Box,
  Button,
  Modal,
  ModalClose,

  Sheet,
  Typography,
} from '@mui/joy';

export default function MenuModalNavbarMobile({
  open,
  setOpen,
  handleCreateAccount
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleCreateAccount: ()=>void;
}) {
  return (
    <Modal
      aria-labelledby="modal-title"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => setOpen(false)}
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Sheet
        variant="outlined"
        sx={{
          maxWidth: 500,
          borderRadius: 'md',
          p: 3,
          boxShadow: 'lg',
        }}>
        <ModalClose variant="plain" sx={{ m: 1 }} />
        <Box
          display="flex"
          flexDirection={'column'}
          justifyContent={'center'}
          gap={6}
          mr={3}
          p={7}>
          <Typography level="title-md">Features</Typography>
          <Typography level="title-md">For Teams</Typography>
          <Typography level="title-md">Resources</Typography>
          <Typography level="title-md">Pricing</Typography>

          <Button variant="outlined" size="lg" sx={{width:'130%'}} onClick={()=>{
            setOpen(false);
            handleCreateAccount();
          
          }}>
            Sign up
          </Button>

        </Box>
      </Sheet>
    </Modal>
  );
}
