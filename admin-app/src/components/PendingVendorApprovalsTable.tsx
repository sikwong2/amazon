import { useEffect, useState, useContext } from 'react';
import { LoginContext } from '../context/Login';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';
import CustomButton from './Button';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import LinearProgress from '@mui/material/LinearProgress';
import { useTranslation } from 'next-i18next';

export default function PendingVendorApprovalsTable() {
  const { t } = useTranslation('common');
  const loginContext = useContext(LoginContext);
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id', headerName: t('adminportal.id') as string, flex: 1, sortable: false },
    { field: 'name', headerName: t('adminportal.name') as string, flex: 1 },
    { field: 'email', headerName: t('adminportal.email') as string, flex: 1 },
    {
      field: 'action',
      headerName: t('adminportal.action') as string,
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <div>
          <CustomButton
            label={`approve-${params.row.id}`}
            variant="contained"
            color="primary"
            size="small"
            onClick={() => {
              setLoading(true);
              approveVendor(params.row.id);
            }}
            disabled={loading}
          >
            {loading ? t('adminportal.loading') : t('adminportal.approve')}
          </CustomButton>
        </div>
      ),
    },
  ];

  const approveVendor = (id: string) => {
    const query = {
      query: `mutation {
        approvevendor(id: "${id}") {
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
      .then((res) => res.json())
      .then((json) => {
        fetchPendingVendors();
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const fetchPendingVendors = () => {
    setLoading(true);

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
      .then((res) => res.json())
      .then((json) => {
        if (!json.data || !json.data.unapprovedvendors) {
          console.log('No data');
          setVendors([]);
        } else {
          setVendors(json.data.unapprovedvendors);
        }
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 500); // Delay to ensure DataGrid renders
      });
  };

  useEffect(() => {
    fetchPendingVendors();

    const intervalId = setInterval(fetchPendingVendors, 10000); // 5000 ms = 5 seconds

    return () => clearInterval(intervalId); // This will clear the interval on component unmount
  }, []);

  return (
    <Box width={'80vw'} sx={{ mt: 1 }}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <DataGrid
          rows={vendors}
          getRowId={(row) => row.id}
          columns={columns}
          style={{ backgroundColor: '#f5f5f5' }}
          slots={{
            noRowsOverlay: () => (
              <CustomNoRowsOverlay sx={{ p: '14px' }} label={t('adminportal.no-vendors')} />
            ),
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
  );
}
