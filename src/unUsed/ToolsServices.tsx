import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import ServiceCard from '../../calendar/addAppointment/utils/ServiceCard';
import BackArrow from '../../../utilsComponents/BackArrow';

export default function ToolsServices() {
  const navigate = useNavigate();
  function handleAddService() {
    navigate('/add-service');
  }
  function handleEditService() {
    navigate('/edit-service');
  }
  function handleNext() {
    navigate('/work-hours');
  }
  return (
    <>
      <BackArrow />
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        textAlign={'center'}>
        <Stack spacing={2} mb={2} mt={-2}>
          <Typography level="h4">Services</Typography>

          {/* <Button onClick={handleAddService} variant="plain">
            Add Service
          </Button> */}
        </Stack>
      </Box>
      {/* <Divider /> */}

      {/* Card */}
      <Stack marginBottom={12}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Stack>

      {/* Floating bar */}
      {/* <div className="floating-stripe">
        <Button
          onClick={handleNext}
          // variant="full"
          style={{
            paddingInline: 50,
            margin: '1rem',
          }}>
          Next
        </Button>
      </div> */}
    </>
  );
}
