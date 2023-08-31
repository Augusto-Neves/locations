import { useCallback, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { ImagePicker } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { Button } from '../UI/Button';

export function PlaceForm() {
  const [title, setTitle] = useState('');
  const [takenImage, setTakenImage] = useState();
  const [pickedLocation, setPickedLocation] = useState();

  function changeTitleHandler(enteredText) {
    setTitle(enteredText);
  }

  function takeImageHandler(imageUri) {
    setTakenImage(imageUri);
  }

  const pickedLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    console.log(title);
    console.log(takenImage);
    console.log(pickedLocation);
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          onChangeText={changeTitleHandler}
          value={title}
          style={styles.input}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickedLocationHandler} />
      <Button onPress={savePlaceHandler}>Add place</Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
