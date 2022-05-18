import { CarDTO } from "../dtos/CarDTO";

type AppRoutes = {
  Home: undefined;
  CarDetails: {
    car: CarDTO
  };
  Scheduling: undefined;
  SchedulingDetails: undefined;
  SchedulingCompleted: undefined;

}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppRoutes {

    }
  }
}