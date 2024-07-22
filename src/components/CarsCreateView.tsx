import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useCars } from '../components/CarProvider';

interface CarFormInputs {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

const CarsCreateView: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<CarFormInputs>();
  const navigate = useNavigate();
  const { addCar, cars } = useCars();

  const onSubmit: SubmitHandler<CarFormInputs> = (data) => {
    const newCAr = {id: cars.length + 1, ...data};
    addCar(newCAr);
    navigate('/cars-list'); 
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <TextField
          label="Name"
          {...register('name', { required: true })}
          error={!!errors.name}
          helperText={errors.name ? 'Name is required' : ''}
        />
        <TextField
          label="Model"
          {...register('model', { required: true })}
          error={!!errors.model}
          helperText={errors.model ? 'Model is required' : ''}
        />
        <TextField
          label="Year of Release"
          type="number"
          {...register('yearOfRelease', { required: true, min: 1900, max: new Date().getFullYear() })}
          error={!!errors.yearOfRelease}
          helperText={errors.yearOfRelease ? 'Valid year is required' : ''}
        />
        <TextField
          label="Brand"
          {...register('brand', { required: true })}
          error={!!errors.brand}
          helperText={errors.brand ? 'Brand is required' : ''}
        />
        <TextField
          label="Color"
          {...register('color', { required: true })}
          error={!!errors.color}
          helperText={errors.color ? 'Color is required' : ''}
        />
      </div>
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default CarsCreateView;
