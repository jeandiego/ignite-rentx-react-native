import { CarDTO } from "../dtos/CarDTO";
import { IRentalPeriod } from "../screens/Scheduling";

type AppRoutes = {
  Home: undefined;
  MyCars: undefined;
  CarDetails: {
    car: CarDTO
  };
  Scheduling: {
    car: CarDTO;
  };
  SchedulingDetails: {
    car: CarDTO;
    dates: string[];
    rentalPeriod: IRentalPeriod;
  };
  SchedulingCompleted: undefined;

}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {

    }
  }
}