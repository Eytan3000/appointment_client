// note: Forward button is dissabled when jump is higher than 14. you can change is to allow more futur view of the weeks

import {
  Alert,
  Button,
  Card,
  CircularProgress,
  Typography,
} from '@mui/joy';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useQuery } from '@tanstack/react-query';
import { getAllFutureAppointments, getWorkWeek } from '../../utils/http';
import { appointmentSignal } from '../welcomePage/ClientChooseService';
import { addDay, rearrangeByDayOfWeek } from '../../utils/helperFunctions';
import { Appointment, DailySchedule } from '../../utils/Interfaces';
import { useState } from 'react';
import ConfirmAppointmentModal from './ConfirmAppointmentModal';

interface DailyColumn {
  id?: number;
  day_of_week: string;
  start_time: string;
  end_time: string;

  // workweek_id: number;
  time_slot_duration: string;

  date: string;
  is_workDay: number | boolean;

  futureAppointments: Appointment[];
}


function getNextThreeMonths(jump: number = 0) {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 6 + jump); // Start 6 days before today
  // console.log(currentDate)
  const result = [];

  // Loop for the next 3 months
  for (let i = 0; i < 3; i++) {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + i,
      1
    );

    // Loop through the days of the month
    for (
      let day = 1;
      day <=
      new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0).getDate();
      day++
    ) {
      const currentDay = new Date(
        nextMonth.getFullYear(),
        nextMonth.getMonth(),
        day
      );

      if (currentDay >= currentDate) {
        // Add only dates from today onwards
        const date = addDay(currentDay.toISOString().split('T')[0]); // Format as YYYY-MM-DD
        const dayOfWeek = currentDay.toLocaleDateString('en-US', {
          weekday: 'long',
        }); // Get the day name
        result.push({ date, dayOfWeek });
      }
    }
  }

  return result;
}

// Helper function to parse duration string to minutes
function parseDuration(durationString: string): number {
  const [hours, minutes] = durationString.split(':').map(Number);
  return hours * 60 + minutes;
}

// Helper function to format time as HH:mm
function formatTime(date: Date) {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}
function generateAppointmentsStartTimes(
  dayStart: string,
  dayEnd: string,
  slotDuration: string
) {
  const appointments = [];

  // Convert string time to Date object for easier manipulation
  const startTime = new Date(`2000-01-01T${dayStart}:00`);
  const endTime = new Date(`2000-01-01T${dayEnd}:00`);
  const duration = parseDuration(slotDuration); //gets number of minutes

  // Initialize current time to the start time
  const currentTime = new Date(startTime);

  // Generate appointments until the end time
  while (currentTime < endTime) {
    // Check if there's enough time left for a full slot duration
    if (endTime.getTime() - currentTime.getTime() >= duration * 60 * 1000) {
      appointments.push(formatTime(currentTime));
    }
    currentTime.setMinutes(currentTime.getMinutes() + duration);
  }

  return appointments;
}

