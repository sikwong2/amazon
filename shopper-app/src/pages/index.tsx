import React, {useState} from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import LanguageButton from '@/components/Language';
import { languageButtonTheme } from '@/components/Theme';

const LanguageSwitcherButton = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale === 'en' ? 'en' : 'zh');

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage });
  };

  const options = [
    { value: 'en', label: 'English' },
    { value: 'zh', label: 'Mandarin' },
  ];

  return (
    <LanguageButton
      options={options}
      buttonTheme={languageButtonTheme}
      selectedValue={selectedLanguage}
      onChange={handleLanguageChange}
    />
  );
};

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
    </Fragment>
  )
}