import { Box, Divider, Typography } from '@mui/joy';
import UserCard from './UserCard';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import ShutterSpeedIcon from '@mui/icons-material/ShutterSpeed';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import BottomAppBar from '../BottomAppBar';

const settings = [
  {
    title: 'Account Settings',
    icon: <ManageAccountsIcon />,
    path: 'account-settings',
  },
  {
    title: 'Business Settings',
    icon: <BusinessCenterIcon />,
    path: 'business-settings',
  },

  {
    title: 'Edit Services',
    icon: <ConstructionIcon />,
    path: 'services',
  },
  {
    title: 'Edit Workhours',
    icon: <WorkHistoryIcon />,
    path: 'work-hours',
  },
  {
    title: 'Booking Intervals',
    icon: <ShutterSpeedIcon />,
    path: 'booking-intervals',
  },
];

// Sign Out

export default function Settings() {
  const navigate = useNavigate();

  function handleSettingClick(path: string) {
    navigate(`/settings/${path}`);
  }
  return (
    <>
      <div
        style={{
          background: '#f0f1f4',
          paddingBlock: '1rem',
          height: '100vh',
        }}>
        <Box paddingLeft={2}>
          <Typography level="h3">Settings</Typography>
        </Box>

        <div style={{ margin: '1rem 0.5rem' }}>
          <UserCard />
        </div>

        <div
          style={{
            backgroundColor: '#fff',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            gap: '1rem',
          }}>
          <CardMembershipIcon />
          <Typography level="body-lg">Subscription: Premium</Typography>
        </div>

        <div style={{ height: '1rem' }}></div>

        {settings.map((setting, index) => (
          <>
            <div
              id={setting.path}
              key={index}
              onClick={() => handleSettingClick(setting.path)}
              style={{ cursor: 'pointer' }}>
              <div
                style={{
                  backgroundColor: '#fff',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  gap: '1rem',
                }}>
                {setting.icon}
                <Typography level="body-lg">{setting.title}</Typography>
              </div>
            </div>
            <Divider />
          </>
        ))}
        <div style={{ height: '1rem' }}></div>
        <div
          style={{
            backgroundColor: '#fff',
            height: '4rem',
            display: 'flex',
            alignItems: 'center',
            padding: '1rem',
            gap: '1rem',
          }}>
          <LogoutIcon />
          <Typography level="body-lg">Sign Out</Typography>
        </div>
        <div style={{ height: '4rem' }}></div>
      </div>
      <BottomAppBar />
    </>
  );
}
