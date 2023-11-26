import {
  DialogTitle,
  Avatar,
  Button,
  Stack,
  FormControl,
  FormLabel,
  Input,
  CircularProgress,
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
import ClientCardContainer from './utils/ClientCardContainer';
import ServiceCardContainer from './utils/ServiceCardContainer';
import { isTimeRangeValid } from '../../../../utils/helperFunctions';
import AddNewClientModal from './modals/AddNewClientModal';
//-----------------------------------------
function formteTime(timestamp: Date) {
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  return `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
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

interface CustomEditorProps {
  scheduler: SchedulerHelpers;
}

export const clientSignal = signal({});
export const serviceSignal = signal({});
export const clientOrServiceChanged = signal(false);

//------------------------------------------------------------------------
export default function AddAppointment({ scheduler }: CustomEditorProps) {
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;
  const queryClient = useQueryClient();

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [openClientModal, setOpenClientModal] = useState(false);
  const [openServiceModal, setOpenServiceModal] = useState(false);

  const [note] = useState('');

  const [openAddClientModal, setOpenAddClientModal] = useState(false);

  const isUpdating = scheduler?.edited;
  const appointmentId = scheduler?.edited?.event_id; // if scheduler.edited true, means the modal was opened by clicking edit

  // get existing data ------------------------------------

  // get appointment object to get client and service id
  const editQuery = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: () => getAppointment(appointmentId),
    enabled: !!appointmentId,
  });

  // get both client and service objects to put in signals.
  const queries = useQueries({
    queries: [
      editQuery.data && {
        queryKey: ['client', editQuery?.data?.client_id],
        queryFn: () => getClient(editQuery.data.client_id),
      },
      editQuery.data && {
        queryKey: ['service'], //, editQuery.data.service_id
        queryFn: () => getService(editQuery.data.service_id),
      },
    ],
  });

  // client card
  let clientCard;
  if (queries[0].data) {
    const client1 = queries[0].data[0];

    clientCard = (
      <div style={{ display: 'flex', gap: '2rem' }}>
        <Avatar />
        <div>
          <h5 style={{ margin: 0 }}>{client1.Name}</h5>
          <p style={{ margin: 0 }}>{<small>{client1.phone}</small>}</p>
        </div>
      </div>
    );
  } else if (queries[0].isLoading && isUpdating) {
    clientCard = (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  } else {
    clientCard = (
      <ClientCardContainer setOpenClientModal={setOpenClientModal} />
    );
  }

  //service card
  let serviceCard;
  if (queries[1].data) {
    const service = queries[1].data[0];
    serviceSignal.value = queries[1].data[0]; // added on 14.11
    if (Object.keys(serviceSignal.value).length === 0) {
      serviceCard = (
        <>
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <Avatar src={service.img_url} />

            <div>{<h5 style={{ margin: 0 }}>{service.name}</h5>}</div>
          </div>
          <div>
            <Button variant="outlined" onClick={handleServiceList}>
              Change
            </Button>
          </div>
        </>
      );
    } else {
      serviceCard = (
        <>
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
        </>
      );
    }
  } else if (queries[0].isLoading && isUpdating) {
    serviceCard = (
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    );
  } else {
    serviceCard = (
      <ServiceCardContainer setOpenServiceModal={setOpenServiceModal} />
    );
  }
  // -------------------------------------------------------

  // retrieve date, start-time, end-time from var scheduler
  const { startTimeString, endTimeString, dateString } =
    setTimeValues(scheduler);

  const [startTime, setStartTime] = useState(startTimeString);
  const [endTime, setEndTime] = useState(endTimeString);
  const [date, setDate] = useState(dateString);

  //Mutation
  // create appointment
  const createAppointmentMutation = useMutation({
    mutationFn: createAppointment,
    onSuccess: (id) => {
      queryClient.invalidateQueries({
        queryKey: ['appointments'],
      });

      const added_updated_event = {
        event_id: id,
        title: clientSignal.value.Name,
        service: {
          name: serviceSignal.value.name,
          time: serviceSignal.value.duration,
        },
        start: new Date(`${date} ${startTime}`),
        end: new Date(`${date} ${endTime}`),
        description: note,
      };

      serviceSignal.value = {};
      clientSignal.value = {};

      scheduler.onConfirm(added_updated_event, 'create');
      scheduler.close();
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

    if (!isTimeRangeValid(startTime, endTime)) {
      setAlert(true);
      setAlertMessage('Enter a valid end time');
      return;
    }
    if (Object.keys(serviceSignal.value).length === 0) {
      setAlert(true);
      setAlertMessage('Select a service');
      // Service can't be left empty
      return;
    }
    if (Object.keys(clientSignal.value).length === 0 && !isUpdating) {
      setAlert(true);
      setAlertMessage('Select a client');
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

      const added_updated_event = {
        event_id: event.event_id,
        title: queries[0].data[0].Name,
        service: {
          name: serviceSignal.value.name,
          time: serviceSignal.value.duration,
        },
        start: new Date(`${date} ${startTime}`),
        end: new Date(`${date} ${endTime}`),
        description: note,
      };

      serviceSignal.value = {};
      scheduler.onConfirm(added_updated_event, 'edit');
      scheduler.close();
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
  };

  return (
    <>
      <div
        style={{
          margin: '1rem 2rem',
        }}>
        <form
          onSubmit={handleSubmit}
          // style={{ overflow: 'scroll' }}
        >
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
            {clientCard}
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
              {serviceCard}
            </div>

            {/* Note */}
            {/* <DialogTitle>Note</DialogTitle> */}
            {/* {queriedNote} */}

            {/* Buttons */}
            <Button
              type="submit"
              loading={
                createAppointmentMutation.isPending ||
                updateAppointmentMutation.isPending
              }>
              Submit
            </Button>
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
                {alertMessage}
              </Alert>
            )}
          </Stack>
        </form>

        {/* Modals */}
        <AddClientModal
          open={openClientModal}
          setOpen={setOpenClientModal}
          setOpenAddClientModal={setOpenAddClientModal}
        />
        <AddServiceModal
          open={openServiceModal}
          setOpen={setOpenServiceModal}
          startTime={startTime}
          setEndTime={setEndTime}
        />
        <AddNewClientModal
          open={openAddClientModal}
          setOpen={setOpenAddClientModal}
        />
      </div>
    </>
  );
  function handleDateChange(e: any) {
    const newDate = createDateObjectFromStamp(e.$d);
    setDate(newDate);
  }
  function handleServiceList() {
    setOpenServiceModal(true);
  }
}
