import TopBar from "@/components/TopBar"
import { useTranslation } from 'next-i18next';


export function ComingSoon() {
  const { t } = useTranslation(); // No need to specify 'common' if accessing a root-level key
  return (
    <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h1>{t('coming-soon')}</h1> {/* Correct key access */}
      </div>
    </div>
  )
}