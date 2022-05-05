import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { getAccessoryIcon } from '../../utils/iconUtils';
import {
   Brand,
    CarImages,
    Container,
    Content,
    Description,
    Details,
    Header,
    Name,
    Rent,
    Period,
    Price,
    Accessories,
    About,
    Footer,
  } from './styles';

export function CarDetails() {
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

  return (
    <Container>
        <Header>
            <BackButton onPress={() => {}} color='blue' />
        </Header>

        <CarImages>
          <ImageSlider imagesUrl={['https://www.webmotors.com.br/imagens/prod/348415/AUDI_RS5_2.9_V6_TFSI_GASOLINA_SPORTBACK_QUATTRO_STRONIC_34841510442727128.webp?s=fill&w=236&h=135&q=70&t=true']} />
        </CarImages>

        <Content>
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period} </Period>
              <Price>R$ {car.rent.price}</Price>
            </Rent>
          </Details>

          <Accessories>
            {
              car.accessories.map(acessory => (
                <Accessory 
                  key={acessory.type}
                  name={acessory.name} 
                  icon={getAccessoryIcon(acessory.type)} />
              ))
            }
          </Accessories>

          <About>{car.about}</About>
        </Content>

        <Footer>
          <Button title="Escolher período do aluguel" onPress={() => {}} />
        </Footer>

    </Container>
  );
}