import { AiOutlineCamera } from 'react-icons/ai';
import './addSevice.css';
import {
  StyledButton,
  StyledInput,
  StyledSmallP,
} from '../../../StyledComponents';
import { Link, useNavigate } from 'react-router-dom';
// import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Typography } from '@mui/joy';

export default function AddService() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/services');
  }
  return (
    <>
      <div className="flex-container">
        <Link to="/settings">
          <ArrowBackIcon />
        </Link>
      </div>

      <Typography style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
        Descrive your service
      </Typography>
      <form className="add-service-container" onSubmit={handleSubmit}>
        <AiOutlineCamera className="add-service-image" />

        <div
          style={{
            marginTop: '3em',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '46vh',
          }}>
          <StyledInput placeholder="Service Name" />
          <StyledInput placeholder="Service Description" />

          <StyledInput
            type="time"
            defaultValue={'01:00'}
            style={{ width: '31em' }}
          />
          <StyledInput type="text" placeholder="Price" />

          <StyledButton onClick={handleSubmit} type="submit" variant="full">
            {' '}
            Add
          </StyledButton>
        </div>
      </form>
    </>
  );
}
