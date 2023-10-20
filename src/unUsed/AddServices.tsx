import { AiOutlineCamera } from 'react-icons/ai';
import {
  StyledButton,
  StyledH3,
  StyledSmallP,
} from '../StyledComponents';
// import './addServices.css';
import { useNavigate } from 'react-router-dom';
//-------------------------------------------
const price = '180';
const serviceTitle = 'Manicure';
const time = '01:30';
const description = `לק ג'ל בשיטה הרוסית`;
const image = (
  <AiOutlineCamera style={{}} className="service-card-camera-icon" />
);
//-------------------------------------------

export default function AddServices() {
  const navigate = useNavigate();
  function handleAddService() {
    navigate('/add-service');
  }
  function handleEditService() {
    navigate('/edit-service');
  }
  function handleNext() {
    navigate('/work-hours');
  }
  return (
    <>
      {/* <div
        style={{
          // display: 'flex',
          // justifyContent: 'column',
          // alignItems: 'center',
        }}> */}
      <div className="services-container">
        <h3 className="what-services-title">What services do you offer?</h3>
        <p className="what-services-paragraph">
          <small>
            List your services to help your clients book exactly what they need
          </small>
        </p>

        <StyledButton
          onClick={handleAddService}
          type="submit"
          className="styled-button"
          variant="secondary">
          <small>Add Service</small>
        </StyledButton>

        {/* <hr /> */}

        {/* Card */}
        <div
          onClick={handleEditService}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'start',
            padding: '1em 2em',
            border: '1px solid transparent',
            borderRadius: '20px',
            backgroundImage:
              'linear-gradient(white, white), linear-gradient(274deg, #92a3fd 0%, #9dceff 124.45%)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
            width: '70%',
          }}>
          {image}

          <div>
            <StyledH3 style={{ margin: 0, textDecoration: 'underline' }}>
              {serviceTitle}
            </StyledH3>
            <StyledSmallP style={{ margin: 0 }}>{description}</StyledSmallP>
            <div
              style={{
                display: 'flex',
                gap: '2em',
              }}>
              <StyledSmallP style={{ margin: 0 }}>
                <small>{price + ' ₪'}</small>
              </StyledSmallP>
              <StyledSmallP style={{ margin: 0 }}>
                <small>{time}</small>
              </StyledSmallP>
            </div>
          </div>
        </div>

        {/* ------------ */}

        <div className="floating-stripe">
          <StyledButton
            onClick={handleNext}
            variant="full"
            style={{ paddingInline: 50 }}>
            Next
          </StyledButton>
        </div>
      </div>
      {/* </div> */}
    </>
  );
}
