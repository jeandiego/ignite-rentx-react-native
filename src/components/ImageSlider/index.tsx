import React, { useCallback, useRef, useState } from 'react';
import { FlatList, ViewToken } from 'react-native';

import {
    Container,ImageIndexes, ImageIndex, CarImageWrapper,CarImage
} from './styles';

interface Props {
    imagesUrl: string[];
}

interface IChangeImageProps {
    viewableItems: ViewToken[];
    changed: ViewToken[];
}

export function ImageSlider({ imagesUrl }: Props) {
    const [imageIndex, setImageIndex] = useState(0);

const onIndexChanged = useRef((info: IChangeImageProps) => {
    const index = info.viewableItems[0].index;
    setImageIndex(index);
})

const renderItem = useCallback(({item}) => {
    return  (
        <CarImageWrapper>
            <CarImage 
                source={{uri: item }}
                resizeMode='contain'
            />
        </CarImageWrapper>
    )
}, [])

  return (
      <Container>
        <ImageIndexes>
            {
                imagesUrl.map((_, index) => (
                    <ImageIndex 
                        key={String(index)}
                        active={index === imageIndex} 
                    />      
                ))
            }
        </ImageIndexes>
        <FlatList 
            data={imagesUrl}
            keyExtractor={key => key}
            renderItem={renderItem}
            horizontal
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onIndexChanged.current}
        />
    </Container>
  );
}