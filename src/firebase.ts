import * as firebase from 'firebase/app'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth'

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})

export const auth = getAuth()

onAuthStateChanged(auth, user => {
  if (user) {
    console.log('user logged!');
    console.log(user);
  } else {
    console.log('user logged out!');
  }
})

// registration method
export function registrationNewUser(email: string, password: string) {
  createUserWithEmailAndPassword(auth, email, password)
}

// login method
export function signInUser(email: string, password: string) {
  signInWithEmailAndPassword(auth, email, password)
}

// sign out method
export function singOutUser() {
  signOut(auth)
}
