import React, {useState} from 'react';
import Head from 'next/head'
import { Fragment } from 'react'
import Link from 'next/link';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useTranslation } from "next-i18next";
import { useRouter } from 'next/router'
import RadioHoverButton from '@/components/Language';
import { createTheme } from '@mui/material/styles';

const LanguageSwitcherButton = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const [selectedLanguage, setSelectedLanguage] = useState(router.locale === 'en' ? 'en' : 'zh');

  const handleLanguageChange = (newLanguage: string) => {
    setSelectedLanguage(newLanguage);
    router.push('/', '/', { locale: newLanguage }); // Change locale directly to the selected language
  };

  const options = [
    { value: 'en', label: 'English' },
    { value: 'zh', label: 'Mandarin' },
  ];

  const radioButtonTheme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: 'lightblue',
            color: 'black',
          },
        },
      },
    },
  });

  return (
    <RadioHoverButton
      options={options}
      buttonTheme={radioButtonTheme}
      selectedValue={selectedLanguage} // Pass selected value to RadioHoverButton
      onChange={handleLanguageChange} // Pass language change handler to RadioHoverButton
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