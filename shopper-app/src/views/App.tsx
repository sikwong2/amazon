import { Fragment } from "react";
import Home from "./Home";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

// temporary button to swap languages
const Switcher = () => {
    const router = useRouter()
    const changeTo = router.locale === 'en' ? 'zh' : 'en'
    const { t } = useTranslation('common')
    return (
      <Link href="/" locale={changeTo}>
        <button>{t('change-locale', { changeTo })}</button>
      </Link>
    )
  }

export function App() {
    return (
        <Fragment>
            <Switcher />
            <Home />
        </Fragment>
    );
  }