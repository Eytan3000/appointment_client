import {
  Card,
  CardActions,
  CardContent,
  Container,
  Typography,
} from '@mui/joy';
import BottomAppBar from '../BottomAppBar';
import IosShareIcon from '@mui/icons-material/IosShare';
import EditIcon from '@mui/icons-material/Edit';
import HomeRepairServiceIcon from '@mui/icons-material/HomeRepairService';
import PersonIcon from '@mui/icons-material/Person';

const iconSx = {
  fontSize: 30,
  marginBottom: -2,
  marginTop: 2,
  alignSelf: 'center',
};
const tools = [
  {
    name: 'Share Page',
    icon: <IosShareIcon sx={iconSx} />,
    function: () => console.log('Share Page'),
  },
  {
    name: 'Edit Page',
    icon: <EditIcon sx={iconSx} />,
    function: () => console.log('Edit Page'),
  },
  {
    name: 'Services',
    icon: <HomeRepairServiceIcon sx={iconSx} />,
    function: () => console.log('Services'),
  },
  {
    name: 'Clients',
    icon: <PersonIcon sx={iconSx} />,
    function: () => console.log('Clients'),
  },
];

export default function Tools() {
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

        <div
          style={{
            display: 'flex',
            gap: '1rem',
            marginTop: '2rem',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
          
          {/* Tools Cards */}
          {tools.map((tool) => (
            <div onClick={tool.function}>
              <Card
                sx={{
                  width: 130,
                  height: 120,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'transform 0.3s, border 0.3s',

                  '@media (min-width: 600px)': {
                    // hover css for bigger screens only
                    '&:hover': {
                      backgroundColor: '#f0f4f8',
                      transform: 'translateY(-2px)',
                      cursor: 'pointer',
                    },
                  },
                }}>
                <CardContent>
                  {tool.icon}
                  <CardActions>
                    <p>
                      <small>{tool.name}</small>
                    </p>
                  </CardActions>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </Container>

      <BottomAppBar />
    </>
  );
}
