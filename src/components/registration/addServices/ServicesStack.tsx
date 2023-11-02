import { Alert, CircularProgress, Typography } from '@mui/joy';
import ServiceCard from '../../main/calendar/addAppointment/utils/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../../../utils/http';
import { User, getAuth } from 'firebase/auth';
import { useNavigate, useParams } from 'react-router-dom';
import AddService from '../addService/AddService';
import { useAuth } from '../../../context/AuthContext';
import { useEffect, useState } from 'react';
import { auth } from '../../../firebase';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
}

export default function ServicesStack({setAreThereAnyServices}) {
  const navigate = useNavigate();
  
  const { currentUser } =  useAuth();
  const uid = currentUser.uid;

  //function
  function handleClick(id: number) {
    navigate('/edit-service/' + id);
  }

  // Tanstack Query:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllServices(uid),
  });

  if (isPending) {
    return (
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}>
          <CircularProgress size="lg" variant="soft" />
        </div>
      </div>
    );
  }
  if (isError) {
    console.log(error);
    return (
      <Alert color="danger">
        Oops! There was a problem fetching your services.
      </Alert>
    );
  }

  if (data.length === 0) {
    // return (
    //   <Typography style={{ margin: 'auto', marginTop: '1rem' }}>
    //     Please add services
    //   </Typography>
    // );
    return null;
  }

  if (data.length > 0) {
    setAreThereAnyServices(true);
    return data.map((service: Service) => (
      <div key={service.id} onClick={() => handleClick(service.id)}>
        <ServiceCard
          key={service.id}
          serviceTitle={service.name}
          description={service.description}
          time={service.duration}
          price={service.price}
        />
      </div>
    ));
  }
}


  // // Retrieve the user data from local storage (json)
  // const userData = localStorage.getItem('user'); 
  // const { uid } = JSON.parse(userData!);