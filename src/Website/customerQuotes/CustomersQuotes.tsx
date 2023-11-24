import { Box, Typography } from '@mui/joy';
import CustomerSheet from './CustomerSheet';
import { quotes } from './quotesArray';
import Masonry from '@mui/lab/Masonry';
import { useEffect, useState } from 'react';

export default function CustomersQuotes() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Set initial mobile state

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <>
      <Box
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        gap="2rem"
        mt={'4rem'}>
        <Typography mt={'2rem'} level="h1" textAlign={'center'}>
          What out customers say
        </Typography>

        <Box sx={{ minHeight: 393 }}>
          {isMobile ? (
            <Masonry columns={1} spacing={2}>
              {quotes.slice(0,5).map((quote, index) => (
                <CustomerSheet
                  key={index}
                  quote={quote.quote}
                  name={quote.name}
                  company={quote.conpany}
                  avatar={quote.avatar}
                />
              ))}
            </Masonry>
          ) : (
            <Masonry columns={4} spacing={2}>
              {quotes.map((quote, index) => (
                <CustomerSheet
                  key={index}
                  quote={quote.quote}
                  name={quote.name}
                  company={quote.conpany}
                  avatar={quote.avatar}
                />
              ))}
            </Masonry>
          )}
        </Box>
      </Box>
    </>
  );
}
