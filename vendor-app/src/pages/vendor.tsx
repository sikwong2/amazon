import React from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import { App } from '../views/App'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next';

const LanguageSwitcherButton = () => {
  const router = useRouter()
  const changeTo = router.locale === 'en' ? 'zh' : 'en'
  const { t } = useTranslation('common')
  return (
    <Link href="/vendor" locale={changeTo}>
      <button>{t('change-locale', { changeTo })}</button>
    </Link>
  )
}

// this must be in page-level components (not in components in /view)
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

export default function Index() {
  const title = 'CSE187 Vendor App'
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSwitcherButton />
      <App/>
    </Fragment>
  )
}