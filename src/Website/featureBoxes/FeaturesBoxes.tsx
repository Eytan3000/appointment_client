import MultipleDevices from './MultipleDevices';
import SetAppointments from './SetAppointments';
import PrivateLink from './PrivateLink';
import { Stack } from '@mui/joy';
import AutomaticReminders from './AutomaticReminders';

export default function FeaturesBoxes() {
  return (
    <>
      <Stack spacing={6} mt={12}>
        <SetAppointments />
        <AutomaticReminders />
        <PrivateLink />
        <MultipleDevices />
      </Stack>
    </>
  );
}
