import { Avatar, Sheet, Typography } from '@mui/joy';

export default function CustomerSheet({
  quote,
  name,
  company,
  avatar
}: {
  quote: string;
  name: string;
  company: string;
  avatar:string;
}) {
  return (
    <Sheet
      sx={{
        boxShadow: '0px 2px 16px rgba(0, 0, 0, 0.1)',
        padding: '1rem',
        borderRadius: '15px',
        // background:'#eff9ff'
      }}>
      <Typography  fontStyle="italic">{quote}</Typography>

      <div
        style={{
          display: 'flex',
          gap: '2rem',
          marginTop: '2rem',
        }}>
        <Avatar
          sx={{ marginTop: 'auto' }}
          alt="Remy Sharp"
          src={avatar}
        />
        <div>
          <Typography  style={{color:'#309fdf'}} level='title-lg'>{name}</Typography>
          <Typography style={{color:'grey'}} level="body-md">{company}</Typography>
        </div>
      </div>
    </Sheet>
  );
}
