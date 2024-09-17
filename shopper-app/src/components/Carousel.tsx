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
  id?: string;
  description?: string;
  title?: string;
};

interface ImageCarouselProps extends BoxProps {
  images: Image[];
  height: number;
  mobile: boolean;
}

interface ItemProps extends BoxProps {
  item: Image;
  mobile: boolean;
}

export default function ImageCarousel({ images, height, mobile, ...rest }: ImageCarouselProps) {
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
      navButtonsWrapperProps={mobile ? {
          style: {
            bottom: 'unset',
            top: '-20%'
          }
        }
         : {   // Move the buttons to the bottom. Unsetting top here to override default style.
        style: {
            bottom: 'unset',
            top: '15%'
        }
      }} 
      fullHeightHover={mobile ? true : false}
      animation="slide"
      indicators={false}
      height={(height > 479 && mobile) ? 479 : height}
      navButtonsAlwaysVisible={mobile ? false : true}>
      {images.map((item, i) => (
        <Item key={i} item={item} mobile={mobile} {...rest} />
      ))}
    </Carousel>
  );
}

function Item({ item, mobile, ...rest }: ItemProps) {
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
      onClick={() => item.id ? handleProductRedirect(item.id) : () => {}}
      {...rest}
    >
      <img
        style={mobile ? {
          width: '100%',
          height: '100%',
          objectFit: 'fill'
        } : 
        {
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        } 
      }
        alt={item.description || "image"}
        src={item.image || "Image Title"}
      />
    </Box>
  );
}
