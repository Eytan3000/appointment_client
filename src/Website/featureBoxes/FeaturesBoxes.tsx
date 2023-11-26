import MultipleDevices from './desktop/MultipleDevices';
import SetAppointments from './desktop/SetAppointments';
import PrivateLink from './desktop/PrivateLink';
import { Stack } from '@mui/joy';
import AutomaticReminders from './desktop/AutomaticReminders';
import SetAppointmentsMobile from './mobile/SetAppointmentsMobile';
import PrivateLinkMobile from './mobile/PrivateLinkMobile';
import MultipleDevicesMobile from './mobile/MultipleDevicesMobile';
import AutomaticRemindersMobile from './mobile/AutomaticRemindersMobile';

export default function FeaturesBoxes({isMobile}:{isMobile:boolean}) {

  return (
    <>
      {isMobile ? (
        <Stack spacing={6} mt={12}>
          <SetAppointmentsMobile />
          <AutomaticRemindersMobile />
          <PrivateLinkMobile />
          <MultipleDevicesMobile />
        </Stack>
      ) : (
        <Stack spacing={6} mt={12}>
          <SetAppointments />
          <AutomaticReminders />
          <PrivateLink />
          <MultipleDevices />
        </Stack>
      )}
    </>
  );
}
