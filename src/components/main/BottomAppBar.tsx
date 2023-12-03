import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/joy';
import ConstructionIcon from '@mui/icons-material/Construction';
import NotificationsIcon from '@mui/icons-material/Notifications';

export default function BottomAppBar() {
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
      path: '/tools',
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
      path: '/settings',
      isPath: isPathSettings,
    },
  ];

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.4rem',
          }}>
          {actionItems.map((item, index) => (
            <div
            key={index}
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
              }}>
              <IconButton
                color={item.isPath ? 'primary' : 'inherit'}
                onClick={() => navigate(item.path)}>
                {item.icon}
              </IconButton>
              <Typography
                sx={{ textAlign: 'center' }}
                textColor={item.isPath ? 'primary.500' : 'inherit'}
                level="body-xs">
                {item.title}
              </Typography>
            </div>
          ))}
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
