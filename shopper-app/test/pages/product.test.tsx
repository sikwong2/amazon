import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@/pages/product/[productId]';
import Product from '@/pages/product/[productId]';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { render, screen } from '@testing-library/react';

import { fireEvent } from '@testing-library/react';
import { SearchProvider } from '@/context/SearchContext';
import { PageProvider } from '@/context/Page';
import { LoginContext } from '../../src/context/Login';


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

const pegasusInStock: Product = {
  "name": "Nike Men'\''s Air Zoom Pegasus 38 Running Shoe", 
  "price": 89.95, 
  "stock": 20, 
  "rating": 4.4, 
  "image": [ "https://a.media-amazon.com/images/I/416fdJd0LBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/41AZ1yXc7cL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51YxNfaeFML._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51yV-FSaDxL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51reoAsu51L._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/51OHTX2eMYL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61y-6VpkJBL._AC_SL1000_.jpg", "https://a.media-amazon.com/images/I/61BKQwvRARL._AC_SL1000_.jpg" ], 
  "category": [ "Nike Pegasus 38", "Nike", "air zoom pegasus", "shoes", "men'\''s shoes", "clothing", "clothes", "sale" ], 
  "description": [ "Upper material: Fabric", "Great quality", "Effectiveness in activities","Comfort and ease" ]
}

// Mock the fetch function
global.fetch = jest.fn();

describe('getServerSideProps(en)', () => {
  const mockContext = {
    query: { productId: '123' },
    locale: 'en',
  } as unknown as GetServerSidePropsContext;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('Renders low stock product', async () => {
    render(
      <SearchProvider>
        <PageProvider>
          <Product product={pegasus} />
        </PageProvider>
      </SearchProvider>
    );

    expect(screen.findByText(pegasus.name)).toBeDefined();
  });

  it('Renders in stock product', async () => {
    render(
      <SearchProvider>
        <PageProvider>
          <Product product={pegasusInStock} />
        </PageProvider>
      </SearchProvider>
    );
    expect(screen.findByText(pegasus.name)).toBeDefined();
  });
  
  it('Click add to cart', async () => {
    render(
      <SearchProvider>
        <PageProvider>
          <Product product={pegasus} />
        </PageProvider>
      </SearchProvider>
    );
    expect(screen.findByText(pegasus.name)).toBeDefined();
    fireEvent.click(screen.getByLabelText('add-to-cart'));
  });
  
  it('Click buy now (logged out)', async () => {
    render(
      <SearchProvider>
        <PageProvider>
          <Product product={pegasus} />
        </PageProvider>
      </SearchProvider>
    );
    expect(screen.findByText(pegasus.name)).toBeDefined();
    fireEvent.click(screen.getByLabelText('buy-now'));
  });
  
  it('Click buy now (logged in)', async () => {
    let accessToken = 'abcd';
    const setAccessToken = (newToken: string) => {
      accessToken = newToken;
    };
    const userName = '';
    const setUserName = () => {};
    const role = '';
    const setRole = (newrole: string) => {}
    let id = '';
    const setId = (newid: string) => {
      id = newid;
    };
    render(
      <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
        <SearchProvider>
          <PageProvider>
            <Product product={pegasus} />
          </PageProvider>
        </SearchProvider>
      </LoginContext.Provider>,
  
    );
    expect(screen.findByText(pegasus.name)).toBeDefined();
    fireEvent.click(screen.getByLabelText('buy-now'));
  });

  it('Fetch product data', async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: { getByProductId: pegasus },
      }),
    });

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        product: pegasus,
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

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        product: {},
        ...(await serverSideTranslations('en', ['common'])),
      },
    });
  });

  it('Empty product data', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: { getByProductId: null },
      }),
    });

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        product: {},
        ...(await serverSideTranslations('en', ['common'])),
      },
    });
  });
});


describe('getServerSideProps(zh)', () => {
  const mockContext = {
    query: { productId: '123' },
  } as unknown as GetServerSidePropsContext;

  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('Fetch product data', async () => {

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({
        data: { getByProductId: pegasus },
      }),
    });

    const result = await getServerSideProps(mockContext);

    expect(result).toEqual({
      props: {
        product: pegasus,
        ...(await serverSideTranslations('en', ['common'])),
      },
    });
  });

});