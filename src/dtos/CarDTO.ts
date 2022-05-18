
interface ICarAcessoriesDTO {
  type: string;
  name: string;
}

interface ICarRentDTO {
  period: string;
  price: number;
}

export interface CarDTO {
    id: string;
    brand: string;
    name: string;
    about: string;
    rent: ICarRentDTO;
    fuel_type: string;
    thumbnail: string;
    accessories: ICarAcessoriesDTO[];
    photos: string[];
}