import {
  StyledButton,
  StyledH3,
  StyledSmallP,
} from '../../../StyledComponents';
import './workHours.css';
import Checkbox from '@mui/joy/Checkbox';
import { Button } from '@mui/joy';
import { Link, useNavigate } from 'react-router-dom';
import backArrow from '../../../assets/icons/Arrow - Down 2.png';

const weekDays = [
  { day: 'sunday', checked: true },
  { day: 'monday', checked: true },
  { day: 'tuesday', checked: true },
  { day: 'wednesday', checked: true },
  { day: 'thursday', checked: true },
  { day: 'friday', checked: false },
  { day: 'saturday', checked: false },
];

export default function WorkHours() {
  const navigate = useNavigate();
  function handleSubmit() {
    navigate('/main-calendar');
  }
  function handleAdvancedOptions() {
    navigate('/workhours-advanced-options');
  }
  return (
    <>
      <div className="flex-container">
        <Link to="/add-services">
          <img src={backArrow} alt="back-arrow" />
        </Link>
      </div>
      <div className="workhours-main-container">
        <StyledH3>Workweek</StyledH3>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Checkboxes */}
        <div className="days-checkboxes">
          {weekDays.map(({ day, checked }) => {
            return (
              <div className='workdays-checkbox-container'>
                <StyledSmallP style={{ marginBottom: '4px' }}>
                  {day[0].toUpperCase()}
                </StyledSmallP>
                <Checkbox
                  color="neutral"
                  variant="soft"
                  size="lg"
                  defaultChecked={checked}
                />
              </div>
            );
          })}
        </div>

        {/* hours */}
        <div className="hours-card">
          <div
            id="time-range"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '-18px',
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

        {/* Buttons */}
        <div className="workhours-button-container">
          <Button
            style={{ fontFamily: 'Poppins' }}
            color="neutral"
            onClick={handleAdvancedOptions}
            size="sm"
            variant="plain">
            Advanced Options{' '}
          </Button>
          <StyledButton type="submit" variant="full">
            Next
          </StyledButton>
        </div>
      </form>
    </>
  );
}
