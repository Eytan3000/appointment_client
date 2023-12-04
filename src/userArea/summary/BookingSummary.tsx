
import { Alert, Button, Card, Container, Typography } from '@mui/joy';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { formatDate } from '../../utils/helperFunctions';
import {
  checkOverlappingAppointment,
  checkOwnersClientExistsByPhone,
  createAppointment,
  createNewClient,
  getBusiness,
  getClientIdByPhone,
  getUser,
  sendNewAppointmentMessageClient,
} from '../../utils/http';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function BookingSummary() {
  const navigate = useNavigate();
  const [address, setAddress] = useState(''); // query address from business.
  const [isOverlapping, setIsOverlapping] = useState(false); // in case an appointment has been taken
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

  useEffect(() => {
    (async () => {
      const { address } = await getBusiness(owner_id);
      setAddress(address);

      const ownerName = await getUser(owner_id);
      const data = await checkOwnersClientExistsByPhone(phone, owner_id);
      if (data) {
        const { existsValue } = data;
        // console.log(existsValue);

        let clientId;
        if (existsValue === 0) {
          clientId = await createNewClient({
            name,
            phone,
            email: '',
            uid: owner_id,
          });
        } else {
          clientId = await getClientIdByPhone(phone, owner_id);
        }

        console.log(clientId);
        console.log(startTime, endTime, date, owner_id);
        //check for double booking before finalizing
        const isOverlapping = await checkOverlappingAppointment(
          startTime,
          endTime,
          date,
          owner_id
        );
        console.log(isOverlapping);

        // if no appointment was booked in the meantime:
        if (isOverlapping === 'Not overlapping') {
          console.log('create appointemnt');

          createAppointment({
            ownerId: owner_id,
            clientId,
            start: startTime,
            end: endTime,
            date,
            serviceId: serviceId.toString(),
            note: '',
          }).then((response) => {
            if (typeof response === 'number' && address !== '') {
              sendNewAppointmentMessageClient(
                name,
                ownerName,
                date,
                startTime,
                time,
                address,
                phone
              );
            }
          });
        } else {
          setIsOverlapping(true);
        }
      }
    })();
  }, []);


  if (serviceTitle && time && price && imgUrl) {
    if (isOverlapping)
      return (
        <>
          <div
            id="returning-div"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              maxWidth: '400px',
              marginTop: '4rem',
              marginInline: 'auto',
              padding: '4rem',
            }}>
            <Alert color="danger">
              Appointment already taken. Please try again.
            </Alert>
            <Button
              sx={{ mt: 2 }}
              onClick={() => navigate('/client/choose-time')}>
              Pick a new date
            </Button>
          </div>
        </>
      );
    else
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
                  *Any cancellations within 24 hours of the appointment will
                  incur the full cost.
                </Typography>
                {/* <Typography level="body-sm">
                  *Additional services such as painting, removal, and others
                  will be subject to an extra charge.
                </Typography> */}
              </Card>
            </div>
          </Container>
        </>
      );
  }
}
