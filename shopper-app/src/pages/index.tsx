import React from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'

const LanguageSwitcherButton = () => {
  const router = useRouter()
  const changeTo = router.locale === 'en' ? 'zh' : 'en'
  const { t } = useTranslation('common')
  return (
    <Link href="/" locale={changeTo}>
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

// use Link to navigate to another page
export default function Index() {
  const title = 'CSE187 Shopper App'
  const { t } = useTranslation('common');

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LanguageSwitcherButton />
      <div>
        {t("go-to-login")} <Link href="/login"> {t("here")} </Link>
      </div>
      <div>
        {t("go-to-signup")} <Link href="/signup"> {t("here")} </Link>
      </div>
    </Fragment>
  )
}