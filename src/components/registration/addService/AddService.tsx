import { Link, useNavigate } from 'react-router-dom';
// import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AiOutlineCamera } from 'react-icons/ai';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardCover,
  Input,
  Typography,
} from '@mui/joy';

export default function AddService() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/services');
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px',
          alignItems: 'center',
        }}>
        <Link to={-1}>
          <ArrowBackIcon />
        </Link>
      </div>

      <Typography style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
        Descrive your service
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3em',
        }}
        onSubmit={handleSubmit}>
        <Card
          component="li"
          sx={{ flexGrow: 1, height: '6rem', width: '8rem' }}>
          <CardActions>
            <CardCover>
              <img
                src="https://www.rockabillyhairstyle.com/wp-content/uploads/images/4-white-nail-art-with-leaves.jpg"
                loading="lazy"
                alt="Service Image"
              />
              {/* <div style={{ fontSize: '4rem' }}>
                <AiOutlineCamera />
              </div> */}
            </CardCover>
          </CardActions>
          {/* <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              // textColor="#fff"
              mt={{ xs: 12, sm: 18 }}>
              Image
            </Typography>
          </CardContent> */}
        </Card>

        <div
          style={{
            marginTop: '3em',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '46vh',
            gap: '1rem',
          }}>
          <Input placeholder="Service Name" />
          <Input placeholder="Service Description" />
          <Input type="time" defaultValue={'01:00'} />
          <Input type="text" placeholder="Price" />

          <Button
            onClick={handleSubmit}
            type="submit"
            style={{ marginTop: '2rem' }}>
            {' '}
            Add
          </Button>
        </div>
      </form>
    </>
  );
}
