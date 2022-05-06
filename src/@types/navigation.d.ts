type AppRoutes = {
  Home: undefined;
  CarDetails: undefined;
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