import { Link, useNavigate } from 'react-router-dom';
// import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AiOutlineCamera } from 'react-icons/ai';
import {
  Alert,
  Button,
  Card,
  CardActions,
  CardCover,
  Input,
  Typography,
} from '@mui/joy';
import { SyntheticEvent, useRef, useState } from 'react';
import { createService } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import { isWholeNumber } from '../../../utils/helperFunctions';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function AddService() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const uid = currentUser.uid;



  // // get uid from storage in json
  // const userData = localStorage.getItem('user');
  // const { uid } = JSON.parse(userData!);

  const queryClient = useQueryClient();

  const [alert, setAlert] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const addServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: (allOwnerServicesResponse) => {
      queryClient.setQueryData(['services'], allOwnerServicesResponse.data);
      queryClient.invalidateQueries(['services'], { exact: true });
      navigate('/services');
    },
  });

  async function handleSubmit(e: SyntheticEvent<HTMLFormElement, SubmitEvent>) {
    e.preventDefault();

    const name = nameRef?.current?.value || '';
    const description = descriptionRef?.current?.value || '';
    const duration = durationRef?.current?.value || '';
    const price = priceRef?.current?.value || '';

    // Data validation
    if (!name) {
      return setAlert('Please fill in service name and price.');
    }
    if (!isWholeNumber(price)) {
      setAlert('price must be a whole number (e.g. 120).');
      return;
    }
    // console.log(duration)
    addServiceMutation.mutate({ name, description, duration, price, uid });
    // try {
    //   setLoading(true);
    //   const result = await createService(
    //     name,
    //     description,
    //     duration,
    //     price,
    //     currentUser.uid
    //   );
    //   if (result.status !== 201) {
    //     console.log(result.response.data.error[0].msg);
    //     throw new Error('Something went wrong');
    //   }

    //   setLoading(false);
    //   navigate('/services');
    // } catch (error: unknown) {
    //   if (error instanceof Error) setAlert(error.message);
    //   else setAlert('An unknown error occurred.');
    //   setLoading(false);
    // }
  }
  function changeHandler() {
    setAlert(null);
  }
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '14px',
          alignItems: 'center',
        }}>
        <Link
          // to={-1}
          to="#"
          onClick={() => window.history.back()}>
          <ArrowBackIcon />
        </Link>
      </div>

      <Typography style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
        Descrive your service
      </Typography>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '3em',
        }}
        onSubmit={handleSubmit}>
        <Card
          component="li"
          sx={{ flexGrow: 1, height: '6rem', width: '8rem' }}>
          <CardActions>
            <CardCover>
              <img
                src="https://www.rockabillyhairstyle.com/wp-content/uploads/images/4-white-nail-art-with-leaves.jpg"
                loading="lazy"
                alt="Service Image"
              />
              {/* <div style={{ fontSize: '4rem' }}>
                <AiOutlineCamera />
              </div> */}
            </CardCover>
          </CardActions>
          {/* <CardContent>
            <Typography
              level="body-lg"
              fontWeight="lg"
              // textColor="#fff"
              mt={{ xs: 12, sm: 18 }}>
              Image
            </Typography>
          </CardContent> */}
        </Card>

        <div
          style={{
            marginTop: '3em',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '46vh',
            gap: '1rem',
          }}>
          <Input
            onChange={changeHandler}
            slotProps={{ input: { ref: nameRef } }}
            placeholder="Service Name"
            required
          />
          <Input
            onChange={changeHandler}
            slotProps={{ input: { ref: descriptionRef } }}
            placeholder="Service Description"
          />
          <Input
            onChange={changeHandler}
            slotProps={{ input: { ref: durationRef } }}
            type="time"
            defaultValue={'01:00'}
          />
          <Input
            onChange={changeHandler}
            slotProps={{ input: { ref: priceRef } }}
            type="text"
            placeholder="Price"
          />

          <Button loading={loading} type="submit" style={{ marginTop: '2rem' }}>
            {' '}
            Add
          </Button>
          {alert && (
            <Alert variant="soft" color="danger">
              {alert}
            </Alert>
          )}
        </div>
      </form>
    </>
  );
}
