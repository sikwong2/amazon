import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import CustomCard from './Card';
import { Typography } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { useRouter } from 'next/router';

export type Image = {
  image: string;
  id: string;
  description: string;
  title: string;
};

interface ImageCarouselProps extends BoxProps {
  images: Image[];
  height: number;
}

interface ItemProps extends BoxProps {
  item: Image;
  height: number;
}

export default function ImageCarousel({ images, height, ...rest }: ImageCarouselProps) {
  return (
    <Carousel animation="slide" height={height} indicators={false} navButtonsAlwaysVisible={true}>
      {images.map((item, i) => (
        <Item key={i} item={item} height={height} {...rest} />
      ))}
    </Carousel>
  );
}

function Item({ item, height, ...rest }: ItemProps) {
  const router = useRouter();
  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      maxHeight={height}
      sx={{ backgroundColor: 'E4E6E6', cursor: 'pointer' }}
      overflow="hidden"
      onClick={() => handleProductRedirect(item.id)}
      {...rest}
    >
      <img
        style={{
          maxWidth: '100%',
          maxHeight: '100%',
          width: 'auto',
          height: 'auto',
          objectFit: 'cover',
        }}
        alt={item.description}
        src={item.image}
      />
    </Box>
  );
}
