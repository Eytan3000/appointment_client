import { Container } from '@mui/joy';
import Hero from './Hero';
import ClientLogos from './ClientLogos';
import FeaturesBoxes from './featureBoxes/FeaturesBoxes';
import Footer from './Footer';
import CustomersQuotes from './customerQuotes/CustomersQuotes';
import NavbarSwitch from './navbar/NavbarSwitch';

export default function HomePage() {
  return (
    <>
      <NavbarSwitch />

      <Container>
        <Hero />
        <ClientLogos />
        <FeaturesBoxes />
      </Container>

      <Container>
        <CustomersQuotes />
        <Footer />
      </Container>
    </>
  );
}
