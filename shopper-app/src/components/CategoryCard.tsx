import CustomCard from './Card';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';
import type { Image } from './Carousel';

export interface CategoryCardProps {
  images: Image[];
  title: string;
}

export default function CategoryCard({ images, title }: CategoryCardProps) {
  const router = useRouter();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <CustomCard
      type='pointy'
      elevation={0}
      sx={{
        width: 'auto',
        height: 'auto',
        margin: 2,
        alignItems: 'center',
        maxHeight: '100%',
        maxWidth: '400px',
        justifyContent: 'center',
        display: 'flex',
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: 'grid',
          columnGap: 0.5,
          rowGap: 0.5,
          gridTemplateColumns: 'repeat(2, 1fr)',
          flexGrow: 1,
          m: '20px',
        }}
        alignItems="start"
        justifyContent="center"
      >
        <Typography textTransform='capitalize' sx={{ gridColumn: 'span 2', mb: 0.1, fontWeight: 'bold', fontSize: '21px', marginBottom: '10px' }} align="left" >
          {title}
        </Typography>
        {images.slice(0, 4).map((image, key) => (
          <Box
            key={title + key + image.id}
            display="flex"
            flexDirection="column"
            alignItems="center"
            sx={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%', marginBottom: '20px' }}
          >
            <Box
              sx={{
                maxWidth: '100%',
                width: 'auto',
                height: '100px',
                minHeight: '50px',
                objectFit: 'contain',
                cursor: 'pointer',
              }}
              component="img"
              src={image.image}
              onClick={() => image.id ? handleProductRedirect(image.id) : () => {}}
            />
            <Typography
              align="left"
              variant="caption" 
              sx={{
                wordWrap: 'break-word',
                display: '-webkit-box',
                overflow: 'hidden',
                WebkitBoxOrient: 'vertical',
                WebkitLineClamp: 1,
              }}
            >
              {image.description}
            </Typography>
          </Box>
        ))}
      </Box>
    </CustomCard>
  );
}
