import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { api } from '~/api/api';
import Logo from '~/assets/logo.svg';
import { CardCar } from '~/components/CardCar';
import { CarDTO } from '~/dtos/CarDTO';
import useAsync from '~/hooks/useAsync';
import {
  CarList, Container,
  Header, HeaderContent, TotalCars
} from './styles';

export function Home({...props}) {
  const [cars, setCars] = useState<CarDTO[]>([]);
  const navigation = useNavigation();
  const theme = useTheme();

  const handleCarDetails = (car: CarDTO) => {
    navigation.navigate('CarDetails', { car })
  }

  const handleOpenMyCars = () => {
    navigation.navigate('MyCars');
  };

   const renderItem = useCallback(({ item }) => {
    return <CardCar data={item} onPress={() => handleCarDetails(item)} />
  }, [])

  const { loading: loadingCars, call: fetchCars } = useAsync(
    async () => {
      try {
      const response = await api.get('/cars')
      setCars(response.data);
      } catch (error) {
        console.warn(error);
      }
    },
    [],
  );

  const ButtonAnimated = Animated.createAnimatedComponent(TouchableOpacity);

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value}
      ]
    }
  })

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, context: any){
      context.positionX = positionX.value;
      context.positionY = positionY.value;
    },
    onActive(event, context: any){
      positionX.value = context.positionX + event.translationX
      positionY.value = context.positionY + event.translationY
    },
    onEnd() {
      positionX.value = withSpring(0)
      positionY.value = withSpring(0)
    },
  })

  useEffect(() => {
    fetchCars();
  }, [])

  return (
    <Container {...props}>
      <StatusBar 
        barStyle="light-content"
        backgroundColor='transparent'
        translucent
      />
      <Header>
        <HeaderContent>
        <Logo width={RFValue(108)} height={RFValue(12)} />
        <TotalCars>
          Total de {cars.length} carros
        </TotalCars>
        </HeaderContent>
      </Header>
        <CarList 
          data={cars}
          keyExtractor={item => String(item.id)}
          renderItem={renderItem}
          onRefresh={fetchCars}
          refreshing={loadingCars}
        />
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[myCarsButtonStyle, {
            position: 'absolute',
            bottom: 13,
            right: 22,
          }]}
        >
          <ButtonAnimated 
            onPress={handleOpenMyCars} 
            style={[styles.button, { backgroundColor: theme.colors.main }]}
          >
            <Ionicons 
              name="ios-car-sport" 
              size={32} 
              color={theme.colors.shape} />
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  }
})