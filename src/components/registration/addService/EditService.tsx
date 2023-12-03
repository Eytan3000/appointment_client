import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Alert, Button, Input, Typography } from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteService, getService, udpateService } from '../../../utils/http';
import Loader from '../../utilsComponents/Loader';
import ErrorAlert from '../../utilsComponents/ErrorAlert';
import {
  deleteImageFromFirebase,
  minutesToTimeDuration,
  timeStringToMinutes,
} from '../../../utils/helperFunctions';
import { SyntheticEvent, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ImageUploader from './ImageUploader';

interface ServiceObject {
  description: string | null;
  duration: string | null;
  name: string | null;
  price: string | null;
  service_id: string | null;
  owner_id: string | null;
  img_url: string;
}

export default function AddService() {
  const navigate = useNavigate();
  const { id: serviceId } = useParams();

  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;

  const queryClient = useQueryClient();

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const [imageUrl, setImageUrl] = useState('');
  const [alert, setAlert] = useState(false);

  let button = (
    <Button style={{ marginTop: alert ? 0 : '2rem' }} type="submit">
      {' '}
      Save
    </Button>
  );

  // Mutations:
  //update
  const updateServiceMutation = useMutation({
    mutationFn: udpateService,
    onSuccess: (allOwnerServicesResponse) => {
      queryClient.setQueryData(['services'], allOwnerServicesResponse);
      // queryClient.invalidateQueries(['services'], { exact: true });
      queryClient.invalidateQueries({ queryKey: ['services'], exact: true });
      navigate(-1);
    },
  });

  if (updateServiceMutation.isPending) {
    button = (
      <Button loading type="submit">
        {' '}
        Save
      </Button>
    );
  }

  // delete
  const deleteServiceMutation = useMutation({
    mutationFn: deleteService,
    onSuccess: (allOwnerServicesResponse) => {
      queryClient.setQueryData(['services'], allOwnerServicesResponse);
      // queryClient.invalidateQueries(['services'], { exact: true });
      queryClient.invalidateQueries({
        queryKey: ['services'],
        exact: true,
        refetchType: 'none', //avoid refetching the service between delete and navigate.
      });
      navigate(-1);
    },
    onError: () => setAlert(true),
  });

  // Functions
  function handleSubmit(e: SyntheticEvent, data) {
    e.preventDefault();

    const descriptionNewValue = descriptionRef?.current?.value;
    const durationNewValue = durationRef?.current?.value;
    const nameNewValue = nameRef?.current?.value;
    const priceNewValue = priceRef?.current?.value;

    const newObjectToUpdateDb: ServiceObject = {
      service_id: serviceId,
      owner_id: uid,
    };

    //checking input changed
    if (descriptionNewValue !== data.description)
      newObjectToUpdateDb.description = descriptionNewValue;
    if (durationNewValue !== minutesToTimeDuration(data.duration))
      newObjectToUpdateDb.duration = timeStringToMinutes(durationNewValue);
    if (nameNewValue !== data.name) newObjectToUpdateDb.name = nameNewValue;
    if (priceNewValue !== data.price) newObjectToUpdateDb.price = priceNewValue;
    if (imageUrl !== '') newObjectToUpdateDb.img_url = imageUrl;

    //update with new object.
    updateServiceMutation.mutate(newObjectToUpdateDb);
  }

  async function HandleDelete(img_url: string) {
    if (img_url) {
      const response = await deleteImageFromFirebase(img_url);
      if (response === 'Image deleted') deleteServiceMutation.mutate(serviceId);
      else setAlert(true);
    } else deleteServiceMutation.mutate(serviceId);
  }
  async function handleBackArrowClick() {
    if (imageUrl === '') navigate(-1);
    else {
      await deleteImageFromFirebase(imageUrl);
      navigate(-1);
    }
  }

  // Tanstack query fetch service by serviceId
  const { data, isPending, isError } = useQuery({
    queryKey: ['services', serviceId],
    queryFn: () => getService(serviceId!),
  });

  if (isPending) {
    return <Loader />;
  }
  if (isError) {
    return <ErrorAlert />;
  }
  if (data) {
    const { description, duration, name, price, img_url } = data[0];
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px',
            alignItems: 'center',
          }}>
          <div onClick={handleBackArrowClick}>
            <ArrowBackIcon />
          </div>
        </div>

        <Typography
          style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
          Edit {name} service
        </Typography>

        {/* Image */}
        <ImageUploader
          dbImgageUrl={img_url}
          uid={uid}
          setImageUrlForDb={setImageUrl}
        />

        {/* Form */}
        <form
          onChange={() => setAlert(false)}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // marginTop: '3em',
          }}
          onSubmit={(e) => handleSubmit(e, data[0])}>
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
              slotProps={{ input: { ref: nameRef } }}
              defaultValue={name}
            />
            <Input
              slotProps={{ input: { ref: descriptionRef } }}
              defaultValue={description}
            />
            <Input
              slotProps={{ input: { ref: durationRef } }}
              type="time"
              defaultValue={minutesToTimeDuration(duration)}
            />
            <Input
              slotProps={{ input: { ref: priceRef } }}
              type="text"
              defaultValue={price}
            />
            {alert && <Alert color="danger">Somthing went wrong</Alert>}
            {/* button loading conditionally */}
            {button}

            <Button
              onClick={() => HandleDelete(img_url)}
              variant="outlined"
              color="danger">
              Delete
            </Button>
          </div>
        </form>
      </>
    );
  }
}
