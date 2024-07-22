import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, IconButton } from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';
import { useTrucks } from '../components/TruckProvidder';

interface TruckFormInputs {
  id?: string;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  permits: PermitFormInputs[];
}

interface PermitFormInputs {
  permit_no: string;
  state: string;
}

const TrucksUpdateView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { trucks, updateTruck } = useTrucks();
  const navigate = useNavigate();
  
  const truck = trucks.find(truck => truck.id === id);
  
  const { register, control, handleSubmit, formState: { errors } } = useForm<TruckFormInputs>({
    defaultValues: truck ? {
      ...truck,
      permits: truck.permits || []
    } : {
      name: '',
      model: '',
      yearOfRelease: new Date().getFullYear(),
      brand: '',
      permits: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'permits'
  });

  const onSubmit = (data: TruckFormInputs) => {
    if (truck) {
      updateTruck({ ...truck, ...data });
      navigate('/trucks-list');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
        {...register('yearOfRelease', { required: 'Year of Release is required', min: { value: 1900, message: 'Year must be later than 1900' }, max: { value: new Date().getFullYear(), message: `Year must be earlier than ${new Date().getFullYear()}` } })}
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
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <Button type="button" onClick={() => append({ permit_no: '', state: '' })} variant="contained" color="primary">
        Add Permit
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Update Truck
      </Button>
    </Box>
    </Box>
  );
};

export default TrucksUpdateView;
