import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { Home } from '@/views/Home';

let apiCalled = false;

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

const handlers = [
  graphql.query('getByCategory', ({ query, variables }) => {
    if (apiCalled == false) {
      return HttpResponse.json({
        errors: [{ message: 'Some Error' }],
      });
    } else {
      return HttpResponse.json({
        data: {
          getByCategory: [
            {
              id: '6a2212e5-af0b-4472-a724-537bdc6c571c',
              name: 'Shrek DVD',
              image: ['shrek1.jpg'],
              price: 1999,
              stock: 1,
              rating: 0,
              category: ['Movies', 'DVDs'],
            },
            {
              id: '20c6f7dd-e9c0-45a2-bef8-5f42597e4ca8',
              name: 'Shrek 2 DVD',
              image: ['shrek2.jpg'],
              price: 1999,
              stock: 1,
              rating: 0,
              category: ['Movies', 'DVDs'],
            },
            {
              id: 'fb31be70-f4f3-4ccc-b483-14e831dc61d1',
              name: 'Shrek 3 DVD',
              image: ['shrek3.jpg'],
              price: 1999,
              stock: 1,
              rating: 0,
              category: ['Movies', 'DVDs'],
            },
            {
              id: 'e64edcc9-3262-49b8-bda4-066c34089e05',
              name: 'Shrek Forever After DVD',
              image: ['shrek4.jpg'],
              price: 1999,
              stock: 1,
              rating: 0,
              category: ['Movies', 'DVDs'],
            },
          ],
        },
      });
    }
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders', async () => {
  apiCalled = true;
  render(<Home />);
});

it('Renders with error', async () => {
  apiCalled = false;
  render(<Home />);
});
