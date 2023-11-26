import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Alert, Button, Container, Input, Typography } from '@mui/joy';
import { SyntheticEvent, useRef, useState } from 'react';
import { createService } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import {
  deleteImageFromFirebase,
  isWholeNumber,
} from '../../../utils/helperFunctions';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import ImageUploader from './ImageUploader';

export default function AddService() {
  const navigate = useNavigate();
  const { currentUser } = useAuth() || {};
  const uid = currentUser?.uid;

  // // get uid from storage in json
  // const userData = localStorage.getItem('user');
  // const { uid } = JSON.parse(userData!);

  const queryClient = useQueryClient();

  const [alert, setAlert] = useState<string | null>(null);
  const [loading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const nameRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  const addServiceMutation = useMutation({
    mutationFn: createService,
    onSuccess: (allOwnerServicesResponse) => {
      queryClient.setQueryData(['services'], allOwnerServicesResponse.data);
      // queryClient.invalidateQueries(['services'], { exact: true });
      queryClient.invalidateQueries({ queryKey: ['services'], exact: true });
      navigate(-1);
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
    if (uid)
      addServiceMutation.mutate({
        name,
        description,
        duration,
        price,
        uid,
        img_url: imageUrl,
      });
  }
  function changeHandler() {
    setAlert(null);
  }
  async function handleBackArrowClick() {
    if (imageUrl === '') navigate(-1);
    else {
      await deleteImageFromFirebase(imageUrl);
      navigate(-1);
    }
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
          <div onClick={handleBackArrowClick}>
            <ArrowBackIcon />
          </div>
        </div>

        <Typography
          style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
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
          <ImageUploader uid={uid} setImageUrlForDb={setImageUrl} />

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

            <Button
              loading={loading}
              type="submit"
              style={{ marginTop: '2rem' }}>
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
