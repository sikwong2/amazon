import { useEffect, useState, useContext } from 'react';
import { Typography } from '@mui/material';
import { LoginContext } from '../context/Login';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomButton from './Button';
import CustomCard from './Card';
import CustomDivider from './Divider';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import LinearProgress from '@mui/material/LinearProgress';
import KeyIcon from '@mui/icons-material/Key';
import { useTranslation } from 'next-i18next';

export default function APIKeysTable() {
  const { t } = useTranslation('common');
  const loginContext = useContext(LoginContext);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchVendorKeys = () => {
    setLoading(true);

    const query = {
      query: `query {
        vendorKeys(id: "${loginContext.id}") {
          api_key
          account_id
          active
        }
      }`,
    };
    fetch('/vendor/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginContext.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.data || !json.data.vendorKeys) {
          console.log('No data');
          setKeys([]);
        } else {
          setKeys(json.data.vendorKeys);
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500); // Delay to ensure DataGrid renders
      });
  };

  const createAPIKey = () => {
    setLoading(true);

    const query = {
      query: `mutation {
        createAPIKey(id: "${loginContext.id}") {
          api_key
          account_id
          active
        }
      }`,
    };
    fetch('/vendor/api/graphql', {
      method: 'POST',
      body: JSON.stringify(query),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${loginContext.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        if (!json.data || !json.data.createAPIKey) {
          console.log('No data');
        } else {
          fetchVendorKeys();
        }
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'api_key',
      headerName: t('vendorportal.key') as string,
      flex: 9,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex" width={'100%'}>
          <Box flexBasis="80%" overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
            {params.value}
          </Box>
          <Box flexBasis="20%" display="flex" justifyContent="flex-end">
            <Tooltip title="Copy">
              <IconButton size="small" onClick={() => navigator.clipboard.writeText(params.value)}>
                <FileCopyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ),
    },
    { field: 'active', headerName: t('vendorportal.status') as string, flex: 1 },
  ];

  useEffect(() => {
    // Call fetchStatus immediately after component mount
    fetchVendorKeys();
    // Set up the interval
    const intervalId = setInterval(fetchVendorKeys, 10000);
    // Clean up function
    // return () => clearInterval(intervalId); // This will clear the interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <CustomCard sx={{ m: '28px' }}>
      <Box sx={{ p: '14px' }}>
        <Box display="flex" justifyContent="space-between">
          <Typography gutterBottom component="h1" variant="h5" align="left" pl={'14px'}>
            {t('vendorportal.api-keys')} <KeyIcon style={{ transform: 'translate(0px, 3px)' }} />
          </Typography>
          <CustomButton
            label="generate-new-key"
            variant="contained"
            color="primary"
            onClick={createAPIKey}
            sx={{ mr: '14px', mb: '10px' }}
          >
            {t('vendorportal.generate')}
          </CustomButton>
        </Box>
        <CustomDivider />
        <Box sx={{ mt: 1 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={keys}
              getRowId={(row) => row.api_key}
              columns={columns}
              style={{ backgroundColor: '#f5f5f5' }}
              slots={{
                noRowsOverlay: () => (
                  <CustomNoRowsOverlay sx={{ p: '14px' }} label={t('vendorportal.no-keys')} />
                ),
                loadingOverlay: LinearProgress,
              }}
              loading={loading}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
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
  );
}
