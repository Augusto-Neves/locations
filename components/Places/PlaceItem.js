import { Image, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export function PlaceItem({ place, onSelect }) {
  return (
    <TouchableOpacity
      onPress={onSelect.bind(this, place.id)}
      activeOpacity={0.7}
      style={styles.item}
    >
      <Image source={{ uri: place.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{place?.title}</Text>
        <Text style={styles.address}>{place?.address}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
  },
  image: {
    flex: 1,
    borderBottomLeftRadius: 4,
    borderTopLeftRadius: 4,
    height: 100,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.gray700,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
});
