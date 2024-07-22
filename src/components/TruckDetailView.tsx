// src/components/TruckDetailView.tsx
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTrucks } from '../components/TruckProvidder';
import { Truck, Permit } from '../components/TrucksContext';

interface TruckFormInputs extends Truck {
  permits: Permit[];
}

const TruckDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { trucks, updateTruck } = useTrucks();
  const truck = trucks.find((truck) => truck.id === id);
  const navigate = useNavigate();

  const { register, control, handleSubmit, setValue, formState: { errors } } = useForm<TruckFormInputs>({
    defaultValues: {
      ...truck,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permits',
  });

  useEffect(() => {
    if (truck) {
      setValue('name', truck.name);
      setValue('model', truck.model);
      setValue('yearOfRelease', truck.yearOfRelease);
      setValue('brand', truck.brand);
      setValue('permits', truck.permits);
    }
  }, [truck, setValue]);

  const onSubmit = (data: TruckFormInputs) => {
    updateTruck({ ...data, id: truck?.id ?? '' });
    navigate('/trucks-list');

  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
      <TextField
        label="Name"
        {...register('name', { required: 'Name is required', maxLength: { value: 50, message: 'Max length is 50' } })}
        error={!!errors.name}
        helperText={errors.name?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Model"
        {...register('model', { required: 'Model is required', maxLength: { value: 50, message: 'Max length is 50' } })}
        error={!!errors.model}
        helperText={errors.model?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Year of Release"
        type="number"
        {...register('yearOfRelease', { required: 'Year of Release is required', min: { value: 1886, message: 'Year should be more than 1886' }, max: { value: new Date().getFullYear(), message: `Year should be less than ${new Date().getFullYear()}` } })}
        error={!!errors.yearOfRelease}
        helperText={errors.yearOfRelease?.message}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Brand"
        {...register('brand', { required: 'Brand is required', maxLength: { value: 50, message: 'Max length is 50' } })}
        error={!!errors.brand}
        helperText={errors.brand?.message}
        fullWidth
        margin="normal"
      />

      <Typography variant="h6" component="div" gutterBottom>
        Permits
      </Typography>
      {fields.map((field, index) => (
        <Box key={field.id} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TextField
            label="Permit No"
            {...register(`permits.${index}.permit_no` as const, { required: 'Permit number is required' })}
            error={!!errors.permits?.[index]?.permit_no}
            helperText={errors.permits?.[index]?.permit_no?.message ?? ''}
            fullWidth
            margin="normal"
            sx={{ mr: 1 }}
          />
          <TextField
            label="State"
            {...register(`permits.${index}.state` as const, { required: 'State is required' })}
            error={!!errors.permits?.[index]?.state}
            helperText={errors.permits?.[index]?.state?.message ?? ''}
            fullWidth
            margin="normal"
            sx={{ mr: 1 }}
          />
          <IconButton onClick={() => remove(index)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Button type="button" onClick={() => append({ permit_no: '', state: '' })} variant="contained" color="primary">
        Add Permit
      </Button>
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
        Update Truck
      </Button>
    </Box>
  );
};

export default TruckDetailView;
