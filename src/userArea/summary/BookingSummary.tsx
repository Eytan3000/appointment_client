import { Alert, Card, Container, Typography } from '@mui/joy';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { formatDate } from '../../utils/helperFunctions';
import {
  checkOwnersClientExistsByPhone,
  createAppointment,
  createNewClient,
  getBusiness,
} from '../../utils/http';
import { useEffect, useState } from 'react';

function test() {
  appointmentSignal.value.uid = 'nbl4kT3L2pNLEcZ1W4zQAzfcUsA3';
  appointmentSignal.value.client = {
    name: 'EYTAN KRIEF',
    uid: 'DWDRRyhCoXToxV95DgBcNEll4Nl1',
    phone: '333333344333333',
  };
  appointmentSignal.value.service = {
    id: 1,
    name: 'Service 1',
    description: 'Service 1',
    duration: 90,
    price: '180.00',
    owner_id: 'oWYIFCBCsSYueiUuzl3VyaWJJLq2',
    img_url:
      'https://firebasestorage.googleapis.com/v0/b/appointments-770cc.appspot.com/o/images%2FoWYIFCBCsSYueiUuzl3VyaWJJLq2_e18d79fe-45fd-40c9-90c7-b67febfe06d2%7D?alt=media&token=f53024f2-e252-45d7-8013-fd3738a0a22b',
  };
  appointmentSignal.value.appointment = {
    start: '14:00',
    end: '15:30',
    date: '2023-11-19',
  };
}

// test();

export default function BookingSummary() {
  const [address, setAddress] = useState(); // query address from business.
  if (
    !appointmentSignal.value.uid ||
    !appointmentSignal.value.client ||
    !appointmentSignal.value.service ||
    !appointmentSignal.value.appointment
  )
    return (
      <Container>
        <div style={{ marginTop: '20vh' }}>
          <Alert color="danger">Oops! Something went wrong.</Alert>
        </div>
      </Container>
    );

  const phone = appointmentSignal.value.client.phone;
  const name = appointmentSignal.value.client.name;
  const owner_id = appointmentSignal.value.uid;

  const date = appointmentSignal.value.appointment.date;

  const formattedDate = formatDate(date);
  const startTime = appointmentSignal.value.appointment.start;
  const endTime = appointmentSignal.value.appointment.end;

  const serviceTitle = appointmentSignal.value.service?.name;
  const serviceId = appointmentSignal.value.service?.id;
  console.log(appointmentSignal.value);
  const time = appointmentSignal.value.service?.duration;
  const price = appointmentSignal.value.service?.price;
  const imgUrl = appointmentSignal.value.service?.img_url;

  //check if user exists (by phone)-if not, insert him into sql db.
  useEffect(() => {
    (async () => {
      const data = await checkOwnersClientExistsByPhone(phone, owner_id);
      if (data) {
        const { existsValue } = data;
        console.log(existsValue);
        if (existsValue === 0) {
          const clientId = await createNewClient({
            name,
            phone,
            email: '',
            uid: owner_id,
          });
          createAppointment({
            ownerId: owner_id,
            clientId,
            start: startTime,
            end: endTime,
            date,
            serviceId,
            note: '',
          });
        }
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { address } = await getBusiness(owner_id);
      setAddress(address);
    })();
  }, []);

  if (serviceTitle && time && price && imgUrl) {
    return (
      <>
        <Container>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginInline: '2rem',
            }}>
            <Typography
              sx={{ margin: '2rem auto', mt: 3, mb: 2 }}
              level="h3"
              color="primary">
              Appointment Confirmation{' '}
            </Typography>

            <ServiceCard
              serviceTitle={serviceTitle}
              time={time}
              price={price}
              imgUrl={imgUrl}
            />
            <Card sx={{ mt: 2 }}>
              <Typography level="body-lg">
                Your appointment is scheduled for:
              </Typography>
              <Typography mt={2} level="body-md">
                <b>Date:</b> {formattedDate}
              </Typography>
              <Typography level="body-md">
                <b> Time: </b> {startTime} - {endTime}
              </Typography>
              <Typography level="body-md">
                {' '}
                <b> Address:</b> {address}
              </Typography>

              <Typography mt={2} level="body-sm">
                *Please make sure to arrive on time.
              </Typography>
              <Typography level="body-sm">
                *Any cancellations within 24 hours of the appointment will incur
                the full cost.
              </Typography>
              <Typography level="body-sm">
                *Additional services such as painting, removal, and others will
                be subject to an extra charge.
              </Typography>
            </Card>
          </div>
        </Container>
      </>
    );
  }
}
