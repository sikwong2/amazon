import { render } from '@testing-library/react';
import SearchResultsCard from '@/components/SearchResultsCard';

const images = [ 
  {
    'image': "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", 
    'id': 'image1',
    'price': 123,
    'title': 'title1'
  },
  {
    'image': "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg",
    'id': 'image2',
    'price': 345,
    'title': 'title2'
  }
]

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

it('Renders', async () => {
  render(
    <SearchResultsCard images={images} title='title' />
  );
});
