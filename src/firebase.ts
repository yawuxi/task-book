import * as firebase from 'firebase/app'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage } from 'firebase/storage'

// firebase initialize
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
})

// firebase authentication, firestore, storage
export const auth = getAuth()
export const firestoreDB = getFirestore()
export const storage = getStorage(app)

// registration method
export async function registrationNewUser(email: string, password: string) {
  await createUserWithEmailAndPassword(auth, email, password)
    .then(({ user }) => {
      setDoc(doc(firestoreDB, 'users', user.uid), {
        displayName: '',
        profilePicture: '',
        pages: [
          {
            title: 'Дім',
            path: '/',
            createTaskCategories: [],
            createTaskPriorities: [],
            taskItemTemplates: [],
            tasksList: [],
            tasksFinished: 0,
            tasksRemoved: 0,
          }
        ],
      })
    })
}

// login method
export async function signInUser(email: string, password: string) {
  await signInWithEmailAndPassword(auth, email, password)
}

// sign out method
export function signOutUser() {
  signOut(auth)
}
