import { Container, Stack, Typography } from '@mui/joy';
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ToolsCard from './ToolsCard';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TocIcon from '@mui/icons-material/Toc';
import SideAppColumn from '../SideAppColumn';
import { useState } from 'react';
import ClientsTable from './Clients/ClientsTable';
import AddClient from './Clients/AddClient';
import Services from '../../registration/addServices/Services';

const clientsSum = 59;

const iconSx = {
  fontSize: 25,
  marginBottom: -3,
  marginTop: 3,
  alignSelf: 'center',
};

export default function ToolsDesktop() {
  const navigate = useNavigate();
  const [path, setPath] = useState('clients-table');

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
            width: '410px',
            border: '1px solid #dddfecff',
          }}>
          <Container sx={{ marginLeft: '150px' }}>
            <div
              style={{
                display: 'flex',
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

                {/* <ToolsCard
                  tool={{
                    name: 'Edit',
                    icon: <EditIcon sx={iconSx} />,
                    function: () => console.log('Edit Page'),
                  }}
                /> */}
              </div>

              {/* Clients */}
              <Typography level="title-md">Clients ({clientsSum})</Typography>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <ToolsCard
                  tool={{
                    name: 'Table',
                    icon: <TocIcon sx={iconSx} />,
                    function: () => setPath('clients-table'),
                  }}
                />

                <ToolsCard
                  tool={{
                    name: 'Add',
                    icon: <PersonAddIcon sx={iconSx} />,
                    function: () => setPath('add-client'),
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
                    function: () => setPath('settings/services'),
                  }}
                />
              </div>
            </Stack>
          </Container>
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
            {path === 'clients-table' && <ClientsTable />}
             {path === 'add-client' && <AddClient />}
            {path === 'settings/services' && <Services />}

          </div>
        </div>
      </div>
    </>
  );
}
