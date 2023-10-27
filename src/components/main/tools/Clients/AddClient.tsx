import { Button, Input, Stack, Typography } from '@mui/joy';
import BackArrow from '../../../utilsComponents/BackArrow';

export default function AddClient() {
  return (
    <>
      <BackArrow />

      <div style={{ marginInline: '2rem', height: '90vh' }}>
        <Stack spacing={3} mt={6} height="100%" display={'flex'}>
          <Typography textAlign={'center'} level="h4">
            Add New Client
          </Typography>

          <div />
          <Input type="text" placeholder="Name" />
          <Input type="tel" placeholder="Phone" />
          <Input type="email" placeholder="email" />

          <Button
          // style={{ marginTop: 'auto' }}
          >
            Save
          </Button>
        </Stack>
      </div>
    </>
  );
}
