import { render } from '@testing-library/react';

import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { LoginContext, LoginProvider } from '../../src/context/Login';
import { SignUp } from '@/views/Signup';

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
  graphql.mutation('createaccount', ({ query, variables }) => {
    // console.log(query);
    if (query.includes('anna@books.com')) {
      return HttpResponse.json({
        errors: [
          {
            message: 'Some Error',
          },
        ],
      });
    }
    return HttpResponse.json({
      data: {
        createaccount: {
          id: 'Some Id',
          name: 'Some Name',
          email: 'someemail@amazon.com',
          role: 'shopper',
        },
      },
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders Signup page', async () => {
  render(<SignUp />);
  expect(screen.queryByText('signup.name')).toBeDefined();
  fireEvent.click(screen.getByText('signup.sign-in'));
});

it('Signs Sally Up', async () => {
  render(<SignUp />);
  const name = screen.getByLabelText('signup.name');
  await userEvent.type(name, 'sally shopper');
  const email = screen.getByLabelText('signup.email');
  await userEvent.type(email, 'sally@amazon.com');
  const passwd = screen.getByLabelText('signup.password');
  await userEvent.type(passwd, 'sallyshopper');
  const retype = screen.getByLabelText('signup.re-enter');
  await userEvent.type(retype, 'sallyshopper');
  fireEvent.click(screen.getByText('signup.continue'));
});

it('Retype password not match', async () => {
  render(<SignUp />);
  const name = screen.getByLabelText('signup.name');
  await userEvent.type(name, 'sally shopper');
  const email = screen.getByLabelText('signup.email');
  await userEvent.type(email, 'sally@amazon.com');
  const passwd = screen.getByLabelText('signup.password');
  await userEvent.type(passwd, 'sallyshopper');
  const retype = screen.getByLabelText('signup.re-enter');
  await userEvent.type(retype, 'sleisgrls');
  fireEvent.click(screen.getByText('signup.continue'));
});

it('Fields not filled', async () => {
  const signup = true;
  const setSignUp = () => {};
  render(<SignUp />);

  const email = screen.getByLabelText('signup.email');
  await userEvent.type(email, 'sally@amazon.com');
  const passwd = screen.getByLabelText('signup.password');
  await userEvent.type(passwd, 'sallyshopper');
  const retype = screen.getByLabelText('signup.re-enter');
  await userEvent.type(retype, 'sleisgrls');
  fireEvent.click(screen.getByText('signup.continue'));
});

it('Shows unexpected error', async () => {
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  const signup = true;
  const setSignUp = () => {};
  render(<SignUp />);
  const name = screen.getByLabelText('signup.name');
  await userEvent.type(name, 'sally shopper');
  const email = screen.getByLabelText('signup.email');
  await userEvent.type(email, 'anna@books.com');
  const passwd = screen.getByLabelText('signup.password');
  await userEvent.type(passwd, 'sallyshopper');
  const retype = screen.getByLabelText('signup.re-enter');
  await userEvent.type(retype, 'sallyshopper');
  fireEvent.click(screen.getByText('signup.continue'));
  await waitFor(() => {
    expect(alerted).toBeTruthy();
  });
});
