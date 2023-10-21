import { AiOutlineCamera } from 'react-icons/ai';

import './addServices.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import ServiceCard from '../../main/calendar/addAppointment/utils/ServiceCard';
//-------------------------------------------
// const price = '180';
// const serviceTitle = 'Manicure';
// const time = '01:30';
// const description = `לק ג'ל בשיטה הרוסית`;
// const image = (
//   <AiOutlineCamera style={{}} className="service-card-camera-icon" />
// );
//-------------------------------------------

export default function Services() {
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
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        textAlign={'center'}>
        <Stack spacing={2} mb={2} mt={2}>
          <Typography level="h4">What services do you offer?</Typography>
          <Typography>
            List your services to help your clients book exactly what they need
          </Typography>
          <Button onClick={handleAddService} variant="plain">Add Service</Button>
        </Stack>
      </Box>
      <Divider />
      
      {/* Card */}
      <Stack marginBottom={12}>
        <ServiceCard />
        <ServiceCard />
        <ServiceCard />
      </Stack>
      
      {/* Floating bar */}
      <div className="floating-stripe">
        <Button
          onClick={handleNext}
          // variant="full"
          style={{
            paddingInline: 50,
            margin: '1rem',
          }}>
          Next
        </Button>
      </div>
    </>
  );
}
