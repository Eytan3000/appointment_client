import { Checkbox } from '@mui/joy';
import { StyledH3, StyledSmallP } from '../../../StyledComponents';

export default function AdvancedWorkHours({
  day,
  checked,
}: {
  day: string;
  checked: boolean;
}) {
  return (
    <div className="advanced-hours-card">
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <StyledH3 style={{ marginTop: '-4px' }}>{day}</StyledH3>
          <Checkbox defaultChecked={checked}/>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: '-21px',
            gap: '2em',
          }}>
          <div>
            <StyledSmallP style={{ marginLeft: '0.5em' }}>
              <small>Strat</small>
            </StyledSmallP>
            <input
              className="workhours-time-input"
              type="time"
              defaultValue={'08:00'}
            />
          </div>
          <div>
            <StyledSmallP style={{ marginLeft: '0.5em' }}>
              <small>End</small>
            </StyledSmallP>
            <input
              className="workhours-time-input"
              type="time"
              defaultValue={'16:00'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
