import { StyledButton } from '../../../StyledComponents';
import './workHours.css';
import AdvancedWorkHoursCard from './AdvancedWorkHoursCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';
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
          justifyContent: 'space-between',
          backgroundColor: '#fff',
          border: '1px solid #c4c4c4',
          height: '5rem',
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
        }}>
        {/* Back Arrow Icon */}
        <div
          style={{
            display: 'flex',
            padding: '14px',
            alignItems: 'center',
          }}>
          <img onClick={() => navigate(-1)} src={backArrow} alt="back-arrow" />
        </div>
        <Button
          onClick={handleOk}
          style={{ paddingInline: 50, marginBlock: 15 }}>
          Ok
        </Button>
        <div style={{paddingLeft:'1.5rem'}}></div>
      </div>
    </>
  );
}
