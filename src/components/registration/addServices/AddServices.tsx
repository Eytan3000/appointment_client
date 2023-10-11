import { AiOutlineCamera } from 'react-icons/ai';
import {
  StyledButton,
  StyledH3,
  StyledSmallP,
} from '../../../StyledComponents';
import './addServices.css';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../../theme/theme';

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
      <div className="add-services-container">
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
          variant="full">
          Add Service
        </StyledButton>
      </div>
      <hr />

      {/* Service Card */}
      <div
        className="service-card"
        style={{
          background: theme.colors.primary,
        }}>
        <AiOutlineCamera style={{}} className="service-card-camera-icon" />

        <div
          onClick={handleEditService}
          style={{
            marginLeft: '3vh',
          }}>
          <StyledH3
            style={{ color: '#fff', margin: 0, textDecoration: 'underline' }}>
            Manicure
          </StyledH3>
          <StyledSmallP style={{ color: '#fff', margin: 0 }}>
            לק ג'ל בשיטה הרוסית
          </StyledSmallP>
          <div
            style={{
              display: 'flex',
              gap: '2em',
            }}>
            <StyledSmallP style={{ color: '#fff', margin: 0 }}>
              <small>180₪</small>
            </StyledSmallP>
            <StyledSmallP style={{ color: '#fff', margin: 0 }}>
              <small>01:30</small>
            </StyledSmallP>
          </div>
        </div>
      </div>

      <div className="floating-stripe">
        <StyledButton
          onClick={handleNext}
          variant="full-secondary"
          style={{ paddingInline: 50 }}>
          Next
        </StyledButton>
      </div>
    </>
  );
}
