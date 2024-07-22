import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CarsList from '../components/CarsList';
import TrucksList from '../components/TruckList';
import { Box } from '@mui/material';
import { CarProvider } from '../components/CarProvider';
import { TrucksProvider } from '../components/TruckProvidder';
import CarsCreateView from '../components/CarsCreateView';
import CarsUpdateView from 'src/components/CarsUpdateView';
// import TruckDetailView from 'src/components/TruckDetailView';
// import TrucksCreateView from '../components/TruckDetailView';
// import TrucksUpdateView from '../components/CarsUpdateView';
import TrucksUpdateView from 'src/components/TrucksUpdateView';
import TruckDetailView from 'src/components/TruckDetailView';

export function App() {
  return (
    <CarProvider>
      <TrucksProvider>
        <Router>
          <Navbar />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/cars-list" element={<CarsList />} />
              <Route path="/cars/create" element={<CarsCreateView />} />
              <Route path="/cars/update/:id" element={<CarsUpdateView />} />
              <Route path="/trucks-list" element={<TrucksList />} />
              <Route path="/trucks/create" element={<TruckDetailView />} />
              <Route path="/trucks/update/:id" element={<TrucksUpdateView />} />
            </Routes>
          </Box>
        </Router>
      </TrucksProvider>
    </CarProvider>
  );
}

export default App;
