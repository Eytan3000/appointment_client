import { useRoutes } from 'react-router-dom';
import './App.css';
import MainAuth from './components/auth/mainAuth/MainAuth';
import SignIn from './components/auth/signIn/SignIn';
import CreateAccount from './components/auth/creactAccount/CreactAccount.tsx';
import AddServices from './components/registration/addServices/addServices.css';
import AddService from './components/registration/addService/AddService.tsx';
import EditService from './components/registration/addService/EditService.tsx';
import WorkHours from './components/registration/workHours/WorkHours.tsx';
import MainCalendar from './components/main/calendar/MainCalendar.tsx';
import ClientsList from './components/main/calendar/addAppointment/utils/ClientsList.tsx';
import Settings from './components/main/settings/Settings.tsx';
import WorkHoursAdvanced from './components/registration/workHours/WorkHoursAdvanced.tsx';
import AccountSettings from './components/main/settings/AccountSettings.tsx';
import SettingsLayout from './components/main/settings/SettingsLayout.tsx';
import BusinessSettings from './components/main/settings/BusinessSettings.tsx';
import Services from './components/registration/addServices/Services.tsx';
import SpeedDialAddAppointment from './components/main/calendar/addAppointment/SpeedDialAddAppointment.tsx';
import Tools from './components/main/tools/Tools.tsx';
import Inbox from './components/main/inbox/Inbox.tsx';

function App() {
  const element = useRoutes([
    // {
    // path: '/auth',
    // element: <MainAuth />,
    // children: [
    {
      path: '/',
      element: <MainAuth />,
    },
    {
      path: '/signin',
      element: <SignIn />,
    },
    {
      path: '/create-account',
      element: <CreateAccount />,
    },
    {
      path: '/services',
      element: <Services />,
    },
    {
      path: '/add-service',
      element: <AddService />,
    },
    {
      path: '/edit-service',
      element: <EditService />,
    },
    {
      path: '/work-hours',
      element: <WorkHours />,
    },

    {
      path: '/workhours-advanced-options',
      element: <WorkHoursAdvanced />,
    },
    {
      path: '/main-calendar',
      element: <MainCalendar />,
    },
    {
      path: '/clients-list',
      element: <ClientsList />,
    },
    {
      path: '/settings',
      // element: <SettingsLayout />,
      children: [
        {
          index: true,
          element: <Settings />,
        },
        {
          path: 'account-settings', // This is a child route of '/settings'
          element: <AccountSettings />,
        },
        {
          path: 'business-settings', // This is a child route of '/settings'
          element: <BusinessSettings />,
        },
        {
          path: 'work-hours',
          element: <WorkHours />,
        },
        {
          path: 'services',
          element: <Services />,
        },
      ],
    },
    // {
    //   path: 'speed-dial-add-appointment',
    //   element:<SpeedDialAddAppointment />
    // },
    {
      path: '/tools',
      element:<Tools />
    },
    {
      path: '/inbox',
      element:<Inbox />
    },
  ]);

  return <>{element}</>;
}

export default App;
