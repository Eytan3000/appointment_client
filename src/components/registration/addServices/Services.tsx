import './addServices.css';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Divider, Stack, Typography } from '@mui/joy';
import { useState } from 'react';
import ServicesStack from './ServicesStack';
import BackArrow from '../../utilsComponents/BackArrow';
import { getAuth } from 'firebase/auth';
//-------------------------------------------
// interface Service {
//   id: number;
//   name: string;
//   description: string;
//   duration: string;
//   price: string;
// }
//-------------------------------------------

export default function Services() {
  const navigate = useNavigate();

  // const [areThereAnyServices, setAreThereAnyServices] = useState(false);

  const { isMobile } = getAuth();

  // check if user comes from settings or signup
  const isInSettings = window.location.href.includes('settings');

  function handleAddService() {
    // navigate('/add-service');
    navigate('/add-service');
  }
  // function handleEditService() {
  //   navigate('/edit-service');
  // }
  function handleNext() {
    navigate('/work-hours');
  }
  return (
    <>
      {isInSettings && isMobile && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6.5rem',
            marginTop: '-10px',
          }}>
          <BackArrow />
          {/* <Typography>services</Typography> */}
        </div>
      )}
      <Box
      mt={isMobile ? 2 : 10}
        display={'flex'}
        alignItems={'center'}
        flexDirection={'column'}
        textAlign={'center'}>
        <Stack spacing={2} mb={2} mt={isInSettings ? 0 : 2}>
          <Typography level="h4">What services do you offer?</Typography>
          <Typography>
            List your services to help your clients book exactly what they need
          </Typography>
          <Button onClick={handleAddService} variant="plain">
            Add Service
          </Button>
        </Stack>
      </Box>
      <Divider />

      {/* Services Stack */}
      <Stack marginBottom={12}>
        <ServicesStack
        // setAreThereAnyServices={setAreThereAnyServices}
        />
      </Stack>

      {/* Floating bar */}
      {!isInSettings && (
        <div className="floating-stripe">
          <Button
            // disabled={!areThereAnyServices}
            onClick={handleNext}
            // variant="full"
            style={{
              paddingInline: 50,
              margin: '1rem',
            }}>
            Next
          </Button>
        </div>
      )}
    </>
  );
}
