import { Scheduler } from '@aldabil/react-scheduler';

const events = [
  {
    event_id: 1,
    title: 'Event 1',
    start: new Date('2023/10/8 09:30'),
    end: new Date('8023/10/8 10:30'),
    description: 'A meeting with the team.',
    color: '#008000',
  },
  {
    event_id: 2,
    title: 'Event 2',
    start: new Date('2023/10/10 10:00'),
    end: new Date('2023/10/10 11:00'),
  },
];

export default function MainCalendar() {
  return <Scheduler view="week" events={events} week={{ 
    // weekDays: [0, 1, 2, 3, 4, 5], 
    weekStartOn: 0, 
    startHour: 9,
    endHour: 17,
    step: 15,
    // cellRenderer?:(props: CellProps) => JSX.Element,
    navigation: true,
    disableGoToDay: false
    }}/>;
}
