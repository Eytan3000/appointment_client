import { Button, Container, Stack, Typography } from '@mui/joy';
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ToolsCard from './ToolsCard';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TocIcon from '@mui/icons-material/Toc';
import SideAppColumn from '../SideAppColumn';
import { useState } from 'react';
import ClientsTable from './Clients/ClientsTable';
import AddClient from './Clients/AddClient';
import Services from '../../registration/addServices/Services';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useAuth } from '../../../context/AuthContext';
import { copyToClipboard } from '../../../utils/helperFunctions';

const clientsSum = 59;

const iconSx = {
  fontSize: 25,
  marginBottom: -3,
  marginTop: 3,
  alignSelf: 'center',
};

const baseUrl = 'http://localhost:5173';

export default function ToolsDesktop() {
  const { currentUser } = useAuth() || {};

  const uid = currentUser?.uid;
  const url = `${baseUrl}/client/${uid}`;

  const [path, setPath] = useState('clients-table');

  function handleShare() {
    if (navigator.share) {
      navigator
        .share({
          text: 'eytankrr',
          url: url,
        })
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Share error:', error));
    } else {
      console.log('navigator.share doesnt work');
    }
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
                    // function: () => console.log('Share Page'),
                    function: handleShare,
                  }}
                />

                  <ToolsCard
                    tool={{
                      name: 'Copy Link',
                      icon: <ContentCopyIcon sx={iconSx} />,
                      function: ()=>copyToClipboard(url),
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
