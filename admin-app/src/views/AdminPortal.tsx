import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import CustomCard from '@/components/Card';
import CustomDivider from '@/components/Divider';
import KeyIcon from '@mui/icons-material/Key';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PendingVendorApprovalsTable from '@/components/PendingVendorApprovalsTable';
import APIKeysTable from '@/components/APIKeysTable';
import TopBar from '../components/TopBar';

export function AdminPortal() {
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');
  const [vendors, setVendors] = useState([]);

  const AdminPortalComponent = (
    <>
      <TopBar />
      <Container
        component="main"
        sx={{
          mb: '28px',
          pt: '14px',
          pb: '18px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <CustomCard>
            <Box sx={{ p: '14px' }}>
              <Typography gutterBottom component="h1" variant="h5" align="left" pl={'14px'}>
                {t('adminportal.pending-vendor')}{' '}
                <PendingActionsIcon style={{ transform: 'translate(0px, 3px)' }} />
              </Typography>
              <CustomDivider />
              <PendingVendorApprovalsTable />
            </Box>
          </CustomCard>
          <CustomCard sx={{ m: '28px' }}>
            <Box sx={{ p: '14px' }}>
              <Typography gutterBottom component="h1" variant="h5" align="left" pl={'14px'}>
                {t('adminportal.api-keys')} <KeyIcon style={{ transform: 'translate(0px, 3px)' }} />
              </Typography>
              <CustomDivider />
              <APIKeysTable />
            </Box>
          </CustomCard>
        </Box>
      </Container>
    </>
  );

  if (loginContext.accessToken !== '') {
    return AdminPortalComponent;
  } else {
    return null;
  }
}
