import React from 'react';
import Carousel from 'react-material-ui-carousel';
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import CustomCard from './Card';
import { Typography } from '@mui/material';
import { BoxProps } from '@mui/material/Box';
import { useRouter } from 'next/router';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

// https://www.npmjs.com/package/react-material-ui-carousel

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
}

export default function ImageCarousel({ images, height, ...rest }: ImageCarouselProps) {
  return (
    <Carousel
      NextIcon={<ArrowForwardIosIcon fontSize='large'/>}
      PrevIcon={<ArrowBackIosIcon fontSize='large'/>}
      navButtonsProps={{          // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
        style: {
            backgroundColor: 'transparent',
            borderRadius: 0
        }
      }}
      navButtonsWrapperProps={{   // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
            bottom: 'unset',
            top: '15%'
        }
      }} 
      fullHeightHover={false}
      animation="slide"
      indicators={false}
      height={height}
      navButtonsAlwaysVisible={true}>
      {images.map((item, i) => (
        <Item key={i} item={item} {...rest} />
      ))}
    </Carousel>
  );
}

function Item({ item, ...rest }: ItemProps) {
  const router = useRouter();
  const handleProductRedirect = (id: string) => {
    router.push(`/product/${id}`);
  };

  return (
    <Box
      position='relative'
      height="100%"
      width="100%"
      sx={{ backgroundColor: 'E4E6E6', cursor: 'pointer' }}
      onClick={() => handleProductRedirect(item.id)}
      {...rest}
    >
      <img
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
        alt={item.description}
        src={item.image}
      />
    </Box>
  );
}
