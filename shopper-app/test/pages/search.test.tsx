import { render, screen } from '@testing-library/react';
import SearchPage from '@/pages/search';
import { Cart } from '@/views/Cart';
import userEvent from '@testing-library/user-event';
import { SearchProvider } from '@/context/SearchContext';
import { fireEvent } from '@testing-library/react';
import { Home } from '@/views/Home';
import { getServerSideProps } from '@/pages/search';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
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

const context = {
  query: { query: 'sale' },
  locale: 'en',
  resolvedUrl: '/search?query=sale',
  req: {},
  res: {}
}

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

it('Add to Cart', async () => {
  render(
    <SearchProvider>
      <Cart />
    </SearchProvider>
  );
  expect(screen.findByText('Shopping Cart')).toBeDefined();
});

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(),
}));

// describe('getServerSideProps(en)', () => {
//   it('Return en locale', async () => {
//     const locale = 'en';
//     const expectedProps = {
//       _nextI18Next: {
//         initialLocale: locale,
//         namespacesRequired: ['common'],
//       },
//     };

//     (serverSideTranslations as jest.Mock).mockResolvedValue(expectedProps);

//     const context = {
//       locale,
//     } as GetServerSidePropsContext;

//     const result = await getServerSideProps(context);

//     expect(serverSideTranslations).toHaveBeenCalledWith(locale, ['common']);
//     expect(result).toEqual({
//       props: expectedProps,
//     });
//   });
//   it('Renders', async () => {
//     render(<SearchPage products={[productLongName]} />);
//     const selectProduct = await screen.findByLabelText('delivery-date');
//   });
// });

// it('Searching', async () => {
//   render(
//     <SearchProvider>
//       <Home />
//     </SearchProvider>
//   );
//   const searchBar = await screen.findByLabelText('search');
//   userEvent.type(searchBar, 'sale');
//   const searchIcon = await screen.findByLabelText('search-icon');
//   fireEvent.click(searchIcon);
//   getServerSideProps(context);
// });

interface Product {
  name: string;
  price: number;
  stock: number;
  rating: number;
  image: string[];
  description: string[];
  category: string[];
}

const pegasus: Product = {
  "name": "Nike Men'\''s Air Zoom Pegasus 38 Running Shoe", 
  "price": 89.95, 
  "stock": 2, 
  "rating": 4.4, 
  "image": [ "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51YxNfaeFML._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51yV-FSaDxL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51reoAsu51L._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51OHTX2eMYL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61y-6VpkJBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61BKQwvRARL._AC_SL1000_.jpg" ], 
  "category": [ "Nike Pegasus 38", "Nike", "air zoom pegasus", "shoes", "men'\''s shoes", "clothing", "clothes", "sale" ], 
  "description": [ "Upper material: Fabric", "Great quality", "Effectiveness in activities","Comfort and ease" ]
}

global.fetch = jest.fn();

describe('getServerSideProps(en)', () => {
  const mockContext = {
    query: { query: 'sale' },
    locale: 'en',
  } as unknown as GetServerSidePropsContext;

  const mockContext2 = {
    query: { query: ['sale']},
    locale: '',
  } as unknown as GetServerSidePropsContext;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });
  

  it('Fetch product data', async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: { getByName: pegasus },
      }),
    });

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        products: pegasus,
        ...(await serverSideTranslations('en', ['common'])),
      },
    });
  });

  it('API errors', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        errors: ['Error retrieving product'],
      }),
    });

    const result = await getServerSideProps(mockContext2);

    expect(result).toEqual({
      props: {
        products: [],
        ...(await serverSideTranslations('en', ['common'])),
      },
    });
  });

  // it('Empty product data', async () => {
  //   (fetch as jest.Mock).mockResolvedValueOnce({
  //     json: jest.fn().mockResolvedValueOnce({
  //       data: { getByProductId: null },
  //     }),
  //   });

  //   const result = await getServerSideProps(mockContext);

  //   expect(result).toEqual({
  //     props: {
  //       product: {},
  //       ...(await serverSideTranslations('en', ['common'])),
  //     },
  //   });
  // });
});


// describe('getServerSideProps(zh)', () => {
//   const mockContext = {
//     query: { productId: '123' },
//   } as unknown as GetServerSidePropsContext;

//   beforeEach(() => {
//     (fetch as jest.Mock).mockClear();
//   });

//   it('Fetch product data', async () => {

//     (fetch as jest.Mock).mockResolvedValueOnce({
//       json: jest.fn().mockResolvedValueOnce({
//         data: { getByProductId: pegasus },
//       }),
//     });

//     const result = await getServerSideProps(mockContext);

//     expect(result).toEqual({
//       props: {
//         product: pegasus,
//         ...(await serverSideTranslations('en', ['common'])),
//       },
//     });
//   });