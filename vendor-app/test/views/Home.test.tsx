import { render } from '@testing-library/react';

import { screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { LoginContext, LoginProvider } from '../../src/context/Login';
import { SignupContext, SignupProvider } from '@/context/Signup';
import { Login } from '../../src/views/Login';

import { Home } from '@/views/Home';

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

let apiCalled = true;

const handlers = [
  graphql.query('login', ({ query, variables }) => {
    apiCalled = true;
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
        login: {
          id: 'Some Id',
          name: 'Some Name',
          accessToken: 'Some JWT',
        },
      },
    });
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders Login page', async () => {
  const accessToken = '';
  const setAccessToken = () => {};
  const userName = '';
  const setUserName = () => {};
  const signup = false;
  const setSignUp = () => {};
  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken }}>
      <SignupContext.Provider value={{ signup, setSignUp }}>
        <Home />
      </SignupContext.Provider>
    </LoginContext.Provider>,
  );
  expect(screen.queryAllByText('login.signin').length).toEqual(2);
});

it('Renders Signed with accessToken (already logged in)', async () => {
  const accessToken = 'some old token';
  const setAccessToken = () => {};
  const userName = '';
  const setUserName = () => {};
  const signup = false;
  const setSignUp = () => {};
  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken }}>
      <SignupContext.Provider value={{ signup, setSignUp }}>
        <Home />
      </SignupContext.Provider>
    </LoginContext.Provider>,
  );
  expect(screen.queryByText('login.signin')).toBeFalsy();
});

it('Renders Sign Up (already logged in)', async () => {
  const accessToken = 'some old token';
  const setAccessToken = () => {};
  const userName = '';
  const setUserName = () => {};
  const signup = true;
  const setSignUp = () => {};
  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken }}>
      <SignupContext.Provider value={{ signup, setSignUp }}>
        <Home />
      </SignupContext.Provider>
    </LoginContext.Provider>,
  );
  expect(screen.queryByText('signup.name')).toBeDefined();
});
