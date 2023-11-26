import './workHours.css';
import Checkbox from '@mui/joy/Checkbox';
import { Button, Input, Stack, Typography } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import { SyntheticEvent, useState } from 'react';
import { createWeeklySchedule, createWorkweek } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import NavbarRegistration from '../../../Website/navbar/NavbarRegistration';

interface DaylySchedule {
  name: string;
  isWorkDay: boolean;
  startTime: string;
  endTime: string;
  timeSlotDuration: string;
}
interface Workweek {
  sunday: DaylySchedule;
  monday: DaylySchedule;
  tuesday: DaylySchedule;
  wednesday: DaylySchedule;
  thursday: DaylySchedule;
  friday: DaylySchedule;
  saturday: DaylySchedule;
  workweek_id: number;
}

export default function WorkHours() {
  const navigate = useNavigate();
  const { currentUser, isMobile } = useAuth() || {};
  const uid = currentUser.uid;

  const [sunday, setSunday] = useState(true);
  const [monday, setMonday] = useState(true);
  const [tuesday, setTuesday] = useState(true);
  const [wednesday, setWednesday] = useState(true);
  const [thursday, setThursday] = useState(true);
  const [friday, setFriday] = useState(false);
  const [saturday, setSaturday] = useState(false);

  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [timeSlotDuration, setTimeSlotDuration] = useState('01:30');

  const [loading, setLoading] = useState(false);

  const weekDays = [
    { day: 'sunday', defaultChecked: true, setFunction: setSunday },
    { day: 'monday', defaultChecked: true, setFunction: setMonday },
    { day: 'tuesday', defaultChecked: true, setFunction: setTuesday },
    { day: 'wednesday', defaultChecked: true, setFunction: setWednesday },
    { day: 'thursday', defaultChecked: true, setFunction: setThursday },
    { day: 'friday', defaultChecked: false, setFunction: setFriday },
    { day: 'saturday', defaultChecked: false, setFunction: setSaturday },
  ];

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    setLoading(true);
    let response = await createWorkweek(uid);
    const workweekId = response.workweekId;

    const weekDays: Workweek = {
      sunday: {
        name: 'sunday',
        isWorkDay: sunday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      monday: {
        name: 'monday',
        isWorkDay: monday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      tuesday: {
        name: 'tuesday',
        isWorkDay: tuesday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      wednesday: {
        name: 'wednesday',
        isWorkDay: wednesday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      thursday: {
        name: 'thursday',
        isWorkDay: thursday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      friday: {
        name: 'friday',
        isWorkDay: friday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      saturday: {
        name: 'saturday',
        isWorkDay: saturday,
        startTime,
        endTime,
        timeSlotDuration,
      },
      workweek_id: workweekId,
    };

    response = await createWeeklySchedule(weekDays);

    setLoading(false);
    navigate('/main-calendar');
  }
  function handleAdvancedOptions() {
    navigate('/workhours-advanced-options');
  }
  return (
    <>
      {!isMobile && <NavbarRegistration />}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginInline: '1rem',
            marginBlock: '2rem 1rem',
          }}>
          <Link
            // to={-1}
            to="#"
            onClick={() => window.history.back()}>
            <img src={backArrow} alt="back-arrow" />
          </Link>
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop:isMobile ? '' : '10rem' }}>
        <Typography level="h3">Workweek</Typography>
      </div>

      <form
        style={{
          height: '75vh',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: isMobile ? '' : '30vw',
          marginInline: 'auto',
        }}
        onSubmit={handleSubmit}>
        {/* Checkboxes */}
        <div className="days-checkboxes">
          {weekDays.map(({ day, defaultChecked, setFunction }, index) => {
            return (
              <div className="workdays-checkbox-container" key={index}>
                <Typography level="body-md" style={{ marginBottom: '4px' }}>
                  {day[0].toUpperCase()}
                </Typography>
                <Checkbox
                  color="neutral"
                  variant="soft"
                  size="lg"
                  defaultChecked={defaultChecked}
                  onChange={() => setFunction((prev) => !prev)}
                />
              </div>
            );
          })}
        </div>

        {/* <div className="hours-card">
          <div
            id="time-range"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '-18px',
            }}>
            <div>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>Start</small>
              </Typography>
              <Input
                className="workhours-time-input"
                type="time"
                defaultValue={'08:00'}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>End</small>
              </Typography>
              <Input
                className="workhours-time-input"
                type="time"
                defaultValue={'16:00'}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        <div className="hours-card" >
          <div
            id="time-range"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '-18px',
            }}>
            <div style={{
              width:'100%'
          }}>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>Total duration (appointement + break)</small>
              </Typography>
              <Input
                type="time"
                defaultValue={'01:30'}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
          </div>
        </div> */}

        <div className="hours-card2">
          <div
            id="time-range"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '1rem',
              // marginTop: '-18px',
            }}>
            <div>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>Start</small>
              </Typography>
              <Input
                className="workhours-time-input"
                type="time"
                defaultValue={'08:00'}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>End</small>
              </Typography>
              <Input
                className="workhours-time-input"
                type="time"
                defaultValue={'16:00'}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
          </div>

          <div
            id="time-range"
            style={{
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '2rem',
            }}>
            <div
              style={{
                width: '86%',
              }}>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>Total duration (appointement + break)</small>
              </Typography>
              <Input
                type="time"
                defaultValue={'01:30'}
                onChange={(e) => setTimeSlotDuration(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* <Stack spacing={2} mt={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography level="title-md">Advanced Options</Typography>
          </div>
          <Button onClick={handleAdvancedOptions} size="sm" variant="plain">
            Different daily work hours{' '}
          </Button>
        </Stack> */}

        <Button
          style={{ marginTop: 'auto', marginInline: 'auto', width: '90%' }}
          type="submit"
          loading={loading}>
          Next
        </Button>
      </form>
    </>
  );
}
