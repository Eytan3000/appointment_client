import { Link, useNavigate, useParams } from 'react-router-dom';
// import backArrow from '../../../assets/icons/Arrow - Down 2.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { AiOutlineCamera } from 'react-icons/ai';
import {
  Button,
  Card,
  CardActions,
  CardCover,
  Input,
  Typography,
} from '@mui/joy';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteService, getService, udpateService } from '../../../utils/http';
import Loader from '../../utilsComponents/Loader';
import ErrorAlert from '../../utilsComponents/ErrorAlert';
import {
  minutesToTimeDuration,
  timeStringToMinutes,
} from '../../../utils/helperFunctions';
import { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ImageUploader from './ImageUploader';
// import { storage } from './../../../firebase';
// import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
// import { v4 } from 'uuid';
// import cameraIcon from '../../../assets/icons/camera.png'

interface ServiceObject {
  description: string | null;
  duration: string | null;
  name: string | null;
  price: string | null;
  service_id: string | null;
  owner_id: string | null;
}

export default function AddService() {
  const navigate = useNavigate();
  const { id: serviceId } = useParams();

  //get ui from storage in json
  // const userData = localStorage.getItem('user');
  // const { uid } = JSON.parse(userData!);

  const { currentUser } = useAuth();
  const uid = currentUser.uid;

  const queryClient = useQueryClient();

  const descriptionRef = useRef<HTMLInputElement | null>(null);
  const durationRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const priceRef = useRef<HTMLInputElement | null>(null);

  // const [imageUpload, setImageUpload] = useState();
  // // const [imageList, setImageList] = useState([]);
  // // const imageListRef = ref(storage, 'images/');
  // const [imageUrl, setImageUrl] = useState(cameraIcon);

  let button = (
    <Button style={{ marginTop: '2rem' }} type="submit">
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
      queryClient.invalidateQueries(['services'], { exact: true });
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
      navigate('/services');
    },
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

    //update with new object.
    updateServiceMutation.mutate(newObjectToUpdateDb);
  }

  function HandleDelete() {
    deleteServiceMutation.mutate(serviceId);
  }

  //image uploader
  // async function handleImageInput(e: React.FormEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setImageUpload(e.target.files[0]);

  //   console.log('clicked');
  //   if (imageUpload === null) return;

  //   const imageRef = ref(storage, `images/${uid}_${v4()}}`);

  //   const imageObj = await uploadBytes(imageRef, imageUpload);
  //   const imagePathInStorage = imageObj.ref._location.path_;
  //   console.log(imagePathInStorage);

  //   const imageListRef1 = ref(storage, imagePathInStorage);
  //   const imageUrl = await getDownloadURL(imageListRef1);

  //   setImageUrl(imageUrl);
  // }

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
    const { description, duration, name, price } = data[0];
    return (
      <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '14px',
            alignItems: 'center',
          }}>
          <Link to={-1}>
            <ArrowBackIcon />
          </Link>
        </div>

        <Typography
          style={{ textAlign: 'center', margin: '0px 16px 32px 16px' }}>
          Descrive your service
        </Typography>

        {/* Image */}
        <ImageUploader uid={uid} />
        {/* <input
          style={{ display: 'none' }}
          type="file"
          id="file"
          onChange={handleImageInput}
        />
        <label for="file">
          <Card
            component="li"
            sx={{ height: '6rem', width: '8rem', marginInline: 'auto' }}>
            <CardActions>
              <CardCover>
                <img
                  src={imageUrl}
                  loading="lazy"
                  alt="Service Image"
                />
              </CardCover>
            </CardActions>
          </Card>
        </label> */}

        {/* Form */}
        <form
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

            {/* button loading conditionally */}
            {button}

            <Button onClick={HandleDelete} variant="outlined" color="danger">
              Delete
            </Button>
          </div>
        </form>
      </>
    );
  }
}
