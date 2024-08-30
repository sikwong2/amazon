import React from 'react';
import { Fragment } from 'react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { PageContext } from '@/context/Page';
import { Cart } from '@/views/Cart';
import { Checkout } from '@/views/Checkout';
import { OrderHistory } from '@/views/OrderHistory';
import { Home } from '@/views/Home';

// this must be in page-level components (not in components in /view)
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

// use Link to navigate to another page
export default function Index() {
  const pageContext = React.useContext(PageContext);

  return (
    <Fragment>
      {pageContext.page === 'home' && <Home />}
      {pageContext.page === 'cart' && <Cart />}
      {pageContext.page === 'checkout' && <Checkout />}
      {pageContext.page === 'orderHistory' && <OrderHistory />}
    </Fragment>
  );
}
