import { Card, CardActions, CardCover, CircularProgress } from '@mui/joy';
import React, { useState } from 'react';

import { storage } from './../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import cameraIcon from '../../../assets/icons/camera.png';
import { deleteImageFromFirebase } from '../../../utils/helperFunctions';

interface Props {
  uid: string;
  setImageUrlForDb: React.Dispatch<React.SetStateAction<string>>;
  dbImgageUrl: string;
}
export default function ImageUploader({
  dbImgageUrl = '',
  uid,
  setImageUrlForDb,
}: Props) {
  //   const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState(
    dbImgageUrl ? dbImgageUrl : cameraIcon
  );
  const [loading, setLoading] = useState(false);
  //image uploader
  async function handleImageInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();

    const inputElement = e.target as HTMLInputElement;
    const files = inputElement.files;
  
    if (!files || files.length === 0) {
      return;
    }

    
    if (imageUrl !== cameraIcon) deleteImageFromFirebase(imageUrl); // if there's an actual image url from firebase, delete the image before uploading a new one.

    const imageUpload = files[0];

    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${uid}_${v4()}}`);
    setLoading(true);
    const imageObj = await uploadBytes(imageRef, imageUpload);

    const imagePathInStorage = imageObj.ref.fullPath;
    // const imagePathInStorage = imageObj.ref._location.path_;

    const imageListRef = ref(storage, imagePathInStorage);
    const imageUrlStr = await getDownloadURL(imageListRef);

    setImageUrl(imageUrlStr);
    setImageUrlForDb(imageUrlStr);
    setLoading(false);
  }
  return (
    <>
      <input
        style={{ display: 'none' }}
        type="file"
        id="file"
        onChange={handleImageInput}
      />
      <label
        // for="file"
        htmlFor="file">
        <Card
          component="li"
          sx={{
            height: '6rem',
            width: '8rem',
            marginInline: 'auto',
            cursor: 'pointer',
          }}>
          <CardActions>
            <CardCover>
              {loading ? (
                <CircularProgress />
              ) : (
                <img src={imageUrl} loading="lazy" alt="Service Image" />
              )}
            </CardCover>
          </CardActions>
        </Card>
      </label>
    </>
  );
}
