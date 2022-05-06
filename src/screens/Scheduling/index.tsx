import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { StatusBar, Alert } from 'react-native';
import {useTheme} from 'styled-components';
import ArrowSvg from '../../assets/arrow.svg';
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
import { Button } from '../../components/Button';
import { Calendar, DayProps, generateInterval, MarkedDateProps } from '../../components/Calendar';
import { useNavigation } from '@react-navigation/native';


interface RentalPeriod{
    startFormatted: string;
    endFormatted: string;
};



export function Scheduling() {
  const navigation = useNavigation();
  const theme = useTheme();

  const handleConfirmCar = () => {
    navigation.navigate('SchedulingDetails');
  };

  function handleChangeDate(date: DayProps){
  }

  return (
    <Container>
      <StatusBar barStyle='light-content' translucent backgroundColor="transparent" />
        <Header>
            <BackButton onPress={navigation.goBack} color={theme.colors.shape} />
            <Title>
                Escolha uma {'\n'}
                data de início e {'\n'}
                fim do aluguel 
            </Title>

            <RentalPeriod>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValueBox selected={false}>
                      <DateValue> 
                        18/04/2022                      
                      </DateValue>
                    </DateValueBox>
                </DateInfo>

                <ArrowSvg />

                <DateInfo>
                    <DateTitle>ATE</DateTitle>
                    <DateValueBox selected={false}>
                      <DateValue> 
                        18/04/2022                      
                      </DateValue>
                    </DateValueBox>
                </DateInfo>
            </RentalPeriod>
        </Header>

        <Content>
          <Calendar 
            // markedDates={markedDates}
            onDayPress={handleChangeDate}
          />
        </Content>

        <Footer>
          <Button title='Confirmar' enabled={false} onPress={handleConfirmCar} />
        </Footer>
    </Container>
  );
}