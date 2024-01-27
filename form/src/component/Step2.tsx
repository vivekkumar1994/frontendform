import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography, MenuItem, Select, Button, Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setAllData } from '../redux/userSlice';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { SelectChangeEvent } from '@mui/material/Select'; // Import the SelectChangeEvent type

// Import your country data JSON file
import countryDataFromJson from '../countriess.json';

interface City {
  id: number;
  name: string;
  // Other properties
}

interface State {
  name: string;
  cities: City[];
  // Other properties
}

interface Country {
  name: string;
  states: State[];
  // Other properties
}

const schema = yup.object().shape({
  address1: yup.string().required('Address 1 is required'),
  address2: yup.string().required('Address 2 is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  pincode: yup.string().required('Pincode is required'),
});

const Step2 = () => {
  const location = useLocation();
  const { state: previousStepData } = location;

  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const [selectedCountry, setSelectedCountry] = useState<Country | undefined>(undefined);
  const [selectedState, setSelectedState] = useState<State | undefined>(undefined);

  const handleCountryChange = (event: SelectChangeEvent<string>) => {
    const selectedCountryName = event.target.value;
    const country = countryDataFromJson.find((country: Country) => country.name === selectedCountryName);
    setSelectedCountry(country);
    // Reset selected state when a new country is selected
    setSelectedState(undefined);
  };

  const handleStateChange = (event: SelectChangeEvent<string>) => {
    const selectedStateName = event.target.value;
    const state = (selectedCountry?.states || []).find((state: State) => state.name === selectedStateName);
    setSelectedState(state);
  };

  const onSubmit: SubmitHandler<Record<string, any>> = async (data) => {
    try {
      const requestData = {
        ...data,
        name: previousStepData.name,
        mobile: previousStepData.mobile,
      };

      const response = await axios.post('http://localhost:5010/api/register-step2', requestData);

      dispatch(setAllData(data));
      navigate('/table');
      console.log('Form Data:', data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
    }
  };

  const countryOptions = countryDataFromJson.map((country: Country) => (
    <MenuItem key={country.name} value={country.name}>
      {country.name}
    </MenuItem>
  ));

  const stateOptions = (selectedCountry?.states || []).map((state: State) => (
    <MenuItem key={state.name} value={state.name}>
      {state.name}
    </MenuItem>
  ));

  const cityOptions = (selectedState?.cities || []).map((city: City) => (
    <MenuItem key={city.id} value={city.name}>
      {city.name}
    </MenuItem>
  ));

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          '& .MuiTextField-root': { m: 1, width: '100%', marginBottom: '5px' },
        }}
        noValidate
        autoComplete="off"
        maxWidth="500px"
      >
        <Box sx={{ marginBottom: '5vh' }}>
          <Typography variant="h4" component="h2">
            Registration form
          </Typography>
        </Box>

        <Box>
          <Typography component="h4">Address Detail</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 1"
              variant="outlined"
              fullWidth
              size="small"
              {...register('address1')}
              error={!!errors.address1}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.address1?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Address 2"
              variant="outlined"
              fullWidth
              size="small"
              {...register('address2')}
              error={!!errors.address2}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.address2?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="Country"
              variant="outlined"
              fullWidth
              value={selectedCountry?.name || ''}
              size="small"
              {...register('country')}
              error={!!errors.country}
              onChange={handleCountryChange}
            >
              {countryOptions}
            </Select>
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.country?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="State"
              variant="outlined"
              fullWidth
              value={selectedState?.name || ''}
              size="small"
              {...register('state')}
              error={!!errors.state}
              onChange={handleStateChange}
              disabled={!selectedCountry} // Disable if no country is selected
            >
              {stateOptions}
            </Select>
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.state?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              label="City"
              variant="outlined"
              fullWidth
              size="small"
              {...register('city')}
              error={!!errors.city}
            >
              {cityOptions}
            </Select>
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.city?.message}</p>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Pincode"
              variant="outlined"
              fullWidth
              size="small"
              {...register('pincode')}
              error={!!errors.pincode}
            />
            <p style={{ color: 'red', marginBottom: 0 }}>{errors.pincode?.message}</p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Button variant="contained" color="secondary">
              Back
            </Button>
          </Grid>
          <Grid item xs={6} style={{ textAlign: 'right' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Step2;
