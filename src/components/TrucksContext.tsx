export interface Permit{
    permit_no: string;
    state: string;
  }
  
  export interface Truck {
    id: string;
    name: string;
    model: string;
    yearOfRelease: number;
    brand: string;
    permits: Permit[];
  }