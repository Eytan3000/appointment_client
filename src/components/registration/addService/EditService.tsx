import { AiOutlineCamera } from 'react-icons/ai';
import './addSevice.css';
import {
  StyledButton,
  StyledInput,
  StyledSmallP,
} from '../../../StyledComponents';
import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';

export default function EditService() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/add-services');
  }
  return (
    <>
      <div className="flex-container">
        <Link to="/add-services">
          <img src={backArrow} alt="back-arrow" />
        </Link>
      </div>

      <StyledSmallP style={{ textAlign: 'center', marginTop: '0px', marginBottom:'-9px' }}>
        Descrive your service
      </StyledSmallP>
      <form className="add-service-container" onSubmit={handleSubmit}>
        <AiOutlineCamera className="add-service-image-edit" />

        <div
          style={{
            marginTop: '2em',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '46vh',
          }}>
          <StyledInput placeholder="Service Name" />
          <StyledInput placeholder="Service Description" />

          <StyledInput type="time" placeholder="Duration" />
          <StyledInput type="text" placeholder="Price" />

          <StyledButton onClick={handleSubmit} type="submit" variant="full">
            {' '}
            Save
          </StyledButton>
          <StyledButton style={{color:'#ee3f4d', width:'100%', marginTop:'4px'}} onClick={handleSubmit} type="submit" variant="primary">
            {' '}
            Delete
          </StyledButton>
        </div>
      </form>
    </>
  );
}
