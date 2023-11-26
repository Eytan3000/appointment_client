import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/en-gb';
import { ChangeEvent, SyntheticEvent } from 'react';

export default function BasicDatePicker({
  date,
  handleDateChange,
}: {
  date: Date;
  handleDateChange: (e: ChangeEvent) => void;
}) {
  console.log(date, handleDateChange);
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} 
    // adapterLocale="en-gb"
    >
      <DemoContainer components={['DatePicker']}>
        <DatePicker
          defaultValue={dayjs(date)}
          onChange={handleDateChange}
          slotProps={{ textField: { size: 'small' } }}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
}
