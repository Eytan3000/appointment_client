import * as React from 'react';
import Alert from '@mui/joy/Alert';
import AspectRatio from '@mui/joy/AspectRatio';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';
import LinearProgress from '@mui/joy/LinearProgress';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Check from '@mui/icons-material/Check';
import Close from '@mui/icons-material/Close';
import Warning from '@mui/icons-material/Warning';
import { useNavigate } from 'react-router-dom';

export default function ErrorAlert({
  errorMsg = 'An error has occurred. Please try again later.',
}) {
  const navigate = useNavigate();
  return (
    <div
      style={{ display: 'flex', justifyContent: 'center', marginTop: '40vh' }}>
      <Alert
        variant="soft"
        color="danger"
        invertedColors
        sx={{ alignItems: 'flex-start', gap: '1rem', width: 300 }}>
        <Box sx={{ flex: 1 }}>
          <Typography level="title-md">Something went wrong</Typography>
          <Typography level="body-md">{errorMsg}</Typography>
          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
            }}>
            <Button onClick={() => navigate(-1)} variant="outlined" size="sm">
              Go Back
            </Button>
          </Box>
        </Box>
      </Alert>
    </div>
  );
}
