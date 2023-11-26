import Avatar from '@mui/joy/Avatar';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardActions from '@mui/joy/CardActions';
import Typography from '@mui/joy/Typography';
import { copyToClipboard } from '../../../utils/helperFunctions';
import { useAuth } from '../../../context/AuthContext';

const url = 'https://plannieapp.com/?name=eytan';

export default function UserCard() {
  const { currentUser, isMobile } = useAuth() ||{};
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: '100%',
          mt: 2,
        }}>
        <Box
          sx={{
            display: 'flex',
            gap: isMobile ? '1.3rem' : '',
          }}>
          <Avatar src="/static/images/avatar/1.jpg" size="lg" />

          <CardContent>
            {/* {isMobile && <Typography level="title-lg">{currentUser.}</Typography>} */}
            {isMobile && (
              <Typography level="body-sm">
                {url.slice(0, 20) + '...'}
              </Typography>
            )}
          </CardContent>
          <CardActions sx={{ pt: 0 }}>
            <Button
              onClick={() => copyToClipboard(url)}
              variant="outlined"
              color="primary">
              Copy
            </Button>
          </CardActions>
        </Box>
      </Card>
    </>
  );
}
