import { StyledButton } from '../../../StyledComponents';
import './workHours.css';
import AdvancedWorkHoursCard from './AdvancedWorkHoursCard';
import { useNavigate } from 'react-router-dom';

export default function WorkHoursAdvanced() {
  const navigate = useNavigate();
  function handleOk() {
    navigate('/main-calendar');
  }
  return (
    <>
      <AdvancedWorkHoursCard day="Sunday" checked={true} />
      <AdvancedWorkHoursCard day="Monday" checked={true} />
      <AdvancedWorkHoursCard day="Tuesday" checked={true} />
      <AdvancedWorkHoursCard day="Wednesday" checked={true} />
      <AdvancedWorkHoursCard day="Thursday" checked={true} />
      <AdvancedWorkHoursCard day="Friday" checked={false} />
      <AdvancedWorkHoursCard day="Saturday" checked={false} />

      <div style={{ height: '5em' }}></div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#fff',
          border: '1px solid #c4c4c4',
          height: '5rem',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
        }}>
        <StyledButton
          onClick={handleOk}
          variant="full"
          style={{ paddingInline: 50 }}>
          Ok
        </StyledButton>
      </div>
    </>
  );
}
