import { graphql, HttpResponse } from 'msw'
import { fireEvent, render, screen } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { LoginContext } from '@/context/Login';
import { RedirectNonShopper } from '@/views/RedirectNonShopper';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

jest.mock('react-i18next', () => ({
  // this mock makes sure any components using the translate hook can use it without a warning being shown
  useTranslation: () => {
    return {
      t: (str: string) => str,
      i18n: {
        changeLanguage: () => new Promise(() => { }),
      },
    };
  },
}));

test('Renders', async () => {
  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'vendor';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };

  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <RedirectNonShopper />
    </LoginContext.Provider>
  )
  fireEvent.click(screen.getByLabelText('vendor-app-button'));
})

test('Admin', async () => {
  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'admin';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };

  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <RedirectNonShopper />
    </LoginContext.Provider>
  )
  fireEvent.click(screen.getByLabelText('vendor-app-button'));
})

test('error', async () => {
  let accessToken = '12345';
  const setAccessToken = () => { };
  const userName = 'molly';
  const setUserName = () => { };
  const role = 'error';
  const setRole = () => { };
  const id = 'string';
  const setId = () => { };

  render(
    <LoginContext.Provider value={{ userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
      <RedirectNonShopper />
    </LoginContext.Provider>
  )
  fireEvent.click(screen.getByLabelText('vendor-app-button'));
})