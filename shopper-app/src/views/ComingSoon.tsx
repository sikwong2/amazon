import TopBar from "@/components/TopBar"
import { Typography } from "@mui/material";
import { useTranslation } from 'next-i18next';


export function ComingSoon() {
  const { t } = useTranslation(); // No need to specify 'common' if accessing a root-level key
  return (
    <div style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
      <TopBar />
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">{t('coming-soon')}</Typography> {/* Adjust the variant as needed */}
      </div>
    </div>
  )
}