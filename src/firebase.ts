import * as firebase from 'firebase/app'
import {
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage } from 'firebase/storage'
import { useContext, useEffect } from 'react';
import { TaskBookContext } from './shared/context';
import { ACTION_TYPES } from './shared/actionTypes';
import { useSnackbar } from 'notistack';

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

const FirebaseConfig: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { userMethods: { SET_SIGN_IN, SET_SIGN_OUT, SET_SIGN_UP }, errors: { SET_ERROR } } = ACTION_TYPES

  useEffect(() => {
    dispatch({ type: SET_SIGN_IN, payload: signInUser })
    dispatch({ type: SET_SIGN_UP, payload: registrationNewUser })
    dispatch({ type: SET_SIGN_OUT, payload: signOutUser })
  }, [])

  function handleError(errorCode: string) {
    let errorMessage;
    switch (errorCode) {
      case 'auth/email-already-in-use':
        errorMessage = 'Це email вже використовується!'
        break;
      case 'auth/wrong-password':
        errorMessage = 'Невірний пароль або email!'
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Почекайте 10 хвилин!'
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Почекайте 10 хвилин!'
        break;
      default:
        errorCode = errorCode
        break;
    }

    enqueueSnackbar(errorMessage, {
      variant: 'error',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      }
    })
    dispatch({ type: SET_ERROR, payload: errorCode })
  }

  // registration method
  async function registrationNewUser(email: string, password: string) {
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
      .catch(error => {
        handleError(error.code)
      })
  }

  // login method
  async function signInUser(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        handleError(error.code)
      })
  }

  // sign out method
  function signOutUser() {
    signOut(auth)
      .then(() => {
        enqueueSnackbar('Ви вийшли!', {
          variant: 'success',
          autoHideDuration: 3000,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'right',
          }
        })
      })
  }

  return null
}

export default FirebaseConfig
