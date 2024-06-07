import { render } from '@testing-library/react';
import ImageCarousel from '@/components/Carousel';

const images = [ 
  {
    'image': "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", 
    'id': 'image1',
    'description': 'description1',
    'title': 'title1'
  },
  {
    'image': "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg",
    'id': 'image2',
    'description': 'description2',
    'title': 'title2'
  }
]

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <ImageCarousel images={images} height={50} />
  );
});
