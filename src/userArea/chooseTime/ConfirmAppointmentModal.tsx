import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
  Typography,
} from '@mui/joy';
import { Dispatch, SyntheticEvent } from 'react';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helperFunctions';

// function formatDate(inputDate: string) {
//   // Create an array of month names for better readability
//   const monthNames = [
//     'January',
//     'February',
//     'March',
//     'April',
//     'May',
//     'June',
//     'July',
//     'August',
//     'September',
//     'October',
//     'November',
//     'December',
//   ];

//   // Parse the input date string
//   const date = new Date(inputDate);

//   // Get the day, month, and year
//   const day = date.getDate();
//   const month = monthNames[date.getMonth()];
//   const year = date.getFullYear();

//   // Add the ordinal suffix to the day
//   const dayWithSuffix = addOrdinalSuffix(day);

//   // Get the day of the week
//   const dayOfWeek = getDayOfWeek(date.getDay());

//   // Construct the formatted date string
//   const formattedDate = `${dayOfWeek}, ${month} ${dayWithSuffix}, ${year}.`;

//   return formattedDate;
// }
// // Function to add ordinal suffix to the day
// function addOrdinalSuffix(day: number) {
//   if (day >= 11 && day <= 13) {
//     return day + 'th';
//   }

//   switch (day % 10) {
//     case 1:
//       return day + 'st';
//     case 2:
//       return day + 'nd';
//     case 3:
//       return day + 'rd';
//     default:
//       return day + 'th';
//   }
// }

// // Function to get the day of the week
// function getDayOfWeek(dayIndex: number) {
//   const dayNames = [
//     'Sunday',
//     'Monday',
//     'Tuesday',
//     'Wednesday',
//     'Thursday',
//     'Friday',
//     'Saturday',
//   ];
//   return dayNames[dayIndex];
// }

export default function ConfirmAppointmentModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

  function handleOk(e: SyntheticEvent) {
    e.preventDefault();
    setOpen(false);
  }
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog
        aria-labelledby="nested-modal-title"
        aria-describedby="nested-modal-description"
        sx={(theme) => ({
          [theme.breakpoints.only('xs')]: {
            top: 'unset',
            bottom: 0,
            left: 0,
            right: 0,
            borderRadius: 0,
            transform: 'none',
            maxWidth: 'unset',
          },
        })}>
        <Typography id="nested-modal-title" level="h2">
          Schedule appointment
        </Typography>
        <ServiceCard
          serviceTitle={appointmentSignal.value.service?.name}
          time={appointmentSignal.value.service?.duration}
          price={appointmentSignal.value.service?.price}
          imgUrl={appointmentSignal.value.service?.img_url}
        />
        {appointmentSignal.value.appointment && 
        <div style={{ marginInline: '1rem' }}>
          <Typography id="nested-modal-description" textColor="text.tertiary">
            {formatDate(appointmentSignal.value.appointment.date)}
            <br />
            {appointmentSignal.value.appointment.start} -
            {appointmentSignal.value.appointment.end}
          </Typography>
        </div>
        }
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            gap: 1,
            flexDirection: { xs: 'column', sm: 'row-reverse' },
          }}>
          <Button
            variant="solid"
            color="primary"
            onClick={handleContinue}>
            Continue
          </Button>
          <Button
            variant="outlined"
            color="neutral"
            onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </ModalDialog>
    </Modal>
  );
function handleContinue(){
    setOpen(false);
    navigate('/client/auth');
  }
}
