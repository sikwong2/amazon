import {useEffect, useState, useContext} from 'react';
import { LoginContext } from '../context/Login';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomButton from './Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export default function PendingVendorApprovalsTable() {

  const loginContext = useContext(LoginContext);
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
        <CustomButton
          label={`approve-${params.row.id}`}
          variant="contained"
          color="primary"
          size="small"
          onClick={() => {
            console.log(params.row);
          }}
        >
          Approve
        </CustomButton>
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
