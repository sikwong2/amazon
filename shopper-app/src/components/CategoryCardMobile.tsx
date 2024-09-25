import CustomCard from './Card';
import { Box, Stack, useMediaQuery, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import type { Image } from './Carousel';

export interface CategoryCardMobileProps {
  image: Image;
  title: string;
}

export default function CategoryCardMobile({ image, title }: CategoryCardMobileProps) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`);
  };

  const screenWidth = screen.width;

  return (
    <CustomCard
      type='rounded'
      elevation={0}
      sx={{
        width: '100%',
        height: '180px',
        margin: 0.75,
        alignItems: 'top',
        maxHeight: '50vw',
        maxWidth: screen.width < 500 ? screen.width / 3 - 12 : 140,
        justifyContent: 'center',
        display: 'flex',
        padding: 0,
        overflow: 'clip',
        boxSizing: 'border-box',
      }}
    >
      <Stack width={screen.width < 500 ? screen.width / 3 - 16 : 128} height='176px' direction='column' display='flex' alignItems='center' margin='0.4rem' >
        <Box  width='100%' display='flex'>
          <Typography sx={{
                wordWrap: 'break-word',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 2,
              }}>
            {title}
          </Typography>
        </Box>
        <Box display='flex' flexDirection='column' flexGrow={1} width='100%' alignItems='center' height='auto'  mt='0.4rem'>
          <Box
            sx={{
              maxWidth: '100%',
              width: '100%',
              height: '100%',
              maxHeight: screenWidth < 500 ? screen.width / 3 - 36 : 120,
              objectFit: 'contain',
              cursor: 'pointer'
            }}
            mb='0.4rem'
            component="img"
            src={image ? image.image : ''}
            onClick={() => image.id ? handleProductRedirect(image.id) : () => {}}
          />
        </Box>
      </Stack>
    </CustomCard>
  );
}
