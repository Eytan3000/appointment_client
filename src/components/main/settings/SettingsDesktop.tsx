import { Box, Divider, Typography } from '@mui/joy';
import UserCard from './UserCard';
import CardMembershipIcon from '@mui/icons-material/CardMembership';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ConstructionIcon from '@mui/icons-material/Construction';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useAuth } from '../../../context/AuthContext';
import SideAppColumn from '../SideAppColumn';
import AccountSettings from './AccountSettings';
import BusinessSettings from './BusinessSettings';
import Services from '../../registration/addServices/Services';
import EditWorkHours from '../../registration/workHours/EditWorkHours';
import { useState } from 'react';

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
    path: 'edit-work-hours',
  },
];

export default function SettingsDesktop() {
  const navigate = useNavigate();
  const { logout } = useAuth() || {};

  const [path, setPath] = useState('account-settings');

  function handleSettingClick(path: string) {
    setPath(path);
  }
  return (
    <>
      <SideAppColumn />

        <div style={{ display: 'flex' }}>
          {/* Left side */}
          <div
            style={{
              background: '#f0f1f4',
              paddingBlock: '1rem',
              height: '100vh',
              marginLeft: '150px',
              // width: 'calc(400px-15vw)',
              width: '400px',
              border: '1px solid #dddfecff',
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
            <div key={index}>
              <div
                id={setting.path}
                onClick={() => handleSettingClick(setting.path)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: path === setting.path ? '#a0ceff' : '#fff',
                  height: '4rem',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1rem',
                  gap: '1rem',
                }}>
                {setting.icon}
                <Typography level="body-lg">{setting.title}</Typography>
              </div>
              <Divider />
            </div>
          ))}
          <div style={{ height: '1rem' }}></div>

          {/* LogOut */}
          <div
            onClick={handleLogOut}
            style={{
              backgroundColor: '#fff',
              height: '4rem',
              display: 'flex',
              alignItems: 'center',
              padding: '1rem',
              gap: '1rem',
              cursor: 'pointer',
            }}>
            <LogoutIcon />
            <Typography level="body-lg">Sign Out</Typography>
          </div>

          <div style={{ height: '4rem' }}></div>
        </div>

        {/* Right side */}
        <div
          style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
          <div
            style={{
              // display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '40%',
            }}>
            {path === 'account-settings' && <AccountSettings />}
            {path === 'business-settings' && <BusinessSettings />}
            {path === 'services' && <Services />}
            {path === 'edit-work-hours' && <EditWorkHours />}
          </div>
        </div>
      </div>
    </>
  );
  function handleLogOut() {
    if (logout) logout();
    navigate('/homepage');
  }
}
