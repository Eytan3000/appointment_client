import { Button, Container, Input, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBusiness } from '../../../utils/http';
import { useAuth } from '../../../context/AuthContext';
import Shape1 from '../../../assets/Images/shapes/Shape1.svg';
import Shape2 from '../../../assets/Images/shapes/Shape2.svg';
import NavbarDesktop from '../../../Website/navbar/NavbarDesktop';
import NavbarMobile from '../../../Website/navbar/NavbarMobile';
import NavbarRegistration from '../../../Website/navbar/NavbarRegistration';
// import './addBusiness.css'

export default function AddBusiness() {
  const navigate = useNavigate();
  const { currentUser, isMobile } = useAuth() || {};
  console.log(isMobile);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: createBusiness,
    mutationKey: ['business'],
    onSuccess: () => {
      navigate('/services');
    },
  });

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    const ownerId = currentUser?.uid;

    if (ownerId) mutate({ ownerId, name, address, phone });
  }
  return (
    <>
    {/* <NavbarDesktop /> */}
    <NavbarRegistration />
      {/* <img
        className="add__business--shape1"
        style={{
          position: 'fixed',
          top: '40vh',
          left: '40vw',
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
        src={Shape1}
        alt="blue shape 1"
      />
      <img
        className="add__business--shape2"
        style={{
          position: 'fixed',
          top: '-60vh',
          left: '-40vw',
          width: '100vw',
          height: '100vh',
          zIndex: -1,
        }}
        src={Shape2}
        alt="blue shape 1"
      /> */}

      <Container
        className="add__business--container"
        style={{
          marginTop: isMobile ? '6rem' :'',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <div
          className="add__business--container--div"
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '2rem',

            border: isMobile ? '' : '0.5px solid grey',
            padding: isMobile ? '' : '4rem',
            borderRadius: isMobile ? '' : '20px',
            background: isMobile ? '' : '#ffff',
            height: isMobile ? '' : '40vh',
            width: isMobile ? '' : '20vw',
          }}>
          <div
            className="add__business--container--title"
            style={{ display: 'flex', alignItems: 'center', gap: '0.7rem' }}>
            <Typography level="h4">Business Detalis</Typography>
          </div>

          <form
            onSubmit={handleSubmit}
            className="add__business--container--form"
            style={{
              marginBlock: '2rem',
              marginLeft: '0.4rem',
              // width: '80%'
              height: '80vh',
            }}>
            <Typography level="title-md">Business Name</Typography>
            <Input
              required
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />

            <Typography level="title-md">Business Address</Typography>
            <Input
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setAddress(e.target.value)}
            />

            <Typography level="title-md">Business Phone</Typography>
            <Input
              required
              sx={{ my: '1rem' }}
              type="text"
              onChange={(e) => setPhone(e.target.value)}
            />

            <Button
              style={{ marginTop: 'auto' }}
              type="submit"
              disabled={isPending}>
              Continue
            </Button>
          </form>
        </div>
      </Container>
    </>
  );
}
