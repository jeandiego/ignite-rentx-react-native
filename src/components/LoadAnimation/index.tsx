import AnimatedLottieView from 'lottie-react-native';
import React from 'react';
import styled from 'styled-components/native';
import loadingCar from '~/animations/car.json'

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export function LoadAnimation() {
  return (
    <Container>
      <AnimatedLottieView
        source={loadingCar}
        autoPlay
        loop
        resizeMode='contain'
        style={{
          width: 180,
          height: 180,
        }}
      />
    </Container>
  );
}




