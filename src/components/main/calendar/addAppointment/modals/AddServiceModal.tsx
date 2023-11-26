import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy';
import ServiceCard from '../utils/ServiceCard';
import { services } from '../../../../../utils/db';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../../context/AuthContext';
import { getAllServices } from '../../../../../utils/http';
import { Alert, CircularProgress } from '@mui/joy';
import { serviceSignal } from '../AddAppointment';
import { addMinutesToTime } from '../../../../../utils/helperFunctions';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  img_url: string;
  owner_id: string;
}

export default function AddServiceModal({ open, setOpen, startTime,
  setEndTime }) {
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;

  const queryClient = useQueryClient();

  const { data, isPending, isError } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllServices(uid!),
    enabled: !!uid,
  });

  let whatToShow;

  if (isPending) {
    whatToShow = (
      <div
        style={{
          display: 'felx',
          justifyContent: 'center',
          height: '50vh',
          alignItems: 'center',
        }}>
        <CircularProgress />
      </div>
    );
  }
  if (isError) {
    whatToShow = <Alert color="danger">Opps! Something went wrong</Alert>;
  }

  if (data) {

    whatToShow = data.map((service: Service) => (
      <div key={service.id} onClick={() => handleServiceClick(service)}>
        <ServiceCard
          imgUrl={service.img_url}
          serviceTitle={service.name}
          price={service.price}
          time={service.duration}
        />
      </div>
    ));
  }

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog layout={'center'}>
        <div style={{ marginBlock: '1rem' }}>
          <ModalClose />
        </div>

        {whatToShow}
      </ModalDialog>
    </Modal>
  );
// console.log(startTime);
  // Functions
  function handleServiceClick(service: Service) {
    serviceSignal.value = service;
    setEndTime(addMinutesToTime(startTime, service.duration));
    // queryClient.invalidateQueries({ queryKey: ['service'] }); //added // , service.id

    
    setOpen(false);
  }
}


