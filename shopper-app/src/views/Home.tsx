import { useTranslation } from "next-i18next";

export default function Home() {
  const { t } = useTranslation('common')
    return (
      <div>
        <h1>{t('title')}</h1>
        <h2>{t('group')}</h2>
        <p>Kevin Schultz</p>
        <p> Alan Tan </p>
        <p>Simon Kwong</p>
        <p>Philsim Nepacena</p>
        <p>Norton Choy</p>
        <p>Sunny Han</p>
      </div>
    );
  }