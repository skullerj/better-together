import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const facebookProvider = new firebase.auth.FacebookAuthProvider();

const TransaltedCodes = {
  'auth/user-not-found': 'No existe un usuario con ese email',
  'auth/wrong-password': 'Email o contraseña incorrectos',
  'auth/too-many-requests': 'Demasiados intentos seguidos. Intenta más tarde',
  'auth/email-already-in-use': 'Ya existe un usuario con ese email.',
  'auth/invalid-phone-number': 'Ese no es un número de celular válido',
  'auth/invalid-verification-code':
    'El código de verificación no es correcto. Intenta nuevamente.',
  'auth/code-expired':
    'El código de verificación caducó. Intenta enviando el mensaje nuevamente.',
  'auth/popup-closed-by-user.':
    'Cerraste la ventana de autenticación de Facebook'
};

const translateErrorCode = code =>
  TransaltedCodes[code]
    ? TransaltedCodes[code]
    : `Unknown error code ${code}. Check api/auth and add the appropiate error code`;

export function listenStateChanges(callback) {
  const auth = firebase.auth();
  auth.onAuthStateChanged(user => {
    callback(user);
  });
}

export async function loginWithFacebook() {
  const auth = firebase.auth();
  try {
    return await auth.signInWithPopup(facebookProvider);
  } catch (e) {
    throw new Error(translateErrorCode(e.code));
  }
}

export async function getUserProfile(uid) {
  const firestore = firebase.firestore();
  const userSnap = await firestore
    .collection('profiles')
    .doc(uid)
    .get();
  if (userSnap.exists) {
    return await userSnap.data();
  } else {
    const newProfile = { role: 'user' };
    await firestore
      .collection('profiles')
      .doc(uid)
      .set(newProfile);
    return newProfile;
  }
}

export async function logout() {
  const auth = firebase.auth();
  return await auth.signOut();
}
