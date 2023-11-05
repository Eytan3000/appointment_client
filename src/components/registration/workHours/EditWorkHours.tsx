import './workHours.css';
import Checkbox from '@mui/joy/Checkbox';
import { Button, CircularProgress, Input, Stack, Typography } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import { SyntheticEvent, useState } from 'react';
import {
  createWorkweek,
  getWorkWeek,
  workWeekScheduleUpdater,
} from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rearrangeByDayOfWeek } from '../../../utils/helperFunctions';
import { signal } from '@preact/signals';

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

export default function EditWorkHours() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;

  const isWorkDaysArr = signal([
    { dayName: 'sunday', isWorkDay: false, hasChanged:false },
    { dayName: 'monday', isWorkDay: false, hasChanged:false },
    { dayName: 'tuesday', isWorkDay: false, hasChanged:false },
    { dayName: 'wednesday', isWorkDay: false, hasChanged:false },
    { dayName: 'thursday', isWorkDay: false, hasChanged:false },
    { dayName: 'friday', isWorkDay: false, hasChanged:false },
    { dayName: 'saturday', isWorkDay: false, hasChanged:false },
  ]);

  // const [sunday, setSunday] = useState<boolean | null>(null);
  // const [monday, setMonday] = useState<boolean | null>(null);
  // const [tuesday, setTuesday] = useState<boolean | null>(null);
  // const [wednesday, setWednesday] = useState<boolean | null>(null);
  // const [thursday, setThursday] = useState<boolean | null>(null);
  // const [friday, setFriday] = useState<boolean | null>(null);
  // const [saturday, setSaturday] = useState<boolean | null>(null);

  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('16:00');
  const [timeSlotDuration, setTimeSlotDuration] = useState('01:30');

  const [loading, setLoading] = useState(false);

  const editWorkhoursMutation = useMutation({
    mutationFn: workWeekScheduleUpdater,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none',
      });
      navigate('/settings');
    },
  });

  async function handleSubmit(e: SyntheticEvent, data) {
    e.preventDefault();
    const {} = data;
    // setLoading(true);

    // const weekDays: Workweek = {
    //   sunday: {
    //     name: 'sunday',
    //     isWorkDay: sunday || ,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   monday: {
    //     name: 'monday',
    //     isWorkDay: monday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   tuesday: {
    //     name: 'tuesday',
    //     isWorkDay: tuesday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   wednesday: {
    //     name: 'wednesday',
    //     isWorkDay: wednesday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   thursday: {
    //     name: 'thursday',
    //     isWorkDay: thursday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   friday: {
    //     name: 'friday',
    //     isWorkDay: friday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   saturday: {
    //     name: 'saturday',
    //     isWorkDay: saturday,
    //     startTime,
    //     endTime,
    //     timeSlotDuration,
    //   },
    //   workweek_id: workweekId,
    // };

    // // response = await createWeeklySchedule(weekDays);

    // // console.log(response.data);
    // setLoading(false);
    // navigate('/main-calendar');
  }
  function handleAdvancedOptions() {
    navigate('/workhours-advanced-options');
  }
  // function handleCheckboxChange(day_of_week: string, is_workDay: boolean) {
  //   const weekDaysSetIsWorking = [
  //     { day: 'sunday', setFunction: setSunday },
  //     { day: 'monday', setFunction: setMonday },
  //     { day: 'tuesday', setFunction: setTuesday },
  //     { day: 'wednesday', setFunction: setWednesday },
  //     { day: 'thursday', setFunction: setThursday },
  //     { day: 'friday', setFunction: setFriday },
  //     { day: 'saturday', setFunction: setSaturday },
  //   ];

  //   weekDaysSetIsWorking.forEach(({ day, setFunction }) => {
  //     if (day === day_of_week) setFunction(!is_workDay);
  //   });
  // }
  function handleCheckboxChange2(day_of_week: string, is_workDay: boolean) {

    isWorkDaysArr.value.forEach(({ dayName },index) => {
      if (dayName === day_of_week) {
        isWorkDaysArr.value[index].isWorkDay = Boolean(!is_workDay);
        isWorkDaysArr.value[index].hasChanged = true;
      }
    });
    console.log(isWorkDaysArr.value);
  }
  
  // -- Tanstack Query --

  // fetch daily schedule id based on uid
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['workweek'],
    queryFn: () => getWorkWeek(uid!),
    enabled: !!currentUser,
  });

  let returningData;

  if (isPending) {
    returningData = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '40vh',
          alignItems: 'center',
        }}>
        <CircularProgress size={'lg'} />
      </div>
    );
  }
  if (isError) {
    returningData = <h3>{error.message}</h3>;
  }

  if (data) {
    const weeklyScheduleArr = rearrangeByDayOfWeek(data); // days don't come arranged by order so rearrange needed.
    console.log(weeklyScheduleArr);
    const startTime = weeklyScheduleArr[0].start_time;
    const endTime = weeklyScheduleArr[0].end_time;
    const timeSlotDuration = weeklyScheduleArr[0].time_slot_duration;

    // sync isWorkDaysArr signal with data from db
    weeklyScheduleArr.forEach((day) => {
      isWorkDaysArr.value.map(({ dayName },index) => {
        if (dayName === day.day_of_week) {

          // isWorkDay = Boolean(day.is_workDay);
          isWorkDaysArr.value[index].isWorkDay = Boolean(day.is_workDay);
        }
      });
    });


    returningData = (
      <>
        {/* Checkboxes */}
        <div className="days-checkboxes">
          {weeklyScheduleArr.map(({ is_workDay, day_of_week }, index) => {
            return (
              <div className="workdays-checkbox-container" key={index}>
                <Typography level="body-md" style={{ marginBottom: '4px' }}>
                  {day_of_week[0].toUpperCase()}
                </Typography>
                <Checkbox
                  color="neutral"
                  variant="soft"
                  size="lg"
                  defaultChecked={is_workDay === 1}
                  // onChange={() => setFunction((prev) => !prev)}
                  onChange={() => handleCheckboxChange2(day_of_week, is_workDay)}
                />
              </div>
            );
          })}
        </div>

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
                defaultValue={startTime}
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
                defaultValue={endTime}
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
                defaultValue={timeSlotDuration}
                onChange={(e) => setTimeSlotDuration(e.target.value)}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
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

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h3">Edit Workweek</Typography>
      </div>

      <form
        style={{ height: '75vh', display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => handleSubmit(e, data)}>
        {returningData}

        <Stack spacing={2} mt={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography level="title-md">Advanced Options</Typography>
          </div>
          <Button onClick={handleAdvancedOptions} size="sm" variant="plain">
            Different daily work hours{' '}
          </Button>
        </Stack>

        <Button
          style={{ marginTop: 'auto', marginInline: 'auto', width: '90%' }}
          type="submit"
          loading={loading}>
          Save
        </Button>
      </form>
    </>
  );
}
