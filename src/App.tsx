import { useRoutes } from 'react-router-dom';
import './App.css';
import MainAuth from './components/auth/mainAuth/MainAuth';
import SignIn from './components/auth/signIn/SignIn';
import CreateAccount from './components/auth/creactAccount/CreactAccount.tsx';
import AddService from './components/registration/addService/AddService.tsx';
import EditService from './components/registration/addService/EditService.tsx';
import WorkHours from './components/registration/workHours/WorkHours.tsx';
import MainCalendar from './components/main/calendar/MainCalendar.tsx';
import ClientsList from './components/main/calendar/addAppointment/utils/ClientsList.tsx';
import Settings from './components/main/settings/Settings.tsx';
import WorkHoursAdvanced from './components/registration/workHours/WorkHoursAdvanced.tsx';
import AccountSettings from './components/main/settings/AccountSettings.tsx';
import BusinessSettings from './components/main/settings/BusinessSettings.tsx';
import Services from './components/registration/addServices/Services.tsx';
import ToolsMobile from './components/main/tools/ToolsMobile.tsx';
import ToolsDesktop from './components/main/tools/ToolsDesktop.tsx';
import Inbox from './components/main/inbox/Inbox.tsx';
import ForgotPassword from './components/auth/forgotPassword/ForgotPassword.tsx';
import ClientsTable from './components/main/tools/Clients/ClientsTable.tsx';
import AddClient from './components/main/tools/Clients/AddClient.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import EditWorkHours from './components/registration/workHours/EditWorkHours.tsx';
import ClientCard from './components/main/tools/Clients/ClientCard.tsx';
import ClientEdit from './components/main/tools/Clients/ClientEdit.tsx';
import AddBusiness from './components/registration/addBusiness/AddBusiness.tsx';
import GoogleSignIn from './components/auth/googleSignIn/GoogleSignIn.tsx';
import ClientChooseService from './userArea/welcomePage/ClientChooseService.tsx';
import ClientChooseTime from './userArea/chooseTime/ClientChooseTime.tsx';
import PhoneAuthInput from './userArea/phoneAuth/PhoneAuthInput.tsx';
import OtpInput from './userArea/phoneAuth/OtpInput.tsx';
import BookingSummary from './userArea/summary/BookingSummary.tsx';
import HomePage from './Website/HomePage.tsx';
import SettingsDesktop from './components/main/settings/SettingsDesktop.tsx';

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
      path: '/add-business',
      element: <AddBusiness />,
    },
    {
      path: '/services', //settings edit services
      element: <Services />,
    },
    {
      path: '/add-service',
      element: <AddService />,
    },

    {
      path: '/edit-service/:id',
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
        {
          path: 'edit-work-hours',
          element: <EditWorkHours />,
        },

      ],
    },
    {
      path: '/settings-desktop',
      element: <SettingsDesktop />,
    },
    {
      path: 'tools-desktop',
      element: <ToolsDesktop />,
    },
    // {
    //   path: 'speed-dial-add-appointment',
    //   element:<SpeedDialAddAppointment />
    // },

    // ClientCard

    {
      path: '/tools',
      // element: <Tools />,
      children: [
        {
          index: true,
          element: <ToolsMobile />,
        },
        {
          path: 'client-card/:clientId',
          // path: 'client-card',
          element: <ClientCard />,
        },
        {
          path: 'client-edit/:clientId',
          // path: 'client-card',
          element: <ClientEdit />,
        },
      ],
    },
    {
      path: '/inbox',
      element: <Inbox />,
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
    },
    {
      path: '/add-client',
      element: <AddClient />,
    },
    {
      path: '/clients-table',
      element: <ClientsTable />,
    },
    // {
    //   path: '/tools-services',
    //   element: <ToolsServices />,
    // },
    {
      path: '/google-signin',
      element: <GoogleSignIn />,
    },
    // {
    //   path: '/client',
    //   element: <ClientChooseService />,
    // },
    // Client area
    {
      path: '/client', ///:uid
      children: [
        // {
        //   index: true,
        //   element: <ClientChooseService />,
        // },
        {
          path: '/client/:uid',
          element: <ClientChooseService />,
        },
        {
          path: '/client/choose-time',
          element: <ClientChooseTime />,
        },
        {
          path: '/client/auth',
          element: <PhoneAuthInput />,
        },
        {
          path: '/client/otp',
          element: <OtpInput />,
        },
        {
          path: '/client/booking-summary',
          element: <BookingSummary />,
        },
      ],
    },

    {
      path: '/homepage',
      element: <HomePage />,
    },
  ]);

  return (
    <>
      <AuthProvider>{element}</AuthProvider>
    </>
  );
}

export default App;
