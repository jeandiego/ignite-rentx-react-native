import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { useTheme } from 'styled-components';
import { Accessory } from '../../components/Accessory';
import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { ImageSlider } from '../../components/ImageSlider';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/iconUtils';
import {
  About, Accessories, Brand,
  CarImages,
  Container,
  Description,
  Details, Footer, Header,
  Name, Period,
  Price, Rent
} from './styles';

interface Params {
  car: CarDTO;
}

export function CarDetails() {
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();
  const { car } = route.params as Params

  const handleConfirmCar = () => {
    navigation.navigate('Scheduling', { car });
  };

  const scrollY = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y,
    console.log(event.contentOffset.y)
  });

  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      )
    }
  })

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 150],
        [1, 0],
        Extrapolate.CLAMP
      )
    }
  })

  return (
    <Container>
      <StatusBar barStyle='dark-content' translucent backgroundColor="transparent" />
        <Animated.View style={[headerStyleAnimation, styles.header,
          { backgroundColor: theme.colors.background_secondary }
        ]}>
          <Header style={{ zIndex: 2 }}>
            <BackButton onPress={navigation.goBack} color='blue' />
          </Header>

          <Animated.View style={[sliderCarsStyleAnimation]}>
            <CarImages>
              <ImageSlider imagesUrl={car.photos} />
            </CarImages>
          </Animated.View>

        </Animated.View>

        <Animated.ScrollView 
          contentContainerStyle={{
            paddingHorizontal: 24,
            paddingTop: getStatusBarHeight() + 160,
          }}
          showsVerticalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          bounces={false}
        >
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
          <About>
            {car.about}
          </About>
        </Animated.ScrollView>

        <Footer>
          <Button title="Escolher per??odo do aluguel" onPress={handleConfirmCar} />
        </Footer>

    </Container>
  );
}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1,
  },
})