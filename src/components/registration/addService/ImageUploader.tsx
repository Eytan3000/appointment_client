import { Card, CardActions, CardCover } from '@mui/joy';
import React, { useState } from 'react';

import { storage } from './../../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid';
import cameraIcon from '../../../assets/icons/camera.png'


export default function ImageUploader({uid}) {
//   const [imageUpload, setImageUpload] = useState();
  const [imageUrl, setImageUrl] = useState(cameraIcon);
  //image uploader
  async function handleImageInput(e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault();
    // setImageUpload(e.target.files[0]);
    const imageUpload = e.target.files[0];

    console.log('clicked');
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${uid}_${v4()}}`);

    const imageObj = await uploadBytes(imageRef, imageUpload);
    const imagePathInStorage = imageObj.ref._location.path_;
    console.log(imagePathInStorage);

    const imageListRef1 = ref(storage, imagePathInStorage);
    const imageUrl = await getDownloadURL(imageListRef1);

    setImageUrl(imageUrl);
  }

  return (
    <>
      <input
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
              <img src={imageUrl} loading="lazy" alt="Service Image" />
            </CardCover>
          </CardActions>
        </Card>
      </label>
    </>
  );
}
