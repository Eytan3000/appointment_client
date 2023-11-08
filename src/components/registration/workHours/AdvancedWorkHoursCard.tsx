import { Checkbox, Input, Typography } from '@mui/joy';
import { StyledH3, StyledSmallP } from '../../../StyledComponents';
import { isWorkDaysArr } from './EditWorkHours';
import { SyntheticEvent } from 'react';

export default function AdvancedWorkHoursCard({
  id,
  day,
  checked,
  startTime,
  endTime,
}: {
  key: number; // id
  id: number;
  day: string;
  checked: boolean;
  startTime: string;
  endTime: string;
}) {
  function handleCheckBoxClick() {
    //loops through daysArr and changes isWorking and hasChanged
    isWorkDaysArr.value.forEach((day, index) => {
      if (day.id === id) {
        isWorkDaysArr.value[index].isWorkDay =
          !isWorkDaysArr.value[index].isWorkDay;
        isWorkDaysArr.value[index].hasChanged = true;
        console.log(isWorkDaysArr.value);
      }
    });
  }

  //loops through daysArr and changes isWorking and hasChanged
  function handleStartTimeChange(e: SyntheticEvent<HTMLInputElement>) {
    isWorkDaysArr.value.forEach((day, index) => {
      if (day.id === id) {
        isWorkDaysArr.value[index].start_time = e.target.value;
        isWorkDaysArr.value[index].hasChanged = true;
        console.log(isWorkDaysArr.value);
      }
    });
  }
  function handleEndTimeChange(e: SyntheticEvent<HTMLInputElement>) {
    isWorkDaysArr.value.forEach((day, index) => {
      if (day.id === id) {
        isWorkDaysArr.value[index].endTime = e.target.value;
        isWorkDaysArr.value[index].hasChanged = true;
        console.log(isWorkDaysArr.value);
      }
    });
  }

  return (
    <div className="advanced-hours-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledH3 style={{ marginTop: '-4px' }}>{day}</StyledH3>
          <Checkbox defaultChecked={checked} onChange={handleCheckBoxClick} />
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '-21px',
            gap: '2em',
          }}>
          <div>
            <StyledSmallP style={{ marginLeft: '0.5em' }}>
              <small>Strat</small>
            </StyledSmallP>
            <Input
              className="workhours-time-input"
              type="time"
              defaultValue={startTime}
              onChange={handleStartTimeChange}
            />
          </div>
          <div>
            <StyledSmallP style={{ marginLeft: '0.5em' }}>
              <small>End</small>
            </StyledSmallP>
            <Input
              className="workhours-time-input"
              type="time"
              defaultValue={endTime}
              onChange={handleEndTimeChange}
            />
          </div>
        </div>
        <div
          style={{
            marginTop: '1rem',
          }}>
          <Typography style={{ marginLeft: '0.5em' }}>
            <small>Total duration (appointement + break)</small>
          </Typography>
          <Input
            type="time"
            // defaultValue={''}
            // onChange={}
          />
        </div>
      </div>
    </div>
  );
}
