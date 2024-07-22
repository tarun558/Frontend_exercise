// src/components/TrucksList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTrucks } from '../components/TruckProvidder';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { Permit } from '../components/TrucksContext';

const TrucksList: React.FC = () => {
  const { trucks } = useTrucks();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    // { field: 'id', headerName: 'ID', width: 200 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'yearOfRelease', headerName: 'Year of Release', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    {
      field: 'permits',
      headerName: 'Permits',
      width: 300,
      valueGetter: (params: any) => {
        const permits = params ?? [];
        return permits.map((p: Permit) => p.state).join(', ');
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(`/trucks/update/${params.row.id}`)}
        >
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <DataGrid
        rows={trucks}
        columns={columns}
        pageSizeOptions={[20, 50, 100]}
        pagination
        initialState={{
          pagination: {
            paginationModel: { pageSize: 20 },
            
          },
        }}
      />
    </Box>
  );
};

export default TrucksList;
