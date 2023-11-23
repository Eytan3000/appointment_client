import { Container } from '@mui/joy';
import Navbar from './Navbar';
import Hero from './Hero';
import ClientLogos from './ClientLogos';
import FeaturesBoxes from './featureBoxes/FeaturesBoxes';
import Footer from './Footer';
import CustomersQuotes from './customerQuotes/CustomersQuotes';

export default function HomePage() {
  return (
    <>
      <Navbar />

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
