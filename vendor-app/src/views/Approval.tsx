import { useContext, useEffect, useState } from 'react';
import { LoginContext } from '../context/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import Logo from '../components/Logo';
import CustomCard from '@/components/Card';
import CustomDivider from '@/components/Divider';
import Paper from '@mui/material/Paper';
import { RedirectNonVendor } from './RedirectNonVendor';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import { padding } from '@mui/system';

export function Approval() {
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');
  const [status, setStatus] = useState(false);

  const fetchStatus = () => {
    const query = { query: `query { status }` };
    fetch('/vendor/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${loginContext.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
      });
  };

  useEffect(() => {
    // Call fetchStatus immediately after component mount
    fetchStatus();

    // Set up the interval
    const intervalId = setInterval(fetchStatus, 5000); // 5000 ms = 5 seconds

    // Clean up function
    return () => clearInterval(intervalId); // This will clear the interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  const ApprovalComponent = (
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
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2.5 }}>
        <Logo width={100} height="auto" />
      </Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <CustomCard>
          <Box sx={{ p: '14px' }}>
            <Typography gutterBottom component="h1" variant="h5" align="center">
              {t('vendor-app.vendor-account-approval')}
            </Typography>
            <CustomDivider />
            <Box sx={{ mt: 1 }}>
              <Paper
                elevation={1}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  padding: '20px',
                  margin: '100px',
                  backgroundColor: '#f5f5f5',
                }}
              >
                <Typography component="h1" variant="h5">
                  {t("vendor-app.status-pending")} <WorkHistoryIcon style={{ transform: 'translate(0px, 3px)' }} />
                </Typography>
              </Paper>
            </Box>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );

  if (loginContext.role !== 'vendor') {
    return <RedirectNonVendor />;
  }

  if (loginContext.accessToken !== '') {
    return ApprovalComponent;
  } else {
    return null;
  }
}
