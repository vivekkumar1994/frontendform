import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, MenuItem, Select, Button, Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch} from 'react-redux';
import {setAllData} from "../redux/userSlice"
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  dob: yup.string().required('DOB is required'),
  sex: yup.string().required('Sex is required'),
  mobile: yup
    .number()
    .required('Mobile is required')
    .positive('Mobile must be a positive number')
    .integer('Mobile must be an integer')
    .test({
      name: 'len',
      message: 'Mobile must be exactly 10 digits',
      test: (val) => val ? val.toString().length === 10 : false,
    }),
  govtIdType: yup.string().required('Govt ID Type is required'),
  govtId: yup
    .string()
    .required('Govt ID is required')
    .matches(/^[a-zA-Z]{2}\d{5}[a-zA-Z]{4}$/, 'Invalid Govt ID format'),
});





const Step1 = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Record<string, any>> = async(data) => {
    // Handle form submission logic
    try{
    const response = await axios.post('http://localhost:5010/api/register-step1', data);

    // Handle form submission logic
    dispatch(setAllData(response.data.result));
    navigate('/step2',{ state: { name: data.name, mobile:data.mobile } });
    console.log('Form Data:', data);

    // Log API response
    console.log('API Response:', response.data);
  } catch (error) {
    // Handle API call error
    console.error('API Error:', error);
  }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '50vh',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', marginBottom: '5px' },
        }}
        noValidate
        autoComplete="off"
        maxWidth="500px"
        p={2}
        borderRadius={5}
      >
        <Box sx={{ marginBottom: 'vh' }}>
          <Typography variant="h4" component="h2">
            Registration form
          </Typography>
        </Box>

        <Box>
          <Typography component="h4">Personal Detail</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              size="small"
              {...register('name')}
              error={!!errors.name}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.name?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Dob"
              variant="outlined"
              fullWidth
              type="date"
              size="small"
              InputLabelProps={{ shrink: true }}
              {...register('dob')}
              error={!!errors.dob}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.dob?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="Sex"
              variant="outlined"
              fullWidth
              size="small"
              {...register('sex', { required: 'Sex is required' })}
              error={!!errors.sex}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.sex?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Mobile"
              variant="outlined"
              fullWidth
              size="small"
              {...register('mobile')}
              error={!!errors.mobile}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.mobile?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="Govt Issued Card Type"
              variant="outlined"
              fullWidth
              size="small"
              {...register('govtIdType', { required: 'Govt ID Type is required' })}
              error={!!errors.govtIdType}
            >
              <MenuItem value="Aadhar">Aadhar Card</MenuItem>
              <MenuItem value="PAN">PAN Card</MenuItem>
            </Select>
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.govtIdType?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Govt Issued ID Number"
              variant="outlined"
              fullWidth
              size="small"
              {...register('govtId')}
              error={!!errors.govtId}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.govtId?.message}</p>
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary">
          Next
        </Button>
      </Box>
    </div>
  );
};

export default Step1;
