import {
  DialogTitle,
  Avatar,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  Box,
} from '@mui/joy';
import { ChangeEvent, useState } from 'react';
import BasicDatePicker from './utils/BasicDatePicker';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import WarningIcon from '@mui/icons-material/Warning';
import Alert from '@mui/joy/Alert';

import AddClientModal from './modals/AddClientModal';
import AddServiceModal from './modals/AddServiceModal';
import { signal } from '@preact/signals-react';
import { useAuth } from '../../../../context/AuthContext';
import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  createAppointment,
  getAppointment,
  getClient,
  getService,
  updateAppointment,
} from '../../../../utils/http';
//-----------------------------------------
function formteTime(timestamp: Date) {
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
//-----------------------------------------

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}

function createDateStringFromStamp(inputTimestamp: string) {
  // Parse the input timestamp into a Date object
  const date = new Date(inputTimestamp);

  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function setTimeValues(scheduler: SchedulerHelpers) {
  const startTimeStamp = scheduler.state.start.value;
  const endTimeStamp = scheduler.state.end.value;

  const startTimeString = formteTime(startTimeStamp);
  const endTimeString = formteTime(endTimeStamp);
  const dateString = createDateStringFromStamp(startTimeStamp);

  // console.log(dateString);
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

interface Client {
  id: number;
  Name: string;
  phone: string;
  email: string;
  timestamp: string;
  owner_id: string;
}

export const clientSignal = signal({});
export const serviceSignal = signal({});

//------------------------------------------------------------------------
export default function AddAppointment({ scheduler }: CustomEditorProps) {
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;
  const queryClient = useQueryClient();
  const isClientSignal = Object.keys(clientSignal.value).length > 0;

  const [alert, setAlert] = useState(false);
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);
  const [openAreYouSureDelModal, setOpenAreYouSureDelModal] = useState(false);

  //---------- this is for editing existing appointment -----

  const appointmentId = scheduler?.edited?.event_id; // if scheduler.edited true, means the modal was opened by clicking edit

  // get appoingment object to get client and service id
  const editQuery = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => getAppointment(appointmentId),
  });

  // get both client and service objects to put in signals.
  const queries = useQueries({
    queries: [
      editQuery.data && {
        queryKey: ['client', editQuery.data.client_id],
        queryFn: () => getClient(editQuery.data.client_id),
      },
      editQuery.data && {
        queryKey: ['service', editQuery.data.service_id],
        queryFn: () => getService(editQuery.data.service_id),
      },
    ],
  });

  // if exist, put in signals
  if (queries[0].data) {
    clientSignal.value = queries[0].data[0];
    serviceSignal.value = queries[1].data[0];
  }
  //---------- up to here ---------------------------------

  // retrieve date, start-time, end-time from var scheduler
  const { startTimeString, endTimeString, dateString } =
    setTimeValues(scheduler);

  const [startTime, setStartTime] = useState(startTimeString);
  const [endTime, setEndTime] = useState(endTimeString);
  const [date, setDate] = useState(dateString);
  const [note, setNote] = useState('');

  //Mutation
  // create appointment
  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: (what) => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
      // console.log(what || 'success');
    },
  });

  // update appointment
  const updateAppointmentMutation = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  //Functions
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

    if (scheduler.edited) {
      //call update if it's an edit and finish
      updateAppointmentMutation.mutate({
        start: startTime,
        end: endTime,
        serviceId: serviceSignal.value.id,
        note,
        date,
        appointment_id: appointmentId,
      });
    } else {
      // if not edit, then it's a new appointent
      createAppointmentMutation.mutate({
        ownerId: uid!,
        clientId: clientSignal.value.id,
        start: startTime,
        end: endTime,
        date,
        serviceId: serviceSignal.value.id,
        note,
      });
    }
    const added_updated_event = {
      event_id: event?.event_id || Math.random(),
      title: clientSignal.value.Name,
      service: {
        name: serviceSignal.value.name,
        time: serviceSignal.value.duration,
      },
      start: new Date(`${date} ${startTime}`),
      end: new Date(`${date} ${endTime}`),
      description: note,
    };

    clientSignal.value = {};
    serviceSignal.value = {};

    scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
    scheduler.close();
  };

  return (
    <>
      <div style={{ margin: '1rem 2rem', fontFamily: 'Poppins' }}>
        <form onSubmit={handleSubmit} style={{ overflow: 'scroll' }}>
          <FormLabel>Client</FormLabel>

          {/* Client Card */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBlock: '1rem',
              border: '1px solid #cdd7e1',
              borderRadius: '10px',
              padding: '1rem',
              background: '#fbfcfe',
            }}>
            {isClientSignal && ( //checks if value of signal contains data
              <div style={{ display: 'flex', gap: 20 }}>
                <div>
                  <h5 style={{ margin: 0 }}>{clientSignal.value.Name}</h5>
                  <p style={{ margin: 0 }}>
                    {<small>{clientSignal.value.phone}</small>}
                  </p>
                </div>
              </div>
            )}

            <Button
              variant="outlined"
              onClick={handleClientList}
              sx={{
                width: !isClientSignal ? '100%' : null,
              }}>
              {/* Add/change Button*/}
              {isClientSignal ? 'Change' : 'Choose Client'}
            </Button>
          </div>

          {/* Date and Time */}
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
                  // defaultValue={endTime}
                  value={endTime}
                  onChange={handleEndTimeChange}
                />
              </FormControl>
            </div>

            {/* Service Card */}
            <DialogTitle>Service</DialogTitle>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',

                border: '1px solid #cdd7e1',
                borderRadius: '10px',
                padding: '1rem',
                background: '#fbfcfe',
              }}>
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Avatar src={serviceSignal.value.img_url} />

                <div>
                  {<h5 style={{ margin: 0 }}>{serviceSignal.value.name}</h5>}
                </div>
              </div>
              <div>
                <Button variant="outlined" onClick={handleServiceList}>
                  Change
                </Button>
              </div>
            </div>

            {/* Note */}
            <DialogTitle>Note</DialogTitle>
            <Input
              variant="soft"
              type="text"
              placeholder="Only you can see this note"
              onChange={(e) => setNote(e.target.value)}
            />

            {/* Buttons */}
            <Button type="submit">Submit</Button>
            <Button onClick={scheduler.close} variant="plain">
              Cancel
            </Button>

            {/* Alerts */}
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

        {/* Modals */}
        <AddClientModal open={openClientModal} setOpen={setOpenClientModal} />
        <AddServiceModal
          open={openServiceModal}
          setOpen={setOpenServiceModal}
          startTime={startTime}
          setEndTime={setEndTime}
        />

      </div>
    </>
  );
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
}
