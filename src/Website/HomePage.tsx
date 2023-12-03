import { Container } from '@mui/joy';
import Hero from './Hero';
import ClientLogos from './ClientLogos';
import FeaturesBoxes from './featureBoxes/FeaturesBoxes';
import Footer from './Footer';
import CustomersQuotes from './customerQuotes/CustomersQuotes';

import { useState } from 'react';
import NavbarMobile from './navbar/NavbarMobile';
import NavbarDesktop from './navbar/NavbarDesktop';
import { useNavigate } from 'react-router-dom';
import SignInModal from '../components/auth/signIn/SignInModal';
import { useAuth } from '../context/AuthContext';
import CreateAccountModal from '../components/auth/creactAccount/CreateAccountModal';

export default function HomePage() {
  const navigate = useNavigate();
  const { isMobile } = useAuth();

  const [openSignInModal, SetOpenSignInModal] = useState(false);
  const [openCreateAccountModal, SetOpenCreateAccountModal] = useState(false);

  function handleCreateAccount() {
    isMobile ? navigate('../create-account') : SetOpenCreateAccountModal(true);
  }

  function handleLogin() {
    isMobile ? navigate('../signin') : SetOpenSignInModal(true);
  }

  return (
    <>
      {isMobile ? (
        <NavbarMobile handleLogin={handleLogin}  handleCreateAccount={handleCreateAccount}/>
      ) : (
        <NavbarDesktop handleLogin={handleLogin} handleCreateAccount={handleCreateAccount}/>
      )}

      <Container>
        <Hero isMobile={isMobile} handleCreateAccount={handleCreateAccount} />
        <ClientLogos />
        <FeaturesBoxes isMobile={isMobile} />
        <CustomersQuotes isMobile={isMobile} />
        <Footer isMobile={isMobile} handleCreateAccount={handleCreateAccount}/>
      </Container>

      {openSignInModal && (
        <SignInModal open={openSignInModal} setOpen={SetOpenSignInModal} />
      )}
      {openCreateAccountModal && (
        <CreateAccountModal open={openCreateAccountModal} setOpen={SetOpenCreateAccountModal} />
      )}

    </>
  );
}
