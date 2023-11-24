import {
  Box,
  Button,
  DialogContent,
  DialogTitle,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Typography,
} from '@mui/joy';

export default function MenuModalNavbarMobile({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
        {/* <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
Menu          </Typography> */}
        {/* <Typography id="modal-desc" textColor="text.tertiary">
            Make sure to use <code>aria-labelledby</code> on the modal dialog with an
            optional <code>aria-describedby</code> attribute.
          </Typography> */}

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

          <Button variant="outlined" size="lg" sx={{width:'130%'}}>
            Sign up
          </Button>

          <Button
            // variant="plain"
            sx={{width:'130%'}}
            size="lg">
            Log In
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
}
