import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { CarDTO } from '../../dtos/CarDTO';
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

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const { car } = route.params as Params

  const handleConfirmCar = () => {
    navigation.navigate('Scheduling');
  };

  return (
    <Container>
        <Header>
            <BackButton onPress={navigation.goBack} color='blue' />
        </Header>

        <CarImages>
          <ImageSlider imagesUrl={car.photos} />
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
          <Button title="Escolher período do aluguel" onPress={handleConfirmCar} />
        </Footer>

    </Container>
  );
}