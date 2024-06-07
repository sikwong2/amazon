import { render, screen } from '@testing-library/react';
import SignupPage from '@/pages/signup';
import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@/pages/signup';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

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

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(),
}));

describe('getServerSideProps(en)', () => {
  it('Return en locale', async () => {
    const locale = 'en';
    const expectedProps = {
      _nextI18Next: {
        initialLocale: locale,
        namespacesRequired: ['common'],
      },
    };

    (serverSideTranslations as jest.Mock).mockResolvedValue(expectedProps);

    const context = {
      locale,
    } as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(serverSideTranslations).toHaveBeenCalledWith(locale, ['common']);
    expect(result).toEqual({
      props: expectedProps,
    });
  });
  it('Renders', async () => {
    render(<SignupPage />);
    expect(screen.findByText('signup.email')).toBeDefined();
  });
});

describe('getServerSideProps(en)', () => {
  it('Return zh locale', async () => {
    const locale = 'zh';
    const expectedProps = {
      _nextI18Next: {
        initialLocale: locale,
        namespacesRequired: ['common'],
      },
    };

    (serverSideTranslations as jest.Mock).mockResolvedValue(expectedProps);

    const context = {
    } as GetServerSidePropsContext;

    const result = await getServerSideProps(context);

    expect(serverSideTranslations).toHaveBeenCalledWith('en', ['common']);
    expect(result).toEqual({
      props: expectedProps,
    });
  });
});
    