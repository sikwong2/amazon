import { LoginProvider } from '@/context/Login'
import { Login } from '@/views/Login'
import { GetServerSideProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
// this must be in page-level components (not in components in /view)
export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en', [
      'common',
    ])),
  },
})

// to create new page add a new file with page name under pages
// https://nextjs.org/learn-pages-router/basics/navigate-between-pages
export default function LoginPage() {
  return (
    <Login/>
  )
}