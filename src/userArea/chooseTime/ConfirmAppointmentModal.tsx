import {
  Box,
  Button,
  Modal,
  ModalDialog,
  Typography,
} from '@mui/joy';
import { Dispatch } from 'react';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import ServiceCard from '../../components/main/calendar/addAppointment/utils/ServiceCard';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../../utils/helperFunctions';


export default function ConfirmAppointmentModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
    const navigate = useNavigate();

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
