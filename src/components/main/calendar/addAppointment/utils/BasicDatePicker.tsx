import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import 'dayjs/locale/en-gb';

export default function BasicDatePicker({
  date,
  handleDateChange,
}: {
  date: Date;
  handleDateChange: (date: Dayjs | null) => void;
}) {
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
