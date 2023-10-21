import { Scheduler } from '@aldabil/react-scheduler';
import { useState } from 'react';
import './MainCalendar.css';
// import { TextField, Button, DialogActions } from "@mui/material";
// import type {
//   ProcessedEvent,
//   SchedulerHelpers
// } from "@aldabil/react-scheduler/types";
import AddAppointment from './addAppointment/AddAppointment';
import TemporaryDrawer from './addAppointment/utils/TemporaryDrawer';
import BottomAppBar from '../BottomAppBar';
import BasicSpeedDial from './BasicSpeedDial';

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

//--------------------------------------------------
export default function MainCalendar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [events, setEvents] = useState([
    {
      event_id: 1,
      title: 'Event 1',
      start: new Date('2023/10/17 09:30'),
      end: new Date('8023/10/17 10:30'),
      service: { name: 'Manicure', time: '01:30' },
      description: 'A meeting with the team.',
      color: '#008000',
    },
  ]);

  return (
    <>
      <Scheduler
        view="week"
        events={events}
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
        // getRemoteEvents={}
        // navigationPickerProps={}
        // all in 'r'
        draggable={false}
        customEditor={(scheduler) => (
          <AddAppointment
            scheduler={scheduler}
            // setEvents={setEvents}
          />
        )}
        viewerExtraComponent={(fields, event) => {
          return (
            <div>
              <p>Service: {event.service.name}</p>
              <p>Time: {event.service.time}</p>
            </div>
          );
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
