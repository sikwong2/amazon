import { useContext } from 'react';
import { LoginContext } from '../context/Login'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import CustomTextField from '@/components/CustomTextfield';
import CustomButton from '@/components/Button';
import Logo from '../components/Logo';
import CustomDivider from '@/components/Divider';
import CustomCard from '@/components/Card';


export function Approval() {

  const loginContext = useContext(LoginContext);

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
          <Typography component="h1" variant="h5" align="center">
            Vendor Account Approval Status
          </Typography>
          <Box aria-label='form' width={500} sx={{ mt: 1 }}
          >
          </Box>
        </CustomCard>
      </Box>
    </Container>
  );

  if (loginContext.accessToken !== '') {
    return ApprovalComponent;
  } else {
    return null;
  }
}