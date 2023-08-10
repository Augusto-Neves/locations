import { FlatList, StyleSheet, View } from 'react-native';
import { PlaceItem } from './PlaceItem';

export function PlacesList({ places }) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallBackContainer}>
        <Text style={styles.fallBackText}>
          No places added yet - start adding one!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} onSelect={() => {}} />}
    />
  );
}

const styles = StyleSheet.create({
  fallBackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallBackText: {
    fontSize: 16,
  },
});