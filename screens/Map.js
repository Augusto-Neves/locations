import MapView, { Marker } from 'react-native-maps';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import { IconButton } from '../components/UI/IconButton';

export function MapScreen({ navigation, route }) {
  const previousScreen = route.params.previousScreen;
  const region = {
    latitude: route.params.lat,
    longitude: route.params.lng,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  };

  const [selectedLocation, setSelectedLocation] = useState({
    lat: region.latitude,
    lng: region.longitude,
  });

  function selectLocationHandler(event) {
    if (previousScreen) return;
    
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat, lng });
  }

  const savePickedLocation = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location Picked',
        'You have to pick a location (by typing on the map) first!'
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) =>
        !previousScreen && (
          <IconButton
            color={tintColor}
            icon="save"
            size={24}
            onPress={savePickedLocation}
          />
        ),
    });
  }, [navigation, savePickedLocation]);

  return (
    <MapView
      initialRegion={region}
      onPress={selectLocationHandler}
      style={styles.map}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation?.lat,
            longitude: selectedLocation?.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});
