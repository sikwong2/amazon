
import { render, screen } from '@testing-library/react'
import SignupPage from '@/pages/signup';
import { useRouter } from 'next/router';
import {fireEvent } from '@testing-library/react';
import mockRouter from 'next-router-mock';

// https://www.npmjs.com/package/next-router-mock
jest.mock('next/router', () => jest.requireActual('next-router-mock'))

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

it('Renders', async () => {
  render(<SignupPage />)
  expect(screen.findByText('signup.email')).toBeDefined()
});