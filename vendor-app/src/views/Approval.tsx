import { useContext, useEffect } from 'react';
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

  const fetchStatus = () => {
    const query = { query: `query { status(accessToken: "${loginContext.accessToken}") }` };
    fetch('/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log('response : ' + JSON.stringify(json, null, 2));
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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            marginBottom: 2,
          }}
        >
          <Logo />
        </Box>
        <CustomCard>
          <Typography gutterBottom component="h1" variant="h5" align="center">
            {t('vendor-app.vendor-account-approval')}
          </Typography>
          <CustomDivider />
          <Box aria-label="form" width={500} sx={{ mt: 1 }}>
            <Paper
              elevation={1}
              style={{ padding: '20px', margin: '100px', backgroundColor: '#f5f5f5' }}
            >
              <Typography component="h1" variant="h5">
                Status pending <WorkHistoryIcon style={{ transform: 'translate(20px, 3px)' }} />
              </Typography>
            </Paper>
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );

  if (loginContext.role !== 'vendor') {
    console.log(loginContext.role);
    return <RedirectNonVendor />;
  }

  if (loginContext.accessToken !== '') {
    return ApprovalComponent;
  } else {
    return null;
  }
}
