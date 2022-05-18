import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { RFValue } from 'react-native-responsive-fontsize';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import theme from '../../styles/theme';
import { Accessory } from '../../components/Accessory';
import { getAccessoryIcon } from '../../utils/iconUtils';
import { 
   Acessories,
   Brand,
   CalendarIcon,
   CarImages,
   Container,
   Content,
   DateInfo,
   DateTitle,
   DateValue,
   Description,
   Details,
   Footer,
   Header,
   Name,
   Period,
   Price,
   Rent,
   RentalPeriod,
   RentalPrice,
   RentalPriceDetails,
   RentalPriceLabel,
   RentalPriceQuota,
   RentalPriceTotal
 } from './styles';
import { ImageSlider } from '../../components/ImageSlider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CarDTO } from '../../dtos/CarDTO';
import { IRentalPeriod } from '../Scheduling';
import { api } from '../../api/api';
import { Alert } from 'react-native';
import useAsync from '../../hooks/useAsync';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';



interface RentalPeriod{
  start: string;
  end: string;
}

interface IParams {
  car: CarDTO,
  dates: string[]
  rentalPeriod: IRentalPeriod;
}


export function SchedulingDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car, dates, rentalPeriod } = route.params as IParams;

  const { loading: scheduleLoading, call: handleConfirmRental } = useAsync(
    async () => {
      try {
        const schedulesByCar = await api.get(`/schedules_bycars/${car.id}`);
        const unavailable_dates = [
          ...schedulesByCar.data.unavailable_dates,
          ...dates,
        ]
        await api.put(`/schedules_bycars/${car.id}`, {
          id: car.id,
          unavailable_dates
        })

        navigation.navigate('SchedulingCompleted')
      } catch (error) {
        console.warn(error);
        Alert.alert('Não foi possível confirmar seu agendamentio')
      }
    },
    [],
  );

  const totalRent = dates.length * car.rent.price;

  return (
    <Container>
        <Header>
            <BackButton onPress={navigation.goBack} color={'blue'} />
        </Header>

        <CarImages>
          <ImageSlider imagesUrl={car.photos} />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand> {car.brand} </Brand>
              <Name> {car.name} </Name>
            </Description>

            <Rent>
              <Period>{car.rent.period} </Period>
              <Price>RS {car.rent.price} </Price>
            </Rent>
          </Details>

          <Acessories>
            {
              car.accessories.map(accessory => (
                <Accessory key={accessory.type} name={accessory.name} icon={getAccessoryIcon(accessory.type)} />
              ))
            }
          </Acessories>

          <RentalPeriod>
            <CalendarIcon>
              <Feather 
                name='calendar'
                size={RFValue(24)}
                color={theme.colors.shape}
              />
            </CalendarIcon>
            <DateInfo>
              <DateTitle>DE</DateTitle>
              <DateValue>{rentalPeriod.startFormatted}</DateValue>
            </DateInfo>

            <Feather 
                name='chevron-right'
                size={RFValue(20)}
                color={theme.colors.text}
              />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>{rentalPeriod.endFormatted}</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${car.rent.price} x ${dates.length} diárias` }</RentalPriceQuota>
              <RentalPriceTotal> R$ {totalRent} </RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

        </Content>

        <Footer>
          <Button 
            title="Alugar agora" 
            onPress={handleConfirmRental} 
            color={theme.colors.success}
            enabled={!scheduleLoading}
            loading={scheduleLoading} 
          />
        </Footer>

    </Container>
  );
}