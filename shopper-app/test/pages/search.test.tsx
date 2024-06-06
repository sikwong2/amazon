import { render, screen } from '@testing-library/react';
import SearchPage from '@/pages/search';
import { Cart } from '@/views/Cart';
import userEvent from '@testing-library/user-event';
import { SearchProvider } from '@/context/SearchContext';
import { fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import mockRouter from 'next-router-mock';

// https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

const product = {
  id: '20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8',
  name: 'Shrek 2 DVD',
  price: 19.99,
  stock: 1, 
  rating: 4.8,
  image: ['https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/71GIXaa-bhL._SL1050_.jpg'],
  description: ['Lovable ogre Shrek has his marriage to a princess come under fire from her parents and a meddling fairy godmother in this sequel.'],
  category: ['dvd', 'movie', 'shrek']
}

const productLongName =   {
  id: '20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8',
  name: 'Shrek 2 DVD But with a lot more products to choose from.',
  price: 19.99,
  stock: 1, 
  rating: 4.8,
  image: ['https://m.media-amazon.com/images/I/71HQiOZsZ6L._AC_UF1000,1000_QL80_.jpg', 'https://m.media-amazon.com/images/I/71GIXaa-bhL._SL1050_.jpg'],
  description: ['Lovable ogre Shrek has his marriage to a princess come under fire from her parents and a meddling fairy godmother in this sequel.'],
  category: ['dvd', 'movie', 'shrek']
}

it('Renders', async () => {
  render(<SearchPage products={[product]} />);
  expect(screen.findByText('search.results-for')).toBeDefined();
});

it('Search Bar Usage', async () => {
  render(<SearchPage products={[product]} />);
  const searchBar = await screen.findByLabelText('search');
  userEvent.type(searchBar, 'Apple');
  fireEvent.click(searchBar);
  expect(screen.findByText('Apple')).toBeDefined();
});

it('Add to Cart', async () => {
  render(<SearchPage products={[product]} />);
  const addCart = await screen.findByLabelText('add-to-cart');
  fireEvent.click(addCart);
  render(
    <SearchProvider>
      <Cart />
    </SearchProvider>
  );
  expect(screen.findByText('Shopping Cart')).toBeDefined();
});

it('Product Redirect', async () => {
  render(<SearchPage products={[productLongName]} />);
  const selectProduct = await screen.findByLabelText('delivery-date');
  fireEvent.click(selectProduct);
});