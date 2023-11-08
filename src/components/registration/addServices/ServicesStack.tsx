import { Alert, CircularProgress } from '@mui/joy';
import ServiceCard from '../../main/calendar/addAppointment/utils/ServiceCard';
import { useQuery } from '@tanstack/react-query';
import { getAllServices } from '../../../utils/http';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  img_url: string;
}

export default function ServicesStack() {
  // { setAreThereAnyServices }
  const navigate = useNavigate();
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;
  // const [uid] = useState(currentUser?.uid);

  // Tanstack Query:
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['services'],
    queryFn: () => getAllServices(uid!),
    enabled: !!currentUser,
  });

  //function
  function handleClick(id: number) {
    navigate('/edit-service/' + id);
  }

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
    console.log(data);
    // setAreThereAnyServices(true);
    return data.map((service: Service) => (
      <div key={service.id} onClick={() => handleClick(service.id)}>
        <ServiceCard
          key={service.id}
          serviceTitle={service.name}
          description={service.description}
          time={service.duration}
          price={service.price}
          imgUrl={service.img_url}
        />
      </div>
    ));
  }
}

// // Retrieve the user data from local storage (json)
// const userData = localStorage.getItem('user');
// const { uid } = JSON.parse(userData!);
