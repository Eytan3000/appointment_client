import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ShareIcon from '@mui/icons-material/Share';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useState } from 'react';

type Anchor = 'bottom';
const drawerOptions = [
  {
    text: 'New Appointment',
    icon: <AddCircleOutlineIcon />,
    action: function(){navigate()}
  },
  {
    text: 'Share Booking Page',
    icon: <ShareIcon />,
    // action
  },
];

export default function TemporaryDrawer({ isDrawerOpen, setIsDrawerOpen }) {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 'auto' }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        {drawerOptions.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton onClick={() => console.log(item)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor={'bottom'}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}>
        {list('bottom')}
      </Drawer>
    </div>
  );
}
