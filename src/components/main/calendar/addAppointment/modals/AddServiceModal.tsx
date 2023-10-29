import {
  Box,
  Button,
  Divider,
  Modal,
  ModalClose,
  ModalDialog,
  Stack,
} from '@mui/joy';
import ServiceList from './ServiceList';
import ServiceCard from '../utils/ServiceCard';
import { services } from '../../../../../utils/db';

export default function AddServiceModal({ open, setOpen }) {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <ModalDialog layout={'fullscreen'} >
        <div style={{marginBlock:'1rem'}}>
          <ModalClose />
        </div>
        {services.map((service, index) => (
          <ServiceCard key={index}/>
        ))}
      </ModalDialog>
    </Modal>
  );
}
