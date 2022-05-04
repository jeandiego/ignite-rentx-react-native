import React from 'react';
import GasolineSVG from '../../assets/gasoline.svg'
import {
  Container,
  Details,
  Brand,
  Name,
  About,
  Rent,
  Period,
  Price,
  Type,
  CarImage
} from './styles';

interface ICarProps {
  brand: string;
  name: string;
  rent: {
    period: string;
    price: number;
  },
  thumbnail: string;
}

interface IProps {
  data: ICarProps;
}

export function CardCar({ data } : IProps) {
  return (
    <Container>
      <Details>
        <Brand>{data.brand}</Brand>
        <Name>{data.name}</Name>

        <About>
          <Rent>
            <Period>{data.rent.period}</Period>
            <Price>{`R$ ${data.rent.price}`}</Price>
          </Rent>

          <Type>
            <GasolineSVG />
          </Type>

        </About>
      </Details>

      <CarImage source={{uri: data.thumbnail }}  resizeMode="contain" />

    </Container>
  );
}