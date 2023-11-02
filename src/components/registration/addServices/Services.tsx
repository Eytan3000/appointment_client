import { AiOutlineCamera } from 'react-icons/ai';

import './addServices.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import ServiceCard from '../../main/calendar/addAppointment/utils/ServiceCard';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getAllServices } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import ServicesStack from './ServicesStack';
import BackArrow from '../../utilsComponents/BackArrow';
//-------------------------------------------
// const price = '180';
// const serviceTitle = 'Manicure';
// const time = '01:30';
// const description = `לק ג'ל בשיטה הרוסית`;
// const image = (
//   <AiOutlineCamera style={{}} className="service-card-camera-icon" />
// );
interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
}
//-------------------------------------------

export default function Services() {
  const navigate = useNavigate();

  const [areThereAnyServices, setAreThereAnyServices] = useState(false);

  // const { currentUser } = getAuth();

  // check if user comes from settings or signup
  const isInSettings = window.location.href.includes('settings');

  function handleAddService() {
    navigate('/add-service');
  }
  // function handleEditService() {
  //   navigate('/edit-service');
  // }
  function handleNext() {
    navigate('/work-hours');
  }
  return (
    <>
      {isInSettings && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6.5rem',
            marginTop: '-10px',
          }}>
          <BackArrow />
          {/* <Typography>services</Typography> */}
        </div>
      )}
      <Box
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        textAlign={'center'}>
        <Stack spacing={2} mb={2} mt={isInSettings ? 0 : 2}>
          <Typography level="h4">What services do you offer?</Typography>
          <Typography>
            List your services to help your clients book exactly what they need
          </Typography>
          <Button onClick={handleAddService} variant="plain">
            Add Service
          </Button>
        </Stack>
      </Box>
      <Divider />

      {/* Services Stack */}
      <Stack marginBottom={12}>
        <ServicesStack setAreThereAnyServices={setAreThereAnyServices} />
      </Stack>

      {/* Floating bar */}
      {!isInSettings && (
        <div className="floating-stripe">
          <Button
          disabled={!areThereAnyServices}
            onClick={handleNext}
            // variant="full"
            style={{
              paddingInline: 50,
              margin: '1rem',
            }}>
            Next
          </Button>
        </div>
      )}
    </>
  );
}
