import { StyleSheet, View, Alert, Image, Text } from 'react-native';
import { OutlinedButton } from '../UI/OutlinedButton';
import { Colors } from '../../constants/colors';
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
  PermissionStatus,
} from 'expo-location';
import { getMapPreview } from '../../utils/location';
import { useState } from 'react';

export function LocationPicker() {
  const [pickedLocation, setPickedLocation] = useState();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

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
    setPickedLocation({
      lat: userLocation.coords.latitude,
      lng: userLocation.coords.longitude,
    });
  }

  function pickOnTheMapHandler() {}

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        source={{
          uri: getMapPreview(pickedLocation?.lat, pickedLocation?.lng),
        }}
        style={styles.mapPreviewImage}
      />
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
  },
  mapPreviewImage: {
    width: '100%',
    height: '100%',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});