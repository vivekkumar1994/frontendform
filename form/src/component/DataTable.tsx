import { useMemo } from 'react';
import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useSelector } from 'react-redux';
import { setAllData } from '../redux/userSlice';
import { RootState } from '../redux/store' 

//nested data is ok, see accessorKeys in ColumnDef below
const data = [
  {
    name: {
      firstName: 'John',
      lastName: 'Doe',
    },
    address: '261 Erdman Ford',
    city: 'East Daphne',
    state: 'Kentucky',
  },
  {
    name: {
      firstName: 'Jane',
      lastName: 'Doe',
    },
    address: '769 Dominic Grove',
    city: 'Columbus',
    state: 'Ohio',
  },
  {
    name: {
      firstName: 'Joe',
      lastName: 'Doe',
    },
    address: '566 Brakus Inlet',
    city: 'South Linda',
    state: 'West Virginia',
  },
  {
    name: {
      firstName: 'Kevin',
      lastName: 'Vandy',
    },
    address: '722 Emie Stream',
    city: 'Lincoln',
    state: 'Nebraska',
  },
  {
    name: {
      firstName: 'Joshua',
      lastName: 'Rolluffs',
    },
    address: '32188 Larkin Turnpike',
    city: 'Charleston',
    state: 'South Carolina',
  },
];

interface UserState {
  user: any[]; // Adjust the type accordingly
  err: null | string;
  loading: boolean;
}

const Example = () => {
  const userData = useSelector<RootState, UserState>((state) => state.user);

  console.log(userData, 'userData');
    
  //should be memoized or stable
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //access nested data with dot notation
        header: 'name',
        size: 150,
      },
      {
        accessorKey: 'dob',
        header: 'dob',
        size: 150,
      },
      {
        accessorKey: 'sex', //normal accessorKey
        header: 'sex',
        size: 200,
      },
      {
        accessorKey: 'mobile',
        header: 'mobile',
        size: 150,
      },
     
      {
        accessorKey: 'govtIdType',
        header: 'govtIdType',
        size: 150,
      },
     {
      accessorKey: 'govtId',
      header: 'govtId',
      size: 150,
    },

      {
        accessorKey: 'country',
        header: 'Country',
        size: 150,
      },
      {
        accessorKey: 'state',
        header: 'State',
        size: 150,
      },
      {
        accessorKey: 'city',
        header: 'city',
        size: 150,
      },
      {
        accessorKey: 'pincode',
        header: 'pincode',
        size: 150,
      },
    ],
    [],
  );

  const table = useMaterialReactTable({
    columns,
    data: userData.user, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
