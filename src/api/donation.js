import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export async function createDonation(values, user) {
  const firestore = firebase.firestore();
  try {
    await firestore.collection('donations').add({
      description: values.description,
      location: values.location,
      donnerId: user.uid,
      donner: user.displayName,
      donnerEmail: user.email,
      status: 'registered',
      createdAt: new Date()
    });
  } catch (e) {
    throw new Error('Hubo un error creando la donación');
  }
}

export async function getMyDonations(uid) {
  const firestore = firebase.firestore();
  try {
    const donationsSnaps = await firestore
      .collection('donations')
      .where('donnerId', '==', uid)
      .orderBy('createdAt', 'desc')
      .get();
    return donationsSnaps.docs.map(doc => {
      const d = doc.data();
      return { id: doc.id, ...d, createdAt: d.createdAt.toDate() };
    });
  } catch (e) {
    throw new Error('Hubo un error consultando las donaciones');
  }
}

export async function getAdminDonations() {
  const firestore = firebase.firestore();
  try {
    const donationsSnaps = await firestore
      .collection('donations')
      .where('status', 'in', ['registered', 'received'])
      .orderBy('createdAt', 'desc')
      .get();
    return donationsSnaps.docs.map(doc => {
      const d = doc.data();
      return { id: doc.id, ...d, createdAt: d.createdAt.toDate() };
    });
  } catch (e) {
    console.log(e);
    throw new Error('Hubo un error consultando las donaciones');
  }
}

export async function updateDonation(uid, updates) {
  const firestore = firebase.firestore();
  try {
    await firestore
      .collection('donations')
      .doc(uid)
      .update(updates);
  } catch (e) {
    console.log(e);
    throw new Error('Hubo un error consultando las donaciones');
  }
}
