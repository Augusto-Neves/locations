import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { OutlinedButton } from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { useEffect, useState, useMemo } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getAddress } from '../../utils/location';

export function LocationPicker({ onPickLocation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };

      setPickedLocation(mapPickedLocation);
    }
  }, [route]);

  useEffect(() => {
    (async () => {
      if (pickedLocation) {
        const address = await getAddress(
          pickedLocation?.lat,
          pickedLocation?.lng
        );

        onPickLocation({ ...pickedLocation, address: address });
      }
    })();
  }, [pickedLocation, onPickLocation]);

  async function verifyPermissions() {
    if (
      locationPermissionInformation.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionRequest = await requestPermission();

      return permissionRequest.granted;
    }

    if (locationPermissionInformation.status === PermissionStatus.DENIED) {
      if (locationPermissionInformation.canAskAgain) {
        const permissionResponse = await requestPermission();

        return permissionResponse.granted;
      } else {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant location permissions to use this app.'
        );
        return false;
      }
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) return;

    const userLocation = await getCurrentPositionAsync();

    const location = userLocation && {
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    };

    setPickedLocation(location);
    onPickLocation(location);
  }

  async function pickOnTheMapHandler() {
    const initialRegion = await getCurrentPositionAsync();

    navigation.navigate('Map', {
      lat: initialRegion.coords.latitude,
      lng: initialRegion.coords.longitude,
    });
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  const region = useMemo(
    () => ({
      latitude: pickedLocation?.lat,
      longitude: pickedLocation?.lng,
      latitudeDelta: 0.0022,
      longitudeDelta: 0.0021,
    }),
    [pickedLocation, route]
  );

  if (pickedLocation) {
    locationPreview = (
      <MapView
        region={region}
        style={styles.mapPreviewImage}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
      >
        <Marker
          title="Your Location"
          coordinate={{
            latitude: pickedLocation?.lat,
            longitude: pickedLocation?.lng,
          }}
        />
      </MapView>
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnTheMapHandler}>
          Pick on map
        </OutlinedButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
