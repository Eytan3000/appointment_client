import { Alert, CircularProgress, Container, Typography } from '@mui/joy';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../../utils/http';
import { useNavigate, useParams } from 'react-router-dom';
import { signal } from '@preact/signals-react';
import { AppointmentSignal, Service } from '../../utils/Interfaces';

export const appointmentSignal: AppointmentSignal = signal({});

export default function ClientChooseService() {
  const navigate = useNavigate();
  const { uid } = useParams();

  if(uid) appointmentSignal.value.uid = uid;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllServices(uid!),
    enabled: !!uid,
  });

  let services;
  if (isLoading) {
    services = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '50vh',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }

  if (isError) {
    services = <Alert color="danger">We're experiencing a problem</Alert>;
  }
  if (data) {
    services = data.map((service: Service) => (
      <div key={service.id} onClick={() => handleClick(service)}>
        <ServiceCard
          serviceTitle={service.name}
          time={service.duration}
          price={service.price}
          imgUrl={service.img_url}
        />
      </div>
    ));
  }

  return (
    <>
      <Container>
        <Typography mt={'2rem'} level="body-lg" textAlign="center">
          Please choose your desired service
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
          {services}
        </div>
      </Container>
    </>
  );

  function handleClick(service: Service) {
    console.log(service);
    appointmentSignal.value.service = service;
    navigate(`/client/choose-time`);
  }
}