function getWeekDaysArr(data: DailySchedule[], jump: number) {
  // need to arrange days array becuase the id order and days order don't match
  const arrangedDayArr = rearrangeByDayOfWeek(data);
  const nextThreeMonthsArray = getNextThreeMonths(jump); // three months array (need to check).

  const sundayIndex = nextThreeMonthsArray.findIndex(
    (day) => day.dayOfWeek === 'Sunday'
  );

  const weekDaysArr = arrangedDayArr.map((day, index) => {
    return { ...day, date: nextThreeMonthsArray[index + sundayIndex].date };
  });

  return weekDaysArr;
}
function monthNumberToString(monthNumber: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const monthName = months[monthNumber - 1];
  return monthName;
}
function isDateTimeEarlierThanNow(timeString: string, dateString: string) {
  // Get the current date and time
  const now = new Date();

  // Parse the input date and time strings
  const [year, month, day] = dateString.split('-').map(Number);
  const [hours, minutes] = timeString.split(':').map(Number);

  // Create a new Date object with the input date and time
  const inputDateTime = new Date(year, month - 1, day, hours, minutes, 0, 0);

  // Compare the input date and time with the current date and time
  return inputDateTime < now;
}
function filterObjectsByDate(
  targetDate: string,
  arrayOfObjects: Appointment[]
) {
  // Filter the array based on the date
  const filteredArray = arrayOfObjects.filter((obj) => {
    // Assuming date is in the format 'YYYY-MM-DD'
    const objDate = obj.date.toString().split('T')[0];
    return objDate === targetDate;
  });

  return filteredArray;
}
function areTimeRangesOverlapping(
  AppointmentRange: string[],
  slotRange: string[]
) {
  const startTime1 = new Date(`1970-01-01T${AppointmentRange[0]}`);
  const endTime1 = new Date(`1970-01-01T${AppointmentRange[1]}`);

  const startTime2 = new Date(`1970-01-01T${slotRange[0]}`);

  // Calculate the end time based on the start time and duration
  const durationParts = slotRange[1].split(':');
  const durationHours = parseInt(durationParts[0], 10);
  const durationMinutes = parseInt(durationParts[1] || 0, 10);
  const durationSeconds = parseInt(durationParts[2] || 0, 10);

  const endTime2 = new Date(
    startTime2.getTime() +
      durationHours * 60 * 60 * 1000 +
      durationMinutes * 60 * 1000 +
      durationSeconds * 1000
  );

  // Check if AppointmentRange ends before slotRange starts or AppointmentRange starts after slotRange ends
  const doNotOverlap = endTime1 <= startTime2 || startTime1 >= endTime2;

  return !doNotOverlap;
}
function calculateEndTime(startTime: string, duration: string) {
  // Parse the start time
  const [startHour, startMinute] = startTime.split(':');
  const startTimeInMinutes = parseInt(startHour) * 60 + parseInt(startMinute);

  // Calculate the end time in minutes
  const endTimeInMinutes = startTimeInMinutes + duration;

  // Convert the end time back to HH:mm format
  const endHour = Math.floor(endTimeInMinutes / 60);
  const endMinute = endTimeInMinutes % 60;

  // Format the end time with leading zeros
  const formattedEndHour = endHour < 10 ? '0' + endHour : endHour.toString();
  const formattedEndMinute =
    endMinute < 10 ? '0' + endMinute : endMinute.toString();

  // Return the formatted end time
  return `${formattedEndHour}:${formattedEndMinute}`;
}

