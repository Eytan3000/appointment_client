import { StyledButton } from '../../../StyledComponents';
import './workHours.css';
import AdvancedWorkHoursCard from './AdvancedWorkHoursCard';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/joy';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';

import { isWorkDaysArr } from './EditWorkHours';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateDailySchedule } from '../../../utils/http';

export default function WorkHoursAdvanced() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Tanstack Mutate
  const editWorkhoursMutation = useMutation({
    mutationFn: updateDailySchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['workweek'],
        // refetchType: 'none',
        // refetchType: 'active',

      });
      navigate('/settings');
    },
  });

  function handleOk() {
    editWorkhoursMutation.mutate(isWorkDaysArr.value);
  }
  return (
    <>
      {isWorkDaysArr.value.map((day) => {
        return (
          <AdvancedWorkHoursCard
            key={day.id}
            id={day.id}
            day={day.dayName}
            checked={day.isWorkDay}
            startTime={day.start_time}
            endTime={day.endTime}
          />
        );
      })}

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
        <div style={{ paddingLeft: '1.5rem' }}></div>
      </div>
    </>
  );
}
