import './workHours.css';
import Checkbox from '@mui/joy/Checkbox';
import { Button, Stack, Typography } from '@mui/joy';
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
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginInline: '1rem',
          marginBlock: '2rem 1rem',
        }}>
        <Link
          // to={-1}
          to="#"
          onClick={() => window.history.back()}>
          <img src={backArrow} alt="back-arrow" />
        </Link>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Typography level="h3">Workweek</Typography>
      </div>

      <form
        style={{ height: '75vh', display: 'flex', flexDirection: 'column' }}
        onSubmit={handleSubmit}>
        {/* Checkboxes */}
        <div className="days-checkboxes">
          {weekDays.map(({ day, checked }, index) => {
            return (
              <div className="workdays-checkbox-container" key={index}>
                <Typography level="body-md" style={{ marginBottom: '4px' }}>
                  {day[0].toUpperCase()}
                </Typography>
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
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>Strat</small>
              </Typography>
              <input
                className="workhours-time-input"
                type="time"
                defaultValue={'08:00'}
              />
            </div>
            <div>
              <Typography style={{ marginLeft: '0.5em' }}>
                <small>End</small>
              </Typography>
              <input
                className="workhours-time-input"
                type="time"
                defaultValue={'16:00'}
              />
            </div>
          </div>
        </div>

        <Stack spacing={2} mt={3}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Typography level="title-md">Advanced Options</Typography>
          </div>
          <Button onClick={handleAdvancedOptions} size="sm" variant="plain">
            Different daily work hours{' '}
          </Button>
        </Stack>

        <Button style={{ marginTop: 'auto' }} type="submit">
          Next
        </Button>
      </form>
    </>
  );
}
