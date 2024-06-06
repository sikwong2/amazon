import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { LoginContext } from '@/context/Login';
import { PageContext } from '@/context/Page';


import { Checkout } from '@/views/Checkout';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

const handlers = [
  graphql.query('getMemberInfo', ({ query, variables }) => {
    console.log('hi');
    console.log(query);
    console.log(variables);
    return HttpResponse.json({
      data: {
        getMemberInfo: {
          address: 'test address',
          name: 'test name'
        }
      }
    })
  }),
];

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Get Checkout Title', () => {
  it('Renders Checkout page', async () => {
    render(
    <LoginContext>
      <PageContext>
        <Checkout /> 
      </PageContext>
    </LoginContext>
    );
    await screen.findByText(/checkout/i);
  });
});
