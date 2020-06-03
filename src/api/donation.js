import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export async function createDonation(values, user) {
  const firestore = firebase.firestore();
  console.log(user);
  try {
    await firestore.collection('donations').add({
      location: values.location,
      donnerId: user.uid,
      donner: user.displayName,
      donnerEmail: user.email,
      status: 'registered'
    });
  } catch (e) {
    console.log(e);
    throw new Error('Hubo un error creando la donación');
  }
}
