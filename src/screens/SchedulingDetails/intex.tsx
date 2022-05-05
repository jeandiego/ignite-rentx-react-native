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



interface RentalPeriod{
  start: string;
  end: string;
}


export function SchedulingDetails() {
  const [loading, setLoading] = useState(false);
  const car = {
    brand: 'Audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'AO DIA',
      price: 120,
    },
    thumbnail: 'https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true',
    accessories: [
      {
        name: '380KM/h',
        type: 'speed',
    },
    {
        name: '3.2s',
        type: 'acceleration',
    },
    {
        name: '800 HP',
        type: 'turning_diameter',
    },
    {
        name: 'Gasolina',
        type: 'gasoline_motor',
    },
    {
        name: 'Auto',
        type: 'exchange',
    },
    {
        name: '2 pessoas',
        type: 'seats',
    }
    ],
    about: 'Qualquer texto vai aqui para descrever o sobre esse carro aleatorio'
  }

  async function handleConfirmRental(){
  };

  function handleBack(){
    // navigation.goBack();
  };

  // useEffect(()=>{
  //   setRentalPeriod({
  //     start: format(getPlatformDate(new Date(dates[0])), "dd/MM/yyyy"),
  //     end: format(getPlatformDate(new Date(dates[dates.length -1])), "dd/MM/yyyy"),
  // })},[])

  return (
    <Container>
        <Header>
            <BackButton onPress={handleBack} color={'blue'} />
        </Header>

        <CarImages>
          <ImageSlider imagesUrl={['https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true']} />
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
              <DateValue>14/02/2022</DateValue>
            </DateInfo>

            <Feather 
                name='chevron-right'
                size={RFValue(20)}
                color={theme.colors.text}
              />

            <DateInfo>
              <DateTitle>ATÉ</DateTitle>
              <DateValue>18/02/2022</DateValue>
            </DateInfo>
          </RentalPeriod>

          <RentalPrice>
            <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
              <RentalPriceQuota>{`R$ ${'2.900'} x ${'24'} diárias` }</RentalPriceQuota>
              <RentalPriceTotal> R$ 2.900,00 </RentalPriceTotal>
            </RentalPriceDetails>
          </RentalPrice>

        </Content>

        <Footer>
          <Button 
            title="Alugar agora" 
            onPress={handleConfirmRental} 
            color={theme.colors.success} 
            enabled={!loading}
            loading={loading} 
          />
        </Footer>

    </Container>
  );
}