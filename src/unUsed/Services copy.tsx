import { AiOutlineCamera } from 'react-icons/ai';

import './addServices.css';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from '@mui/joy';
import ServiceCard from '../../main/calendar/addAppointment/utils/ServiceCard';
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { getAllServices } from '../../../utils/http';
import { useQuery } from '@tanstack/react-query';
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
  const { currentUser } = getAuth();

  const [services, setServices] = useState<Service[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllServices(currentUser.uid)
      .then((services) => {
        setLoading(false);
        setServices(services);
      })
      .catch((err) => console.log(err));
  }, []);

// // Tanstack Query:
//   const servicesQuery = useQuery({
//     queryKey: ["services"],
//     queryFn: ()=>getAllServices(currentUser.uid).then((services)=>[...services]),
//   })

  // if(servicesQuery.isLoading) setLoading(true);

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
          <Button onClick={handleAddService} variant="plain">
            Add Service
          </Button>
        </Stack>
      </Box>
      <Divider />

      {/* Card */}
      <Stack marginBottom={12}>
        {loading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
            }}>
            <CircularProgress size="lg" variant="soft" />
          </div>
        )}
        {services?.map((service, index) => (
          <ServiceCard
            keyNum={index}
            serviceTitle={service.name}
            description={service.description}
            time={service.duration}
            price={service.price}
          />
        ))}
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
