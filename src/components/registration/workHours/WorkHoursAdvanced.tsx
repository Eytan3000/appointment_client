import { StyledButton } from '../../../StyledComponents';
import './workHours.css';
import AdvancedWorkHours from './AdvancedWorkHours';
import { useNavigate } from 'react-router-dom';

export default function WorkHoursAdvanced() {
  const navigate = useNavigate();
  function handleOk() {
    navigate('/main-calendar');
  }
  return (
    <>
      <AdvancedWorkHours day="Sunday" checked={true} />
      <AdvancedWorkHours day="Monday" checked={true} />
      <AdvancedWorkHours day="Tuesday" checked={true} />
      <AdvancedWorkHours day="Wednesday" checked={true} />
      <AdvancedWorkHours day="Thursday" checked={true} />
      <AdvancedWorkHours day="Friday" checked={false} />
      <AdvancedWorkHours day="Saturday" checked={false} />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StyledButton
          variant={'full'}
          style={{ width: '15em', marginBottom: '7em' }}
          onClick={handleOk}>
          OK
        </StyledButton>
      </div>
    </>
  );
}
