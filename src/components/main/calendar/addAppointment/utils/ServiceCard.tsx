import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Typography from '@mui/joy/Typography';
import { minutesToTimeDuration } from '../../../../../utils/helperFunctions';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface Props {
  keyNum: number;
  serviceTitle: string;
  description: string;
  time: string;
  price: string;
}

export default function ServiceCard({
  keyNum,
  serviceTitle,
  description,
  time,
  price,
}: Props) {
  return (
    <Card
      key={keyNum}
      orientation="horizontal"
      variant="outlined"
      sx={{ width: 260, marginInline: 'auto', mt: 2 }}>
      <CardOverflow>
        <AspectRatio ratio="1" sx={{ width: 90 }}>
          <img
            src="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90"
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
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
          <Typography level="body-sm">{price} ₪</Typography>
          <Typography level="body-sm">
            {' '}
            <div
              style={{
                display: 'flex',
                gap: '6px',
              }}>
              <AccessTimeIcon sx={{ fontSize: '1rem', marginTop: '2px' }} />
              {minutesToTimeDuration(time)}
            </div>
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
