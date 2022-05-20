import React from 'react';
import { useWindowDimensions, StatusBar } from 'react-native';
import LogoSvg from '~/assets/logo_background_gray.svg';
import DoneSvg from '~/assets/done.svg';

import {
  Container,
  Content,
  Title,
  Message,
  Footer,
  LogoWrapper
} from './styles';
import { ConfirmButton } from '~/components/ConfirmButton';
import { useNavigation } from '@react-navigation/native';


export function SchedulingCompleted() {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();

  function handleConfirm(){
      navigation.navigate('Home')
    };
  
  return (
    <Container>
      <StatusBar 
        barStyle='light-content'
        translucent
        backgroundColor='transparent'
      />
        <LogoWrapper>
          <LogoSvg width={width} />
        </LogoWrapper>

        <Content>
            <DoneSvg width={80} height={80} />
            <Title>Carro alugado</Title>

            <Message>
                Agora você só precisa ir {'\n'}
                até a concessionária da RENTX {'\n'}
                pegar o seu automóvel.
            </Message>
        </Content>

        <Footer>
          <ConfirmButton title='OK' onPress={handleConfirm} />
        </Footer>

    </Container>
  );
}