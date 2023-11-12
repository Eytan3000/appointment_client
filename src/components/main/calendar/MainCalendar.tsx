import { Scheduler } from '@aldabil/react-scheduler';
import './MainCalendar.css';
// import { TextField, Button, DialogActions } from "@mui/material";
// import type {
//   ProcessedEvent,
//   SchedulerHelpers
// } from "@aldabil/react-scheduler/types";
import AddAppointment from './addAppointment/AddAppointment';
import BottomAppBar from '../BottomAppBar';
// import { useQueries, useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../context/AuthContext';
import {
  deleteAppointment,
  fetchAppointments,
  // getAllAppointments,
  // getAllOwnersClients,
  // getAllServices,
  // getClient,
  // getService,
  // readAllOwnerAppointments,
} from '../../../utils/http';
import { signal } from '@preact/signals-react';
// import { CircularProgress } from '@mui/joy';
import { minutesToTimeDuration } from '../../../utils/helperFunctions';
import { CircularProgress } from '@mui/joy';

//--------------------------------------------------

// const events = [
//   {
//     event_id: 1,
//     title: 'Event 1',
//     start: new Date('2023/10/17 09:30'),
//     end: new Date('8023/10/17 10:30'),
//     description: 'A meeting with the team.',
//     color: '#008000',
//   },
//   {
//     event_id: 2,
//     title: 'Event 2',
//     start: new Date('2023/10/10 10:00'),
//     end: new Date('2023/10/10 11:00'),
//   },
//   {
//     event_id: 2,
//     title: 'Event 2',
//     start: new Date('2023/10/15 10:00'),
//     end: new Date('2023/10/15 11:00'),
//   },
// ];
//--------------------------------------------------
export const eventsSignal = signal([]);

// function addDay(dateString: string) {
//   const originalDate = new Date(dateString);

//   // Adding one day
//   const nextDay = new Date(originalDate);
//   nextDay.setDate(originalDate.getDate() + 1);

//   // Formatting the result as "YYYY-MM-DD"
//   const formattedNextDay = `${nextDay.getFullYear()}-${(nextDay.getMonth() + 1)
//     .toString()
//     .padStart(2, '0')}-${nextDay.getDate().toString().padStart(2, '0')}`;

//   return formattedNextDay;
// }
// const [events, setEvents] = useState(
//   //   [
//   //   {
//   //     event_id: 1,
//   //     title: 'Event 1',
//   //     start: new Date('2023/10/17 09:30'),
//   //     end: new Date('8023/10/17 10:30'),
//   //     service: { name: 'Manicure', time: '01:30' },
//   //     description: 'A meeting with the team.',
//   //     color: '#008000',
//   //   },
//   //   {
//   //     event_id: 2,
//   //     title: 'Event 2',
//   //     start: new Date('2023/11/09 09:30'),
//   //     end: new Date('8023/11/09 10:30'),
//   //     service: { name: 'Manicure', time: '01:30' },
//   //     description: 'A meeting with the team.',
//   //     // color: '#008000',
//   //   },
//   // ]

