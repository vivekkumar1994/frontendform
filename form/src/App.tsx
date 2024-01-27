// App.tsx
import React, { useEffect } from 'react';

import { configureStore } from '@reduxjs/toolkit';

import Step1 from './component/Step1';
import Step2 from './component/Step2';
import Navbar from './component/Navbar';
import DataTable from "./component/DataTable"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import { fetchData } from './redux/userSlice';
import { useDispatch } from 'react-redux';



const App: React.FC = () => {
  const dispatch = useDispatch();



  useEffect(() => {
    // Dispatch the async thunk to fetch data
    dispatch(fetchData() as any); // Explicitly cast to any to resolve the TypeScript error
  }, [dispatch]);
  return (

   
      <BrowserRouter>
      <Navbar/>
      <Routes>
 
        <Route path='/' element={<Step1/>}/>
        <Route path ="/step2" element={<Step2/>}/>
        <Route path ="/table" element={<DataTable/>}/>
      </Routes>
    
  
      </BrowserRouter>
 
  );
};

export default App;
