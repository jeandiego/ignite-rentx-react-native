import React, { useState } from 'react';
import { BackButton } from '~/components/BackButton';
import { StatusBar, Alert } from 'react-native';
import {useTheme} from 'styled-components';
import ArrowSvg from '~/assets/arrow.svg';
import {
  Container, 
  Header, 
  Title, 
  RentalPeriod, 
  DateInfo, 
  DateTitle, 
  DateValue, 
  DateValueBox, 
  Content, 
  Footer
} from './styles';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '~/components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import { getPlatformDate } from '~/utils/dateUtils';
import { CarDTO } from '~/dtos/CarDTO';
import { Button } from '~/components/Button';


export interface IRentalPeriod {
    startFormatted: string;
    endFormatted: string;
};


export function Scheduling() {
  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps)
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)
  const [rentalPeriod, setRentalPeriod] = useState<IRentalPeriod>({} as IRentalPeriod)
  const navigation = useNavigation();
  const theme = useTheme();
  const route = useRoute();
  const { car } = route.params as { car: CarDTO }
  
  const handleConfirmCar = () => {
    navigation.navigate('SchedulingDetails', { 
        car,
        dates: Object.keys(markedDates), 
        rentalPeriod  
    });
  };

  function handleChangeDate(date: DayProps){
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }

    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);

    const firstDate = Object.keys(interval)[0];
    const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy')
    });

  }

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

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValueBox selected={Boolean(rentalPeriod.startFormatted)}>
                      <DateValue> 
                      {rentalPeriod?.startFormatted}                     
                      </DateValue>
                    </DateValueBox>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATE</DateTitle>
                    <DateValueBox selected={Boolean(rentalPeriod.endFormatted)}>
                      <DateValue> 
                        {rentalPeriod?.endFormatted}                     
                      </DateValue>
                    </DateValueBox>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
          <Calendar 
            markedDates={markedDates}
            onDayPress={handleChangeDate}
          />
        </Content>

        <Footer>
          <Button title='Confirmar' enabled={!!rentalPeriod.startFormatted || !!rentalPeriod.endFormatted} onPress={handleConfirmCar} />
        </Footer>
    </Container>
  );
}