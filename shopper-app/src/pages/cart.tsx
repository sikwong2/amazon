import { OrderProvider } from "@/context/Order"
import { LoginProvider } from "@/context/Login";
import { Cart } from "@/views/Cart"
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

export default function CartPage() {
  return (
    <Cart />
  )
}