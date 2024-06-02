import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import { BoxProps } from '@mui/material/Box';
import Image from 'next/image';
import CustomCard from './Card';
import { Typography } from '@mui/material';

// Carousel taken from https://www.npmjs.com/package/react-multi-carousel
// ** Note: this is different than the Carousel component for ImageCarousel

export type Image = {
  image: string;
  id: string;
  description: string;
  title: string;
};

interface MultiImageCarouselProps extends BoxProps {
  images: Image[];
  title: string,
}

interface ItemProps extends BoxProps {
  item: Image;
}



export default function MultiImageCarousel({ images, height, title, ...rest }: MultiImageCarouselProps) {
  return (
    <CustomCard sx={{bgcolor: '#FFFFFF', padding: '10px 20px', mb: 1}}>
      <Typography sx={{mt: '10px', mb: '5px'}} variant='h6'>
        {title}
      </Typography>
      <Carousel
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className=""
        containerClass="container"
        dotListClass=""
        draggable
        focusOnSelect={false}
        infinite={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        pauseOnHover
        renderArrowsWhenDisabled={false}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: 8,
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 2,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        rewind={false}
        rewindWithAnimation={false}
        rtl={false}
        shouldResetAutoplay
        showDots={false}
        sliderClass=""
        slidesToSlide={2}
        swipeable
      >
        {images.map((item, i) => (
          <Item key={i} item={item} height={height} {...rest} />
        ))}
      </Carousel>
    </CustomCard>
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
      height={height}
      maxHeight={height}
      sx={{ backgroundColor: '#FFFFFF', cursor: 'pointer', m: '0 0 14px'}}
      overflow="hidden"
      onClick={() => handleProductRedirect(item.id)}
      {...rest}
    >
      <img
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain'
        }}
        alt={item.description}
        src={item.image}
      />
    </Box>
  );
}