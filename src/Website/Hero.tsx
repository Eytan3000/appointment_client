import { Button, Typography } from '@mui/joy';
import heroImage from '../assets/Images/hero.png';
import star from '../assets/icons/star.svg';
import './hero.css';

export default function Hero({
  isMobile,
  handleCreateAccount,
}: {
  isMobile: boolean;
  handleCreateAccount: () => void;
}) {


  return (
    <div className="hero__main__div">
      <div className="hero__titles__div">
        <Typography level="h1">
          Business calendar for scheduling appointments
        </Typography>
        <Typography>
          Manage appointments, streamline your schedule, boost productivity: All
          in your hand. Say goodbye to hassles, embrace efficiency effortlessly.
        </Typography>
        <div className="hero__button__div">
          <Button
            className="hero__button__div--signup--button"
            onClick={handleCreateAccount}>
            Sign Up
          </Button>
          <div className="hero__button__div--signup--button--caption">
            <Typography
              level="body-xs"
              // sx={{ mt: 2, textAlign: 'center', paddingRight: '48%' }}
            >
              FREE FOREVER. <br />
              NO CREDIT CARD.
            </Typography>
          </div>
        </div>
        <div className="hero__star__div">
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <img src={star} alt="star" />
          <Typography ml={2} level="body-xs">
            Based on 10,000+ reviews
          </Typography>
        </div>
      </div>
      <img src={heroImage} alt="Hero Image" className="hero__img" />
    </div>
  );
}
