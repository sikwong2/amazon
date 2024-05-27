import { CssBaseline } from '@mui/material';
import TopBar from '@/components/TopBar';
import APIKeysTable from '../components/APIKeysTable';

export default function VendorPortal() {
  return (
    <>
      <CssBaseline />
      <TopBar />
      <APIKeysTable />
    </>
  );
}
