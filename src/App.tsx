import { useRoutes } from 'react-router-dom';
import './App.css';
import MainAuth from './components/auth/mainAuth/MainAuth';
import SignIn from './components/auth/signIn/SignIn';
import CreateAccount from './components/auth/creactAccount/CreactAccount.tsx';
import AddServices from './components/registration/addServices/AddServices.tsx';
import AddService from './components/registration/addService/AddService.tsx';
import EditService from './components/registration/addService/EditService.tsx';
import WorkHours from './components/registration/workHours/WorkHours.tsx';
import MainCalendar from './components/calendar/MainCalendar.tsx';
import WorkHoursAdvanced from './components/registration/workHours/workHoursAdvanced.tsx';
// import AddServices from './components/registration/addServices'

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
      path: '/add-services',
      element: <AddServices />,
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
  ]);

  return <>{element}</>;
}

export default App;
