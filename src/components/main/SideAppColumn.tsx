import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/joy';
import ConstructionIcon from '@mui/icons-material/Construction';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../assets/Images/LogoBlackWithGreyBg.svg';

export default function SideAppColumn() {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isPathCalendar = pathname === '/main-calendar';
  const isPathSettings = pathname.includes('/settings');
  const isPathTools = pathname.includes('/tools');
  const isPathInbox = pathname.includes('/inbox');

  const actionItems = [
    {
      title: 'Calendar',
      icon: <CalendarTodayIcon />,
      path: '/main-calendar',
      isPath: isPathCalendar,
    },
    {
      title: 'Tools',
      icon: <ConstructionIcon />,
      path: '/tools-desktop',
      isPath: isPathTools,
    },
    {
      title: 'Inbox',
      icon: <NotificationsIcon />,
      path: '/inbox',
      isPath: isPathInbox,
    },
    {
      title: 'Settings',
      icon: <SettingsIcon />,
      path: '/settings-desktop',
      isPath: isPathSettings,
    },
  ];
  const drawerWidth = 150;
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        sx={{
          width: `${drawerWidth}px`,
          mr: { sm: `calc(100% - ${drawerWidth}px)` },
        }}>
        <div
          style={{
            padding: '1rem',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
          }}>
          <img src={logo} alt="" onClick={()=>navigate('../main-calendar')} style={{cursor:'pointer'}}/>
          {actionItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer',
              }}
              onClick={() => navigate(item.path)}>
              <IconButton
                color={item.isPath ? 'primary' : 'inherit'}
                // onClick={() => navigate(item.path)}
              >
                {item.icon}
              </IconButton>
              <Typography
                textColor={item.isPath ? 'primary.500' : 'inherit'}
                level="body-xs">
                {item.title}
              </Typography>
            </div>
          ))}
        </div>
      </AppBar>
    </React.Fragment>
  );
}
