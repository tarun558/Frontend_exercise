import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useCars } from './CarProvider';

interface UpdateCarFormInputs {
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

const CarsUpdateView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cars, updateCar } = useCars();
  const navigate = useNavigate();
  const car = cars.find((car) => car.id === parseInt(id!, 10));
  const { register, handleSubmit, setValue, formState: { errors, isValid, dirtyFields } } = useForm<UpdateCarFormInputs>({ mode: 'onChange' });

  useEffect(() => {
    if (car) {
      setValue('name', car.name);
      setValue('model', car.model);
      setValue('yearOfRelease', car.yearOfRelease);
      setValue('brand', car.brand);
      setValue('color', car.color);
    }
  }, [car, setValue]);

  const onSubmit: SubmitHandler<UpdateCarFormInputs> = (data) => {
    if (car) {
      updateCar({ ...car, ...data });
      navigate('/cars-list');
    }
  };

  const isAnyDirty = Object.keys(dirtyFields).length > 0;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 5 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Update Car
      </Typography>
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 500 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Name"
          fullWidth
          margin="normal"
          {...register('name', { required: 'Name is required', maxLength: {value: 100, message: 'Name must be at most 100 characters'} })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          label="Model"
          fullWidth
          margin="normal"
          {...register('model', { required: 'Model is required', maxLength: {value: 100, message: 'Name must be at most 100 characters'} })}
          error={!!errors.model}
          helperText={errors.model?.message}
        />
        <TextField
          label="Year of Release"
          type="number"
          fullWidth
          margin="normal"
          {...register('yearOfRelease', { 
            required: 'Year of Release is required', 
            min: { value: 2000, message: 'Year must be at least 2000' }, 
            max: { value: new Date().getFullYear(), message: `Year must be at most ${new Date().getFullYear()}` } 
          })}
          error={!!errors.yearOfRelease}
          helperText={errors.yearOfRelease?.message}
        />
        <TextField
          label="Brand"
          fullWidth
          margin="normal"
          {...register('brand', { required: 'Brand is required', maxLength: {value: 100, message: 'Name must be at most 100 characters'} })}
          error={!!errors.brand}
          helperText={errors.brand?.message}
        />
        <TextField
          label="Color"
          fullWidth
          margin="normal"
          {...register('color', { required: 'Color is required' })}
          error={!!errors.color}
          helperText={errors.color?.message}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button variant="contained" color="primary" type="submit" disabled = {!isValid || !isAnyDirty}>
            Update Car
          </Button>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/cars-list')}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default CarsUpdateView;
