import React from 'react';
import Head from 'next/head';
import { Fragment } from 'react';
import { App } from '../views/App';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import LanguageButton from '@/components/Language';
import Footer from '@/components/Footer';

// this must be in page-level components (not in components in /view)
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', ['common'])),
  },
});

export default function Index() {
  const title = 'Ucsc-Amazon Vendor';
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <App />
      <Footer />
    </Fragment>
  );
}
