import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { graphql, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { LoginContext, LoginProvider } from '../../src/context/Login';
import { Login } from '../../src/views/Login';

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

it('Renders', async () => {
  render(
    <LoginProvider>
      <Login />
    </LoginProvider>,
  );
  fireEvent.click(screen.getByLabelText('login.create-account'));
});

it('Signs Molly In', async () => {
  let accessToken = '';
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
      <Login />
    </LoginContext.Provider>,
  );
  const email = screen.getByLabelText('login.email');
  await userEvent.type(email, 'molly@books.com');
  const passwd = screen.getByLabelText('login.password');
  await userEvent.type(passwd, 'mollymember');
  fireEvent.click(screen.getByRole('button', { name: 'sign in' }));
  await waitFor(() => {
    expect(accessToken).toBe('Some JWT');
  });
});

it('Signs Molly In with Default Context', async () => {
  apiCalled = false;
  render(<Login />);
  const email = screen.getByLabelText('login.email');
  await userEvent.type(email, 'molly@books.com');
  const passwd = screen.getByLabelText('login.password');
  await userEvent.type(passwd, 'mollymember');
  fireEvent.click(screen.getByRole('button', { name: 'sign in' }));
  await waitFor(() => {
    expect(apiCalled).toBe(true);
  });
});

it('Can Click SignIn Button', async () => {
  apiCalled = false;
  render(<Login />);
  fireEvent.click(screen.getByLabelText('login.create-account'));
});

it('Rejects Bad Credentials', async () => {
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  render(<Login />);
  const email = screen.getByLabelText('login.email');
  await userEvent.type(email, 'anna@books.com');
  const passwd = screen.getByLabelText('login.password');
  await userEvent.type(passwd, 'not-annas-password');
  fireEvent.click(screen.getByRole('button', { name: 'sign in' }));
  await waitFor(() => {
    expect(alerted).toBeTruthy();
  });
});

it('Does Not Render with accessToken (already logged in)', async () => {
  const accessToken = 'some old token';
  const setAccessToken = () => {};
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
      <Login />
    </LoginContext.Provider>,
  );
  expect(screen.queryAllByText('Login').length).toBe(0);
});

it('Alerts When No Server', async () => {
  server.close();
  let alerted = false;
  window.alert = () => {
    alerted = true;
  };
  render(<Login />);
  const email = screen.getByLabelText('login.email');
  await userEvent.type(email, 'anna@books.com');
  const passwd = screen.getByLabelText('login.password');
  await userEvent.type(passwd, 'not-annas-password');
  fireEvent.click(screen.getByRole('button', { name: 'sign in' }));
  await waitFor(() => {
    expect(alerted).toBeTruthy();
  });
});
