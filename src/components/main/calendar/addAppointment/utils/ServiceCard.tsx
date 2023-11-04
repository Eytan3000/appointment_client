import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { minutesToTimeDuration } from '../../../../../utils/helperFunctions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
  serviceTitle: string;
  description: string;
  time: string;
  price: string;
  imgUrl:string;
}

export default function ServiceCard({
  serviceTitle,
  description,
  time,
  price,
  imgUrl
}: Props) {
  return (
    <Card
      orientation="horizontal"
      variant="outlined"
      sx={{ width: 260, marginInline: 'auto', mt: 2 }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src={imgUrl}
            // src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            // srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography fontWeight="md" textColor="success.plainColor">
          {serviceTitle}{' '}
        </Typography>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
          }}>
          <Typography level="body-sm">{price} ₪</Typography>{' '}
          <div
            style={{
              display: 'flex',
              gap: '6px',
            }}>
            <AccessTimeIcon sx={{ fontSize: '1rem', marginTop: '2px' }} />
            <Typography level="body-sm">
              {minutesToTimeDuration(time)}
            </Typography>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
