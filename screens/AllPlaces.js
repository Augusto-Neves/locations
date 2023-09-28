import { useEffect, useState } from 'react';
import { PlacesList } from '../components/Places/PlacesList';
import { useIsFocused } from '@react-navigation/native';
import { fetchPlaces } from '../utils/database';

export function AllPlaces({ route }) {
  const [loadedPlaces, setLoadedPlaces] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadedPlaces() {
      const places = await fetchPlaces();
      setLoadedPlaces(places);
    }

    if (isFocused) {
      loadedPlaces();
    }
  }, [isFocused]);

  return <PlacesList places={loadedPlaces} />;
}
