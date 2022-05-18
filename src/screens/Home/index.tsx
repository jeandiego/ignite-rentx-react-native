import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { api } from '../../api/api';
import Logo from '../../assets/logo.svg'
import { CardCar } from '../../components/CardCar';
import { Loader } from '../../components/Loader';
import { CarDTO } from '../../dtos/CarDTO';
import useAsync from '../../hooks/useAsync';
import {
  Container,
  Header,
  TotalCars,
  HeaderContent,
  CarList
} from './styles';

export function Home() {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }

   const renderItem = useCallback(({ item }) => {
    return <CardCar data={item} onPress={() => handleCarDetails(item)} />
  }, [])

  const { loading: loadingCars, call: fetchCars } = useAsync(
    async () => {
      try {
      const response = await api.get('/cars')
      setCars(response.data);
      } catch (error) {
        console.warn(error);
      }
    },
    [],
  );

  useEffect(() => {
    fetchCars();
  }, [])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>
          Total de {cars.length} carros
        </TotalCars>
        </HeaderContent>
      </Header>
    {loadingCars ? 
      <Loader /> 
      :
      <CarList 
       data={cars}
       keyExtractor={item => String(item.id)}
       renderItem={renderItem}
      />
    }
    </Container>
  );
}