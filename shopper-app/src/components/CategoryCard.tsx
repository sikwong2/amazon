import CustomCard from './Card';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { Grid } from '@mui/material';
import { useRouter } from 'next/router';

export type Image = {
  image: string;
  id: string;
  description: string;
  title: string;
};

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
      elevation={0}
      sx={{
        width: isSmallScreen ? '100%' : 'auto',
        height: 'auto',
        margin: 1,
        alignItems: 'center',
        maxHeight: '100%',
        maxWidth: isSmallScreen ? '100%' : '300px',
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
          m: 2,
        }}
        alignItems="start"
        justifyContent="center"
      >
        <Typography sx={{ gridColumn: 'span 2', mb: 0.1 }} align="left" variant="subtitle1">
          {title}
        </Typography>
        {images.slice(0, 4).map((image, key) => (
          <Box
            key={key + image.id}
            display="flex"
            flexDirection="column"
            alignItems= {isSmallScreen ? "center" : "start"}
            sx={{ height: 'auto', width: 'auto', maxHeight: '100%', maxWidth: '100%' }}
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
              onClick={() => handleProductRedirect(image.id)}
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
