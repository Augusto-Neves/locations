import { Image, TouchableOpacity, View, StyleSheet } from 'react-native';

export function PlaceItem({ place, onSelect }) {
  return (
    <TouchableOpacity onPress={onSelect} activeOpacity={0.7}>
      <Image source={{ uri: place.imageUrl }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  
})