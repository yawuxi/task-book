import * as firebase from 'firebase/app'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, setDoc, getDoc, doc } from "firebase/firestore/lite";

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
export const firestoreDB = getFirestore()

// registration method
export async function registrationNewUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setDoc(doc(firestoreDB, 'users', user.uid), {
        displayName: '',
        profilePicture: '',
        sidebarCategories: [],
        createTaskCategories: [],
        createTaskPriorities: [],
        taskItemTemplates: [],
        tasksList: [],
      })
    })
}

// login method
export async function signInUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
    .then(getDataFromFirestoreDB)
}

export async function getDataFromFirestoreDB({ user }: { user: any }) {
  const docRef = doc(firestoreDB, 'users', user.uid)
  const docSnap = await getDoc(docRef)
  return docSnap.data();
}

// sign out method
export function signOutUser() {
  signOut(auth)
}
