import {
  DialogTitle,
  Avatar,
  Button,
  Divider,
  Stack,
  FormControl,
  FormLabel,
  Input,
} from '@mui/joy';
import { useState } from 'react';
import BasicDatePicker from './utils/BasicDatePicker';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';
import { useNavigate } from 'react-router-dom';
import AddClientModal from './modals/AddClientModal';
import AddServiceModal from './modals/AddServiceModal';
//-----------------------------------------
const client = {
  name: 'Eytan Krief',
  phone: '050-865-7032',
};
const service = {
  name: 'Manicure',
};

type Event = {
  event_id: number;
  title: string;
  start: Date;
  end: Date;
  description: string;
  color: string;
};

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
  // setEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

function createDateStringFromStamp(inputTimestamp: string) {
  // Parse the input timestamp into a Date object
  const date = new Date(inputTimestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function setTimeValues(scheduler: SchedulerHelpers) {
  const startTimeStamp = scheduler.state.start.value;
  const endTimeStamp = scheduler.state.end.value;

  const startTimeObj = new Date(startTimeStamp);
  const startTimeString = `${startTimeObj.getHours()}:00`;

  const endTimeObj = new Date(endTimeStamp);
  const endTimeString = `${endTimeObj.getHours()}:00`;

  const dateString = createDateStringFromStamp(startTimeStamp);

  return {
    startTimeString,
    endTimeString,
    dateString,
  };
}

function createDateObjectFromStamp(inputTimestamp: string) {
  // Parse the input timestamp into a Date object
  const date = new Date(inputTimestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}
//------------------------------------------------------------------------
export default function SpeedDialAddAppointment({
  scheduler,
}: // setEvents,
CustomEditorProps) {
  const navigate = useNavigate();
  const [note, setNote] = useState('');
  const [alert, setAlert] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);

  // console.log(scheduler.edited);
  // retrieve date, start-time, end-time from var scheduler
  const { startTimeString, endTimeString, dateString } =
    setTimeValues(scheduler);

  const [startTime, setStartTime] = useState(startTimeString);
  const [endTime, setEndTime] = useState(endTimeString);
  const [date, setDate] = useState(dateString);

  function handleEndTimeChange(e: ChangeEvent<HTMLInputElement>) {
    setAlert(false);
    setEndTime(e.target.value);
  }
  function handleStartTimeChange(e: ChangeEvent<HTMLInputElement>) {
    setStartTime(e.target.value);
  }
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (startTime.slice(0, 2) >= endTime.slice(0, 2)) {
      setAlert(true);
      return;
    }
    const event = scheduler.edited;

    // setEvents((prev) => {
    //   console.log(prev);
    //   return [
    //     ...prev,
    //     {
    //       event_id: 1,
    //       title: 'Event 2',
    //       start: new Date('2023/10/16 09:30'),
    //       end: new Date('8023/10/16 10:30'),
    //       description: 'A meeting with the team.',
    //       color: 'blue',
    //     },
    //   ];
    // });
    //goback

    // const added_updated_event = {
    //   event_id: 1,
    //   title: 'Event 2',
    //   start: new Date('2023/10/16 09:30'),
    //   end: new Date('8023/10/16 10:30'),
    //   description: 'A meeting with the team.',
    //   color: 'blue',
    // };
    // startTime
    // endTime
    // date

    const added_updated_event = {
      event_id: event?.event_id || Math.random(),
      title: 'Event 10',
      service: { name: 'Manicure', time: '01:30' },
      start: new Date(`${date} ${startTime}`),
      end: new Date(`${date} ${endTime}`),
      description: note,
    };

    scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
    scheduler.close();
  };

  function handleDateChange(e: any) {
    const newDate = createDateObjectFromStamp(e.$d);
    setDate(newDate);
  }
  function handleClientList() {
    setOpenClientModal(true);
  }
  function handleServiceList() {
    setOpenServiceModal(true);
  }

  return (
    <>
      <div style={{ margin: '1rem 2rem', fontFamily: 'Poppins' }}>
        <form onSubmit={handleSubmit} style={{ overflow: 'scroll' }}>
          <DialogTitle>Client</DialogTitle>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBlock: '1rem',
            }}>
            <div style={{ display: 'flex', gap: 20 }}>
              <div>
                <Avatar /> {/* client.image */}
              </div>
              <div>
                <h5 style={{ margin: 0 }}>{client.name}</h5>
                <p style={{ margin: 0 }}>{<small>{client.phone}</small>}</p>
              </div>
            </div>
            <div>
              <Button variant="outlined" onClick={handleClientList}>
                {/* Add/change */}
                {scheduler.edited ? 'Change' : 'Add'}
              </Button>
            </div>
          </div>
          <Divider />

          <Stack spacing={2} sx={{ marginTop: '0.5rem' }}>
            <FormControl>
              <FormLabel>Date</FormLabel>
              <BasicDatePicker
                date={date}
                handleDateChange={handleDateChange}
              />
            </FormControl>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 10,
              }}>
              <FormControl sx={{ width: '100%' }}>
                <FormLabel>Start Time</FormLabel>
                <Input
                  type="time"
                  defaultValue={startTime}
                  onChange={handleStartTimeChange}
                />
              </FormControl>

              <FormControl sx={{ width: '100%' }}>
                <FormLabel>End Time</FormLabel>
                <Input
                  type="time"
                  defaultValue={endTime}
                  onChange={handleEndTimeChange}
                />
              </FormControl>
            </div>
            <Divider />

            {/* service */}

            <DialogTitle>Service</DialogTitle>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <div>
                  <Avatar />
                </div>
                <div>{<h5 style={{ margin: 0 }}>{service.name}</h5>}</div>
              </div>
              <div>
                <Button variant="outlined" onClick={handleServiceList}>
                  Change
                </Button>
              </div>
            </div>
            <Divider />
            {/* Note */}
            <DialogTitle>Note</DialogTitle>
            <Input
              variant="soft"
              type="text"
              placeholder="Only you can see this note"
              onChange={(e) => setNote(e.target.value)}
            />

            <Button type="submit">Submit</Button>
            <Button onClick={scheduler.close} variant="plain">
              Cancel
            </Button>
            {/* <StyledButton type="submit" variant="full">
              Submit
            </StyledButton> */}
            {/* <StyledButton
              onClick={scheduler.close}
              style={{ width: '100%' }}
              variant="secondary">
              cancel
            </StyledButton> */}

            {alert && (
              <Alert
                startDecorator={<WarningIcon />}
                variant="soft"
                color="danger">
                {' '}
                Please enter a valid End Time.
              </Alert>
            )}
          </Stack>
        </form>
        <AddClientModal open={openClientModal} setOpen={setOpenClientModal} />
        <AddServiceModal
          open={openServiceModal}
          setOpen={setOpenServiceModal}
        />
      </div>
    </>
  );
}
