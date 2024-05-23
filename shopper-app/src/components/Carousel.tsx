import React from 'react';
import Carousel from 'react-material-ui-carousel'
import { Paper } from '@mui/material';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';

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
  item: Image
}

export default function ImageCarousel({images, height}: ImageCarouselProps) {
  return (
    <Carousel
        animation='slide'
        height={height}
    >
        {
          images.map( (item, i) => (
              <Item key={i} item={item} /> 
            )
          )
        }
    </Carousel>
  )
}

function Item(props: ItemProps) {
    return (
        <Paper>
            <h2>{props.item.title}</h2>
            <p>{props.item.description}</p>
            <Box component="img" alt={props.item.description} src={props.item.image}/>
        </Paper>
    )
}