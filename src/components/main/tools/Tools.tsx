import { Container, Stack, Typography } from '@mui/joy';
import BottomAppBar from '../BottomAppBar';
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ToolsCard from './ToolsCard';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TocIcon from '@mui/icons-material/Toc';

const clientsSum = 59;

const iconSx = {
  fontSize: 25,
  marginBottom: -3,
  marginTop: 3,
  alignSelf: 'center',
};

export default function Tools() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '2rem',
          }}>
          <Typography level="h3">Tools</Typography>
        </div>

        <Stack spacing={2} mt={2}>
          {/* Booking Page */}
          <Typography level="title-md">Booking Page</Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ToolsCard
              tool={{
                name: 'Share',
                icon: <IosShareIcon sx={iconSx} />,
                function: () => console.log('Share Page'),
              }}
            />

            <ToolsCard
              tool={{
                name: 'Edit',
                icon: <EditIcon sx={iconSx} />,
                function: () => console.log('Edit Page'),
              }}
            />
          </div>

          {/* Clients */}
          <Typography level="title-md">Clients ({clientsSum})</Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ToolsCard
              tool={{
                name: 'Table',
                icon: <TocIcon sx={iconSx} />,
                function: () => navigate('/clients-table'),
              }}
            />

            <ToolsCard
              tool={{
                name: 'Add',
                icon: <PersonAddIcon sx={iconSx} />,
                function: () => navigate('/add-client'),
              }}
            />
          </div>

          {/* Services */}
          <Typography level="title-md">Services</Typography>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <ToolsCard
              tool={{
                name: 'Services',
                icon: <HomeRepairServiceIcon sx={iconSx} />,
                // function: () => navigate('/tools-services'),
                function: () => navigate('/settings/services'),
              }}
            />

            {/* <ToolsCard
              tool={{
                name: 'Add',
                icon: <HomeRepairServiceIcon sx={iconSx} />,
                function: () => navigate('/add-service'),
              }}
            /> */}
          </div>
        </Stack>
      </Container>

      <BottomAppBar />
    </>
  );
}
