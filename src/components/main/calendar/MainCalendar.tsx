import { Scheduler } from '@aldabil/react-scheduler';
import AddAppointment from './addAppointment/AddAppointment';
import BottomAppBar from '../BottomAppBar';
import { useAuth } from '../../../context/AuthContext';
import { deleteAppointment, fetchAppointments } from '../../../utils/http';
import { minutesToTimeDuration } from '../../../utils/helperFunctions';
import { CircularProgress } from '@mui/joy';
import SideAppColumn from '../SideAppColumn';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

//--------------------------------------------------
export default function MainCalendar() {
  const { currentUser, isMobile } = useAuth() || {};
  const navigate = useNavigate();
  const uid = currentUser?.uid;

  useEffect(() => {
    if (!uid) {
      navigate('/signIn');
    }
  }, [uid, navigate]);

  if (uid) {
    return (
      <>
        <div style={{ marginLeft: isMobile ? '' : '150px' }}>
          <Scheduler
            view="week"
            getRemoteEvents={() => fetchAppointments(uid)}
            // events={}
            week={{
              weekDays: [0, 1, 2, 3, 4, 5],
              weekStartOn: 0,
              startHour: 6,
              endHour: 24,
              navigation: true,
              disableGoToDay: false,
              step: 60,
            }}
            stickyNavitation
            hourFormat="24"
            // to check
            // step: 15,
            // eventRenderer={}
            // fields={}
            // navigationPickerProps={}
            draggable={false}
            customEditor={(scheduler) => {
              return <AddAppointment scheduler={scheduler} />;
            }}
            viewerExtraComponent={(fields, event) => {
              return (
                <div>
                  <p>Service: {event.service.name}</p>
                  <p>Duration: {minutesToTimeDuration(event.service.time)}</p>
                  {/* {event.note !== '' && <p>Note: {event.note}</p>} */}
                </div>
              );
            }}
            onDelete={(id: string) => {
              return new Promise((resolve, reject) => {
                deleteAppointment(id)
                  .then(() => {
                    // eventsSignal.value = eventsSignal.value.filter(
                    //   (event) => event.event_id !== id
                    // );
                    resolve(id);
                  })
                  .catch((err) => {
                    console.log(err);
                    reject(id);
                  });
              });
            }}
          />
        </div>
        {isMobile && <BottomAppBar />}
        {!isMobile && <SideAppColumn />}
      </>
    );
  } else {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: '100vh',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }
}

