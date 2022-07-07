import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { CarDTO } from '~/dtos/CarDTO';
import { api } from '../../api/api';
import { BackButton } from '../../components/BackButton';
import { CardCar } from '../../components/CardCar';
import { AntDesign } from '@expo/vector-icons'
import useAsync from '../../hooks/useAsync';

import {
  Container,
  Header,
  Title,
  Subtitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterPeriod,
  CarFooterDate,
} from './styles';
import { IRentalPeriod } from '../schedule/Scheduling';
import { Loader } from '../../components/Loader';
import { LoadAnimation } from '../../components/LoadAnimation';

interface ICarProps {
  id: string;
  user_id: string;
  car: CarDTO;
  rentalPeriod: IRentalPeriod;
}

export function MyCars() {
  const navigation = useNavigation();
  const theme = useTheme();
  const [cars, setCars] = useState<ICarProps[]>([])

  const {loading: loadingSchedules, call: fetchCars  } = useAsync(async() => {
    try {
      const response = await api.get('/schedules_byuser?user_id=1')
      setCars(response.data)
    } catch (error) {
      console.warn(error)      
    }
  }, [])


  const renderItem = useCallback(({item}) => {
    return(
      <CarWrapper>
        <CardCar data={item.car} enabled={false} />
          <CarFooter>
            <CarFooterTitle>Periodo</CarFooterTitle>
              <CarFooterPeriod>
                <CarFooterDate>{item.rentalPeriod.startFormatted}</CarFooterDate>
                <AntDesign 
                  name="arrowright"
                  size={24}
                  color={theme.colors.title}
                  style={{ marginHorizontal: 12 }}
                />
              <CarFooterDate>{item.rentalPeriod.endFormatted}</CarFooterDate>
          </CarFooterPeriod>
        </CarFooter>
      </CarWrapper>
    )
  }, [])
  
  useEffect(() => {
    fetchCars();
  }, [])

  return (
    <Container>
      <Header>
        <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />
          <BackButton onPress={navigation.goBack} color={theme.colors.shape} />
            <Title>
              Escolha uma {'\n'}
              data de início e {'\n'}
              fim do aluguel 
            </Title>
            <Subtitle>
              Conforto, segurança e praticidade
            </Subtitle>
      </Header>
      {loadingSchedules ? 
      <LoadAnimation /> 
       : 
      <Content>
        <Appointments>
          <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
          <AppointmentsQuantity>{cars?.length}</AppointmentsQuantity>
        </Appointments>

      <FlatList 
        data={cars.sort((a, b) => Number(b.id) - Number(a.id))} //Order by ascending
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
      </Content>
      }
    </Container>
  );
}