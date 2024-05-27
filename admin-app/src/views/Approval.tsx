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
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import KeyIcon from '@mui/icons-material/Key';

import Button from '@mui/material/Button';
import { padding } from '@mui/system';
import TopBar from '../components/TopBar';

export function Approval() {
  const loginContext = useContext(LoginContext);
  const { t } = useTranslation('common');
  const [vendors, setVendors] = useState([]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', flex: 1, sortable: false },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'email', headerName: 'Email', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            console.log(params.row);
          }}
        >
          Approve
        </Button>
      ),
    },
  ];

  const fetchStatus = () => {
    console.log('bearer token: ' + loginContext.accessToken);

    const query = {
      query: `query {
        unapprovedvendors {
        id
        name
        email
        role
      }
    }`,
    };
    fetch('/admin/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginContext.accessToken}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        console.log(json);
        if (!json.data || !json.data.unapprovedvendors) {
          console.log('No data');
          return;
        }

        console.log(json.data.unapprovedvendors);

        setVendors(json.data.unapprovedvendors);
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
                Pending Vendor Approvals <PendingActionsIcon style={{ transform: 'translate(0px, 3px)' }}/>
              </Typography>
              <CustomDivider />
              <Box width={'80vw'} sx={{ mt: 1 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <DataGrid
                    rows={vendors}
                    columns={columns}
                    style={{ backgroundColor: '#f5f5f5' }}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </Paper>
              </Box>
            </Box>
          </CustomCard>
          <CustomCard sx={{m : '24px'}}>
            <Box sx={{ p: '14px'}}>
              <Typography gutterBottom component="h1" variant="h5" align="left" pl={'14px'}>
                API Keys
              </Typography>
              <CustomDivider />
              <Box width={'80vw'} sx={{ mt: 1 }}>
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                  <DataGrid
                    rows={vendors}
                    columns={columns}
                    style={{ backgroundColor: '#f5f5f5' }}
                    slots={{
                      noRowsOverlay: CustomNoRowsOverlay,
                    }}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    autoHeight
                  />
                </Paper>
              </Box>
            </Box>
          </CustomCard>
        </Box>
      </Container>
    </>
  );

  if (loginContext.accessToken !== '') {
    console.log(vendors);
    return ApprovalComponent;
  } else {
    return null;
  }
}
