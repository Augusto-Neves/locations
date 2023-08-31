import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../constants/colors';

export function Button({ onPress, children }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activityOpacity={0.7}
      style={styles.button}
    >
      <Text style={styles.text}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginHorizontal: 4,
    marginTop: 24,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowRadius: 2,
    borderRadius: 4,
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
});
