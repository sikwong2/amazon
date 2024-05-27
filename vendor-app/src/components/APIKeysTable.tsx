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

export default function APIKeysTable() {
  const loginContext = useContext(LoginContext);
  const [keys, setKeys] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchVendorKeys = () => {
    console.log('bearer token: ' + loginContext.accessToken);
    setLoading(true);

    const query = {
      query: `query {
        allKeys {
          account_id
          api_key
          active
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
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (!json.data || !json.data.allKeys) {
          console.log('No data');
          setKeys([]);
        } else {
          setKeys(json.data.allKeys);
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500); // Delay to ensure DataGrid renders
      });
  };

  const columns: GridColDef[] = [
    {
      field: 'api_key',
      headerName: 'Key',
      flex: 1,
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
    { field: 'account_id', headerName: 'Owner ID', flex: 1 },
    { field: 'active', headerName: 'Status', flex: 1 },
  ];

  useEffect(() => {
    // Call fetchStatus immediately after component mount
    // fetchVendorKeys();

    // // Set up the interval
    // const intervalId = setInterval(fetchVendorKeys, 10000); // 5000 ms = 5 seconds

    // Clean up function
    // return () => clearInterval(intervalId); // This will clear the interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
    <CustomCard sx={{ m: '28px' }}>
      <Box sx={{ p: '14px' }}>
        <Typography gutterBottom component="h1" variant="h5" align="left" pl={'14px'}>
          API Keys <KeyIcon style={{ transform: 'translate(0px, 3px)' }} />
        </Typography>
        <CustomDivider />
        <Box  sx={{ mt: 1 }}>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <DataGrid
              rows={keys}
              getRowId={(row) => row.account_id}
              columns={columns}
              style={{ backgroundColor: '#f5f5f5' }}
              slots={{
                noRowsOverlay: () => <CustomNoRowsOverlay sx={{ p: '14px' }} label="No API Keys" />,
                loadingOverlay: LinearProgress,
              }}
              loading={loading}
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
  );
}
