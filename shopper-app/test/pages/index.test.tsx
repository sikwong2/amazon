import { GetServerSidePropsContext } from 'next';
import { getServerSideProps } from '@/pages';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { render, screen } from '@testing-library/react';
import Index from '@/pages';
import { SearchProvider } from '@/context/Search';
import { PageProvider, PageContext } from '@/context/Page';
import { LoginContext, LoginProvider } from '../../src/context/Login';

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
    render(
      <SearchProvider>
        <PageProvider>
          <Index />
        </PageProvider>
      </SearchProvider>
    );
    expect(screen.findByText('go-to-login')).toBeDefined();
    expect(screen.findByText('change-language')).toBeDefined();
  });
  
  it('Renders Cart', async () => {
    const page = 'cart'
    const setPage = (page: string) => {}
    let accessToken = '123';
    const setAccessToken = (newToken: string) => {
      accessToken = newToken;
    };
    const userName = '123';
    const setUserName = () => {};
    const role = 'member';
    const setRole = (newrole: string) => {}
    let id = '123';
    const setId = (newid: string) => {
      id = newid;
    };
    render(
      <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
        <SearchProvider>
          <PageContext.Provider value={{page, setPage}}>
            <Index />
          </PageContext.Provider>
        </SearchProvider>
      </LoginContext.Provider>
    );
    expect(screen.findByText('go-to-login')).toBeDefined();
    expect(screen.findByText('change-language')).toBeDefined();
  });
  
  it('Renders Checkout', async () => {
    const page = 'checkout'
    const setPage = (page: string) => {}
    let accessToken = '123';
    const setAccessToken = (newToken: string) => {
      accessToken = newToken;
    };
    const userName = '123';
    const setUserName = () => {};
    const role = '123';
    const setRole = (newrole: string) => {}
    let id = '123';
    const setId = (newid: string) => {
      id = newid;
    };
    render(
      <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
        <SearchProvider>
          <PageContext.Provider value={{page, setPage}}>
            <Index />
          </PageContext.Provider>
        </SearchProvider>
      </LoginContext.Provider>
    );
    expect(screen.findByText('go-to-login')).toBeDefined();
    expect(screen.findByText('change-language')).toBeDefined();
  });
  
  it('Renders OrderHistory', async () => {
    const page = 'orderHistory'
    const setPage = (page: string) => {}
    let accessToken = '123';
    const setAccessToken = (newToken: string) => {
      accessToken = newToken;
    };
    const userName = '123';
    const setUserName = () => {};
    const role = '123';
    const setRole = (newrole: string) => {}
    let id = '123';
    const setId = (newid: string) => {
      id = newid;
    };
    render(
      <LoginContext.Provider value={{userName, setUserName, accessToken, setAccessToken, role, setRole, id, setId }}>
        <SearchProvider>
          <PageContext.Provider value={{page, setPage}}>
            <Index />
          </PageContext.Provider>
        </SearchProvider>
      </LoginContext.Provider>
    );
    expect(screen.findByText('go-to-login')).toBeDefined();
    expect(screen.findByText('change-language')).toBeDefined();
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

  it('Renders', async () => {
    render(
      <SearchProvider>
        <PageProvider>
          <Index />
        </PageProvider>
      </SearchProvider>
    );
    expect(screen.findByText('go-to-login')).toBeDefined();
    expect(screen.findByText('change-language')).toBeDefined();
  });
});