//   [
//     {
//         event_id: 1,
//         title: "eytan",
//         start: "2023-11-05T07:11:00.000Z",
//         end: "2023-11-05T08:00:00.000Z",
//         service: { name: 'Manicure', time: '01:30' },
//         description: ""
//     },
//     {
//         event_id: 2,
//         title: "eytan",
//         start: "2023-11-08T14:00:00.000Z",
//         end: "2023-11-08T15:00:00.000Z",
//         service: { name: 'Manicure', time: '01:30' },
//         description: ""
//     },
//     {
//         event_id: 3,
//         title: "eytan",
//         start: "2023-11-08T15:00:00.000Z",
//         end: "2023-11-08T16:00:00.000Z",
//         service: { name: 'Manicure', time: '01:30' },
//         description: ""
//     }
// ]
// );
//--------------------------------------------------
export default function MainCalendar() {
  console.log('render');
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;
  console.log('uid: ', uid);

  // // get all user's appointments
  // const appointments = useQuery({
  //   queryKey: ['appointments'],
  //   queryFn: () => getAllAppointments(uid!),
  //   enabled: !!uid,
  // });

  // //  both queries for getting client and services for each appointment:
  // const queries = useQueries({
  //   queries: [
  //     ...(appointments.data ?? []).map((appointment) => {
  //       return {
  //         queryKey: ['client', appointment.client_id],
  //         queryFn: () => getClient(appointment.client_id),
  //       };
  //     }),

  //     ...(appointments.data ?? []).map((appointment) => {
  //       return {
  //         queryKey: ['service', appointment.service_id],
  //         queryFn: () => getService(appointment.service_id),
  //       };
  //     }),
  //   ],
  // });

  // if (appointments.data !== undefined) {
  //   const clientsAndServicesArr = queries.map((query) => query.data).flat(); // returning [Array(1),Array(1),....] so i used flat.

  //   const clientsArr = clientsAndServicesArr.slice(
  //     0,
  //     clientsAndServicesArr.length / 2
  //   );
  //   const servicesArr = clientsAndServicesArr.slice(
  //     clientsAndServicesArr.length / 2
  //   );

  //   if (
  //     appointments.data.length > 0 &&
  //     clientsArr[0] !== undefined &&
  //     servicesArr[0] !== undefined
  //   ) {
  //     eventsSignal.value = appointments.data.map((appointment, index) => {
  //       const appointmentDate = addDay(appointment.date.split('T')[0]);

  //       return {
  //         event_id: appointment.id,
  //         title: clientsArr[index].Name,
  //         start: new Date(`${appointmentDate} ${appointment.start}`),
  //         end: new Date(`${appointmentDate} ${appointment.end}`),
  //         // service: servicesArr[index].name,
  //         service: {
  //           name: servicesArr[index].name,
  //           time: servicesArr[index].duration,
  //         },
  //         description: '',
  //       };
  //     });
  //   }
  // }

  // if (
  //   queries.length === 0 ||
  //   queries[0].data === undefined ||
  //   queries[1].data === undefined
  // ) {
  //   return <CircularProgress />;
  // }

  // if (appointments.isError) {
  //   return <h1>error eytan</h1>;
  // }
  // // queries[1].isError
  // if (queries[0].isError) {
  //   return <h1>error eytan</h1>;
  // }

  // // console.log(queries);
  // // Check if query frome useQueries isn't empty.
  // if (queries.length > 0 && queries[0].data && queries[1].data) {
  if (uid) {
    return (
      <>
        <Scheduler
          view="week"
          getRemoteEvents={() => fetchAppointments(uid)}
          // events={eventsSignal.value}
          week={{
            weekDays: [0, 1, 2, 3, 4, 5],
            weekStartOn: 0,
            startHour: 6,
            endHour: 24,
            navigation: true,
            disableGoToDay: false,
            step: 60,
          }}
          stickyNavitation
          hourFormat="24"
          // to check
          // step: 15,
          // eventRenderer={}
          // fields={}
          // navigationPickerProps={}
          // all in 'r'
          draggable={false}
          customEditor={(scheduler) => {
            // console.log(scheduler);
            return <AddAppointment scheduler={scheduler} />;
          }}
          viewerExtraComponent={(fields, event) => {
            return (
              <div>
                <p>Service: {event.service.name}</p>
                <p>Duration: {minutesToTimeDuration(event.service.time)}</p>
                {event.note !== '' && <p>Note: {event.note}</p>}
              </div>
            );
          }}
          onDelete={(id) => {
            return new Promise((resolve, reject) => {
              deleteAppointment(id)
                .then(() => {
                  eventsSignal.value = eventsSignal.value.filter(
                    (event) => event.event_id !== id
                  );
                  resolve(id);
                })
                .catch((err) => {
                  console.log(err);
                  reject(id);
                });
            });
          }}
        />
        {/* <BasicSpeedDial setIsDrawerOpen={setIsDrawerOpen} /> */}
        {/* <TemporaryDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      /> */}
        <BottomAppBar />
      </>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100vh',
        alignItems: 'center',
      }}>
      <CircularProgress />
    </div>
  );
}
