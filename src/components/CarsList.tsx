import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useCars } from '../components/CarProvider';
// import { Link } from 'react-router-dom';

const CarsList: React.FC = () => {
  const { cars } = useCars();
  const navigate = useNavigate();

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    // { field: 'name', headerName: 'Name', width: 150, renderCell: (params) => (
    //   <Button onClick={() => navigate(`/cars/update/${params.row.id}`)}>{params.row.name}</Button>
    // ) },
    { field: 'name', headerName: 'Name', width: 150,},
    { field: 'model', headerName: 'Model', width: 150 },
    { field: 'yearOfRelease', headerName: 'Year of Release', width: 150 },
    { field: 'brand', headerName: 'Brand', width: 150 },
    { field: 'color', headerName: 'Color', width: 150 },
    {
      field: 'action',
      headerName: 'Update',
      width: 150,
      renderCell: (params) => (
        <Button variant="contained" color="primary" onClick={() => navigate(`/cars/update/${params.row.id}`)}>
          Update
        </Button>
      ),
    },
  ];

  const rows = cars.map((car, index) => ({
    ...car,
    id: car.id || index + 1, 
  }));

  return (
    <Box sx={{ height: 600, width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate('/cars/create')}
      >
        Add Car
      </Button>
      </Box>
      <DataGrid
        rows={rows}
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

export default CarsList;
