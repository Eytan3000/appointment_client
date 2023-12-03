import './workHours.css';
import Checkbox from '@mui/joy/Checkbox';
import { Alert, Button, CircularProgress, Input, Typography } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { getWorkWeek, updateDailySchedule } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rearrangeByDayOfWeek } from '../../../utils/helperFunctions';
import { signal } from '@preact/signals-react';

export const isWorkDaysArr = signal([
  {
    id: 0,
    dayName: 'sunday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'monday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'tuesday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'wednesday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'thursday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'friday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
  {
    id: 0,
    dayName: 'saturday',
    start_time: '',
    endTime: '',
    timeSlotDuration: '',
    isWorkDay: false,
    hasChanged: false,
  },
]);

export default function EditWorkHours() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { currentUser, isMobile } = useAuth() || {};
  const uid = currentUser?.uid;

  const [mutateError, setMutateError] = useState(false);

  console.log(isWorkDaysArr);
  // Tanstack Mutate
  const editWorkhoursMutation = useMutation({
    mutationFn: updateDailySchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workweek'],
        refetchType: 'none',
      });
      // setMutateConfirm(true);
      // navigate('/settings');
    },
    onError: () => {
      setMutateError(true);
    },
  });

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    console.log(isWorkDaysArr.value);
    editWorkhoursMutation.mutate(isWorkDaysArr.value);
  }
  function handleAdvancedOptions() {
    navigate('/workhours-advanced-options');
  }
  function handleCheckboxChange(day_of_week: string) {
    isWorkDaysArr.value.forEach(({ dayName }, index) => {
      console.log(isWorkDaysArr);
      if (dayName === day_of_week) {
        isWorkDaysArr.value[index].isWorkDay =
          !isWorkDaysArr.value[index].isWorkDay;
        isWorkDaysArr.value[index].hasChanged = true;
      }
    });
    // console.log(isWorkDaysArr.value)
  }
  function handleStartTimeChange(e: ChangeEvent<HTMLInputElement>) {
    const newStartTime = e.target.value;

    isWorkDaysArr.value.forEach((_, index) => {
      isWorkDaysArr.value[index].start_time = newStartTime;
      isWorkDaysArr.value[index].hasChanged = true;
    });
  }
  function handleEndTimeChange(e: ChangeEvent<HTMLInputElement>) {
    const newEndTime = e.target.value;

    isWorkDaysArr.value.forEach((_, index) => {
      isWorkDaysArr.value[index].endTime = newEndTime;
      isWorkDaysArr.value[index].hasChanged = true;
    });
  }
  function handleTimeSlotDurationChange(e: ChangeEvent<HTMLInputElement>) {
    const newTimeSlotDuration = e.target.value;

    isWorkDaysArr.value.forEach((_, index) => {
      isWorkDaysArr.value[index].timeSlotDuration = newTimeSlotDuration;
      isWorkDaysArr.value[index].hasChanged = true;
    });
    console.log(isWorkDaysArr);
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
    const startTime = weeklyScheduleArr[0].start_time;
    const endTime = weeklyScheduleArr[0].end_time;
    const timeSlotDuration = weeklyScheduleArr[0].time_slot_duration;

    // sync isWorkDaysArr signal with data from db
    weeklyScheduleArr.forEach((dbDay) => {
      isWorkDaysArr.value.map((signalDay, index) => {
        if (signalDay.dayName === dbDay.day_of_week) {
          isWorkDaysArr.value[index].endTime = dbDay.end_time;
          isWorkDaysArr.value[index].id = dbDay.id;
          isWorkDaysArr.value[index].isWorkDay = Boolean(dbDay.is_workDay);
          isWorkDaysArr.value[index].start_time = dbDay.start_time;
          isWorkDaysArr.value[index].timeSlotDuration =
            dbDay.time_slot_duration;
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
                  onChange={() => handleCheckboxChange(day_of_week)}
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
                onChange={handleStartTimeChange}
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
                onChange={handleEndTimeChange}
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
                onChange={handleTimeSlotDurationChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isMobile ? (
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
      ) : (
        <div style={{ marginTop: '4rem' }} />
      )}

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h3">Edit Workweek</Typography>
      </div>

      <form
        style={{ height: '75vh', display: 'flex', flexDirection: 'column' }}
        onSubmit={(e) => handleSubmit(e)}>
        {returningData}

        {/* <Stack spacing={2} mt={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography level="title-md">Advanced Options</Typography>
          </div>
          <Button onClick={handleAdvancedOptions} size="sm" variant="plain">
            Different daily work hours{' '}
          </Button>
        </Stack> */}

        {editWorkhoursMutation.isError && (
          <Alert
            style={{ marginTop: 'auto', marginInline: 'auto', width: '83%' }}
            color="danger">
            Something went wrong
          </Alert>
        )}
        {editWorkhoursMutation.isSuccess && (
          <Alert
            style={{ marginTop: 'auto', marginInline: 'auto', width: '83%' }}
            color="success">
            Changes saves
          </Alert>
        )}

        <Button
          style={{ marginTop: isMobile ?'auto': '6rem', marginInline: 'auto', width: '90%' }}
          type="submit"
          loading={editWorkhoursMutation.isPending}>
          Save
        </Button>
      </form>
    </>
  );
}
