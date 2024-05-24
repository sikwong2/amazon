import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';
import CustomCard from './Card';
import {Typography} from '@mui/material';

export type Image = {
  image: string,
  description: string,
  title: string
}

type ImageCarouselProps = {
  images: Image[],
  height: number
}

export type ItemProps = {
  key: number,
  item: Image,
  height: number
}

export default function ImageCarousel({images, height}: ImageCarouselProps) {
  return (
    <Carousel
        animation='slide'
        height={height}
        indicators={false}
        navButtonsAlwaysVisible={true}
    >
        {
          images.map( (item, i) => (
              <Item key={i} item={item} height={height}/> 
            )
          )
        }
    </Carousel>
  )
}

function Item(props: ItemProps) {
    console.log('item')
    return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxHeight={props.height}
          sx={{backgroundColor: 'E4E6E6'}}
          overflow="hidden"
        >
          <img 
            style={{ maxWidth: '100%', height: 'auto', objectFit: 'cover' }} 
            alt={props.item.description} 
            src={props.item.image}
          />
        </Box>
    )
}