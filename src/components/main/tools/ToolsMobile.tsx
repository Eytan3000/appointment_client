import { Container, Stack, Typography } from '@mui/joy';
import BottomAppBar from '../BottomAppBar';
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import ToolsCard from './ToolsCard';
import { useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import TocIcon from '@mui/icons-material/Toc';
import { useAuth } from '../../../context/AuthContext';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { copyToClipboard } from '../../../utils/helperFunctions';

const baseUrl = 'http://localhost:5173';

const clientsSum = 59;
const iconSx = {
  fontSize: 25,
  marginBottom: -3,
  marginTop: 3,
  alignSelf: 'center',
};

export default function Tools() {
  const navigate = useNavigate();
  const { currentUser } = useAuth() || {};

  const uid = currentUser?.uid;
  const url = `${baseUrl}/client/${uid}`;
  // const url = `Hello eytan!`;

  function handleShare() {
    console.log(navigator.share);
    if (navigator.share) {
      navigator
        .share({
          text: 'eytankrr',
          url: url,
        })
        .then(() => console.log('Share successful'))
        .catch((error) => console.error('Share error:', error));
    } else {
      // console.log('navigator.share doesnt work');
      console.log(url);
    }
  }

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
                function: handleShare,
              }}
            />

            <ToolsCard
              tool={{
                name: 'Copy Link',
                icon: <ContentCopyIcon sx={iconSx} />,
                function: () => copyToClipboard(url),
              }}
            />
            {/* 
            <ToolsCard
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
          </div>
        </Stack>
      </Container>

      <BottomAppBar />
    </>
  );
}
