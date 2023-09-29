import { Image, ScrollView, Text, View, StyleSheet } from 'react-native';
import { OutlinedButton } from '../components/UI/OutlinedButton';
import { Colors } from '../constants/colors';
import { useEffect, useState } from 'react';
import { fetchPlaceDetails } from '../utils/database';

export function PlaceDetails({ route, navigation }) {
  const [selectedPlace, setSelectedPlace] = useState({});
  const selectedPlaceId = route.params.placeId;

  function showOnMapHandler() {
    navigation.navigate('Map', {
      lat: selectedPlace.lat,
      lng: selectedPlace.lng,
      previousScreen: 'PlaceDetails',
    });
  }

  useEffect(() => {
    (async () => {
      const data = await fetchPlaceDetails(selectedPlaceId);

      setSelectedPlace(data);

      navigation.setOptions({
        title: data.title,
      });
    })();
  }, [selectedPlaceId]);

  if (!selectedPlace) {
    return (
      <View style={styles.fallback}>
        <Text style={styles.fallbackText}>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedPlace.imageUrl }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <OutlinedButton icon="map" onPress={showOnMapHandler}>
          View on Map
        </OutlinedButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    color: Colors.primary500,
    fontWeight: 'bold',
    fontSize: 16,
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
  },
  locationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    padding: 20,
  },
  address: {
    color: Colors.primary500,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
