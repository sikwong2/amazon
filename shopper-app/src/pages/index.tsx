import React, { useState } from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import TopBar from '@/components/TopBar';
import LanguageButton from '@/components/Language';
import CustomButton from '@/components/Button';
import { PageContext } from '@/context/Page';
import { Cart } from '@/views/Cart';
import { Checkout } from '@/views/Checkout';
import { OrderHistory } from '@/views/OrderHistory';
import { Home } from '@/views/Home';
import Footer from '@/components/Footer';

// this must be in page-level components (not in components in /view)
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

// use Link to navigate to another page
export default function Index() {
  const title = 'CSE187 Shopper App';
  const { t } = useTranslation('common');
  const pageContext = React.useContext(PageContext);

  const home = (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar />
      <div>
        {t('go-to-login')} <Link href="/login"> {t('here')} </Link>
      </div>
      <div>
        {t('go-to-signup')} <Link href="/signup"> {t('here')} </Link>
      </div>
      <Home />
      <Footer />
    </>
  );

  return (
    <Fragment>
      {/* <p>
        {pageContext.page}
      </p> */}
      {pageContext.page === 'home' && home}
      {pageContext.page === 'cart' && <Cart />}
      {pageContext.page === 'checkout' && <Checkout />}
      {pageContext.page === 'orderHistory' && <OrderHistory />}
    </Fragment>
  );
}
