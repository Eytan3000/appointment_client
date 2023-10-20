import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate, useParams } from 'react-router-dom';

const StyledFab = styled(Fab)({
  position: 'absolute',
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: '0 auto',
});

export default function BottomAppBar({ setIsDrawerOpen }) {
  const navigate = useNavigate();
  const pathname = window.location.pathname;
  const isPathCalendar = pathname === '/main-calendar';
  const isPathSettings = pathname.includes('/settings');
  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" sx={{ top: 'auto', bottom: 0 }}>
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-around', gap: '25%' }}>
          <IconButton
            color={isPathCalendar ? 'primary' : 'inherit'}
            aria-label="open drawer"
            onClick={() => navigate('/main-calendar')}>
            <CalendarTodayIcon />
          </IconButton>
          {isPathCalendar && (
            <StyledFab color="primary" aria-label="add">
              <IconButton onClick={() => setIsDrawerOpen(true)}>
                <AddIcon />
              </IconButton>
            </StyledFab>
          )}
          <IconButton
            color={isPathSettings ? 'primary' : 'inherit'}
            onClick={() => navigate('/settings')}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