// React component
function DayColumn({
  day_of_week,
  start_time,
  end_time,
  time_slot_duration,
  date,
  is_workDay,
  futureAppointments,
  setOpenModal,
}: DailyColumn) {
  // gets back an array with start times based on the owner's start, end and duration times.
  const appointmentsStartTimes = generateAppointmentsStartTimes(
    start_time.slice(0, 5),
    end_time.slice(0, 5),
    time_slot_duration.slice(0, 5)
  );

  // for each appointmentsStartTime, find all the appointments in this date
  const columnDayAppointments = filterObjectsByDate(date, futureAppointments);

  function handleTimeSlotClick(slotStartTime: string) {
    const endTime = calculateEndTime(
      slotStartTime,
      appointmentSignal.value.service?.duration || ''
    );

    appointmentSignal.value.appointment = {
      start: slotStartTime,
      end: endTime,
      date,
    };
    setOpenModal(true);
  }

  return (
    <>
      <div>
        <Typography textAlign={'center'}>
          {day_of_week[0].toUpperCase()}
        </Typography>
        <Typography marginY={1} level="body-xs" textAlign={'center'}>
          {date.slice(8, 11)}
        </Typography>

        {is_workDay &&
          appointmentsStartTimes.map((appointmentsStartTime, index) => {
            // and check for overlaps between time slots and appointments
            const timeSlotRange = [appointmentsStartTime, time_slot_duration];

            let isOverlapping;

            columnDayAppointments.map((dayAppointment) => {
              const appointmentRange = [
                dayAppointment.start,
                dayAppointment.end,
              ];
              isOverlapping = areTimeRangesOverlapping(
                appointmentRange,
                timeSlotRange
              );
            });

            // check if slot is earlier than now
            const isEarlier = isDateTimeEarlierThanNow(
              appointmentsStartTime,
              date
            );
            return !isEarlier && !isOverlapping ? (
              <div
                key={index}
                onClick={() => handleTimeSlotClick(appointmentsStartTime)}
                style={{ cursor: 'pointer' }}>
                <Card
                  variant="outlined"
                  // key={index}
                  sx={{
                    margin: isEarlier ? '1px' : '1.3px',
                    fontSize: '12px',
                    alignItems: 'center',
                    height: isEarlier ? '21.8px' : '20px',
                  }}>
                  {appointmentsStartTime}
                </Card>
              </div>
            ) : (
              <Card
                variant="soft"
                key={index}
                sx={{
                  margin: isEarlier ? '1px' : '1.3px',
                  fontSize: '12px',
                  alignItems: 'center',
                  height: isEarlier ? '21.8px' : '20px',
                }}
              />
            );
          })}
      </div>
    </>
  );
}
//-----------------------------------------------------------------
export default function TimePicker() {
  const [jump, setJump] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: () => getWorkWeek(appointmentSignal.value.uid),
  });

  const {
    data: futureAppointments,
    // , isLoading, isError, error
  } = useQuery({
    queryKey: ['futureAppointments'],
    queryFn: () => getAllFutureAppointments(appointmentSignal.value.uid),
  });

  let daysTable;
  let thisMonth;
  if (data) {
    const weekDaysArr = getWeekDaysArr(data, jump);
    const todaysMonthNumber = weekDaysArr[0].date.slice(5, 7);
    thisMonth = monthNumberToString(todaysMonthNumber);

    daysTable = (
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {weekDaysArr.map((day: DailyColumn, index: number) => (
          <div
            key={index}
            style={{
              flex: '1',
              width: '0',
            }}>
            <DayColumn
              day_of_week={day.day_of_week}
              start_time={day.start_time}
              end_time={day.end_time}
              time_slot_duration={day.time_slot_duration}
              date={day.date}
              is_workDay={day.is_workDay === 1}
              futureAppointments={futureAppointments}
              setOpenModal={setOpenModal}
            />
          </div>
        ))}
      </div>
    );
  }
  if (isLoading)
    daysTable = (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '30vh',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  if (isError) {
    console.log(error);
    daysTable = (
      <Alert color="danger">
        We're experiencing a problem. The appointments view isn't available at
        the moment.
      </Alert>
    );
  }
  return (
    <>
      {/* Upper Area */}
      <div
        style={{
          height: '4rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '0.5rem',
        }}>
        <Typography level="h4" ml={1} color="primary">
          {thisMonth}
        </Typography>

        <Button
          disabled={jump === 0}
          onClick={() => setJump(0)}
          style={{ paddingInline: '15%' }}
          variant="plain">
          Today
        </Button>

        {/* Back / Forward */}
        <div style={{ display: 'flex', marginRight: '2rem' }}>
          <Button
            disabled={jump < 1}
            onClick={clickBackCalendar}
            style={{ paddingInline: '15%' }}
            startDecorator={<ArrowBackIosNewIcon />}
            variant="plain"
          />
          <Button
            disabled={jump > 14}
            onClick={clickForwardCalendar}
            style={{ paddingInline: '15%' }}
            startDecorator={<ArrowForwardIosIcon />}
            variant="plain"
          />
        </div>
      </div>

      {/* Days table */}
      {daysTable}

      <ConfirmAppointmentModal open={openModal} setOpen={setOpenModal} />
    </>
  );

  // functions
  function clickBackCalendar() {
    setJump((prev) => prev - 7);
  }
  function clickForwardCalendar() {
    setJump((prev) => prev + 7);
  }
}
