import { Box, Typography } from "@mui/material"; 
import TopBar from "@/components/TopBar"; 
import { useTranslation } from "next-i18next";

export function ComingSoon() {
  const { t } = useTranslation();

  return (
    <Box style={{ display: 'flex', justifyContent: "center", flexDirection: 'column' }}>
      <TopBar />
      <Box style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h4">{t('coming-soon')}</Typography> 
      </Box>
    </Box>
  )
}
