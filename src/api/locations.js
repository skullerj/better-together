import firebase from 'firebase/app';
import 'firebase/firestore';

export async function loadLocations() {
  const firestore = firebase.firestore();
  try {
    const locations = await firestore.collection('locations').get();
    if (locations.empty) return [];
    return locations.docs.map(doc => {
      const data = doc.data();
      return {
        name: data.name,
        position: {
          lat: data.position.latitude,
          lng: data.position.longitude
        }
      };
    });
  } catch (e) {
    throw new Error('Hubo un error obteniendo las colecciones');
  }
}
