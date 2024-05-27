import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../context/Login';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomButton from './Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton, Tooltip } from '@mui/material';
import FileCopyIcon from '@mui/icons-material/FileCopy';

export default function APIKeysTable() {
  const loginContext = useContext(LoginContext);
  const [vendors, setVendors] = useState([]);

  const columns: GridColDef[] = [
    {
      field: 'id',
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
    { field: 'name', headerName: 'Owner', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Box display="flex">
          <CustomButton
            label={`activate-${params.row.id}`}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              console.log(`Activate ${params.row.id}`);
            }}
          >
            Activate
          </CustomButton>
          <CustomButton
            label={`deactivate-${params.row.id}`}
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              console.log(`Deactivate ${params.row.id}`);
            }}
            sx={{ ml: 1 }}
          >
            Deactivate
          </CustomButton>
        </Box>
      ),
    },
  ];

  const fetchPendingVendors = () => {
    console.log('bearer token: ' + loginContext.accessToken);

    const query = {
      query: `query {
        unapprovedvendors {
        id
        name
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
    fetchPendingVendors();

    // Set up the interval
    const intervalId = setInterval(fetchPendingVendors, 5000); // 5000 ms = 5 seconds

    // Clean up function
    return () => clearInterval(intervalId); // This will clear the interval on component unmount
  }, []); // Empty dependency array means this effect runs once on mount and clean up on unmount

  return (
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
  );
}
