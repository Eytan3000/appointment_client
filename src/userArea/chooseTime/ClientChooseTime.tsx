import { Container, Typography } from '@mui/joy';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import TimePicker from './TimePicker';

export default function ClientChooseTime() {
  const { service } = appointmentSignal.value;

  return (
    <>
      <Container>
        <Typography mt={'2rem'} level="h3" textAlign="center">
          Schedule
        </Typography>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
          <ServiceCard
            serviceTitle={service!.name}
            time={service!.duration}
            price={service!.price}
            imgUrl={service!.img_url}
          />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <TimePicker />
        </div>
      </Container>
    </>
  );
}
