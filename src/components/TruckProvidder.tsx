// src/components/TruckProvider.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Truck, Permit } from './TrucksContext';
import { faker } from '@faker-js/faker';

interface TrucksType {
  trucks: Truck[];
  addTruck: (truck: Truck) => void;
  updateTruck: (updatedTruck: Truck) => void;
}

const TrucksContext = createContext<TrucksType | undefined>(undefined);

const generateSampleTrucks = (count: number): Truck[] => {
  const trucks: Truck[] = [];
  for (let i = 0; i < count; i++) {
    const permits: Permit[] = Array.from({ length: faker.datatype.number({ min: 1, max: 5 }) }, () => ({
      permit_no: faker.datatype.uuid(),
      state: faker.address.stateAbbr(),
    }));

    const truck: Truck = {
      id: faker.datatype.uuid(),
      name: faker.vehicle.vehicle(),
      model: faker.vehicle.model(),
      yearOfRelease: faker.datatype.number({ min: 2000, max: 2024 }),
      brand: faker.vehicle.manufacturer(),
      permits,
    };

    trucks.push(truck);
  }
  return trucks;
};

export const TrucksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trucks, setTrucks] = useState<Truck[]>([]);

  useEffect(() => {
    const sampleTrucks = generateSampleTrucks(10); 
    setTrucks(sampleTrucks);
  }, []);

  const addTruck = (truck: Truck) => {
    setTrucks([...trucks, truck]);
  };

  const updateTruck = (updatedTruck: Truck) => {
    setTrucks(trucks.map(truck => (truck.id === updatedTruck.id ? updatedTruck : truck)));
  };

  return (
    <TrucksContext.Provider value={{ trucks, addTruck, updateTruck }}>
      {children}
    </TrucksContext.Provider>
  );
};

export const useTrucks = () => {
  const context = useContext(TrucksContext);
  if (!context) {
    throw new Error('useTrucks must be used within a TrucksProvider');
  }
  return context;
};
