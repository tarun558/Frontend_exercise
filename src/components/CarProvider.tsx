import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { faker } from '@faker-js/faker';

export interface Car {
  id: number;
  name: string;
  model: string;
  yearOfRelease: number;
  brand: string;
  color: string;
}

const generateRandomCar = (id: number): Car => {
  // const names = ['Civic', 'Accord', 'Corolla', 'Camry', 'Model S'];
    // const models = ['Sedan', 'SUV', 'Truck', 'Coupe', 'Convertible'];
    // const brands = ['Honda', 'Toyota', 'Ford', 'Chevrolet', 'Tesla'];
    // const colors = ['Red', 'Blue', 'Black', 'White', 'Gray'];
    // const generateRandomElement = (arr: string[]) => arr[Math.floor(Math.random() *
  return {
    id,
    name: faker.vehicle.vehicle(),
    model: faker.vehicle.model(),
    yearOfRelease: faker.date.past(20, new Date()).getFullYear(),
    brand: faker.vehicle.manufacturer(),
    color: faker.vehicle.color(),
  };
};

const generateRandomCars = (count: number): Car[] => {
  return Array.from({ length: count },(_, index) => generateRandomCar(index + 1));
};

interface CarContextType {
  cars: Car[];
  addCar: (car: Car) => void;
  updateCar: (updatedCar: Car) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    const generatedCars = generateRandomCars(10);
    setCars(generatedCars);
  }, []);

  const addCar = (car: Car) => {
    setCars((prevCars) => [...prevCars, car]);
  };

  const updateCar = (updateCar: Car) => {
    setCars((prevCars) =>
      prevCars.map((car) => (car.id === updateCar.id ? updateCar : car))
    );
  }

  return (
    <CarContext.Provider value={{ cars, addCar, updateCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCars = (): CarContextType => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCars must be used within a CarProvider');
  }
  return context;
};
