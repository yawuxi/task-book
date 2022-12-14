// react
import React, { useEffect, useState } from "react"
// additional functional
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { useUploadFile, useDownloadURL } from 'react-firebase-hooks/storage';
import { auth, firestoreDB, storage } from "../../firebase"
import { updateDoc, setDoc, doc, getDoc } from "firebase/firestore"
import { ref } from "firebase/storage"
import { uuidv4 } from "@firebase/util"
import { useSnackbar } from "notistack"
// components
import TodayInfo from "../../components/TodayInfo/TodayInfo"
import TodayFact from "../../components/TodayFact/TodayFact"
import Loading from "../../components/UI/Loading/Loading"
// styles
import './UserPage.scss'

const UserPage: React.FC = () => {
  // hooks
  const [profilePicture, setProfilePicture] = useState<File | null>(null)
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))
  const [
    uploadProfilePictrue,
    profilePictrueUploading,
    profilePictrueSnapshot,
    profilePictrueError,
  ] = useUploadFile();
  const [
    profilePictureLink,
    profilePictureLoading,
    profilePictureDownloadError,
  ] = useDownloadURL(ref(storage, `user-images/${user?.uid}/user-profile-picture`));
  const { enqueueSnackbar } = useSnackbar();

  // effects
  useEffect(() => {
    onProfilePictureUpload()
  }, [profilePicture])

  // images user directory ref
  const imageRef = ref(storage, `user-images/${user?.uid}/user-profile-picture`)

  // reset firestore database
  function onFirestoreReset() {
    getDoc(doc(firestoreDB, 'users', user!.uid))
      .then(data => {
        if (data.exists()) {
          updateDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            pages: [
              {
                title: '??????',
                path: '/',
                createTaskCategories: [],
                createTaskPriorities: [],
                taskItemTemplates: [],
                tasksList: [],
                tasksRemoved: 0,
              }
            ],
          })
        } else {
          setDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            pages: [
              {
                title: '??????',
                path: '/',
                createTaskCategories: [],
                createTaskPriorities: [],
                taskItemTemplates: [],
                tasksList: [],
                tasksRemoved: 0,
              }
            ],
          })
        }
      })
  }

  // load firestore fake data
  function onFirestoreFakeData() {
    getDoc(doc(firestoreDB, 'users', user!.uid))
      .then(data => {
        if (data.exists()) {
          updateDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            pages: [
              {
                title: '??????',
                path: '/',
                createTaskCategories: [],
                createTaskPriorities: [],
                taskItemTemplates: [],
                tasksList: [
                  {
                    task: 'testTask1',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                  {
                    task: 'testTask2',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                  {
                    task: 'testTask3',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                ],
                tasksRemoved: 0,
              }
            ],
          })
        } else {
          setDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            pages: [
              {
                title: '??????',
                path: '/',
                createTaskCategories: [],
                createTaskPriorities: [],
                taskItemTemplates: [],
                tasksList: [
                  {
                    task: 'testTask1',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                  {
                    task: 'testTask2',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                  {
                    task: 'testTask3',
                    id: uuidv4(),
                    category: '??????????',
                    dateWillFinish: '2022-03-18',
                    dateCreated: '2022-08-28',
                    dateFinished: '',
                    isCompleted: false,
                    // priority: '???? ????????',
                  },
                ],
                tasksRemoved: 0,
              }
            ],
          })
        }
      })
  }

  // load profile pictrue in firebase storage
  async function onProfilePictureUpload() {
    if (profilePicture) {
      await uploadProfilePictrue(imageRef, profilePicture, {
        contentType: 'image/png',
      })
      window.location.reload()
    }
  }

  // username
  const username = userData?.displayName === '' || userData?.displayName === undefined ? user?.email : userData?.displayName

  return (
    <div className="main__content">
      <div className="main__left">
        <div className="user-page user-component">
          <div className="user-page__profile-picture">
            {
              profilePictureDownloadError ? <svg width="100" height="100" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 15.75V14.25C15 13.4544 14.6839 12.6913 14.1213 12.1287C13.5587 11.5661 12.7956 11.25 12 11.25H6C5.20435 11.25 4.44129 11.5661 3.87868 12.1287C3.31607 12.6913 3 13.4544 3 14.25V15.75" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M9 8.25C10.6569 8.25 12 6.90685 12 5.25C12 3.59315 10.6569 2.25 9 2.25C7.34315 2.25 6 3.59315 6 5.25C6 6.90685 7.34315 8.25 9 8.25Z" stroke="#282846" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>

                :
                profilePictrueUploading || profilePictureLoading
                  ?
                  <Loading styles={{ width: '100px', height: '100px' }} />
                  :
                  <img src={profilePictureLink} alt="profile" />
            }
            <input type="file" id="user-page-upload-picture" hidden onChange={e => setProfilePicture(e.target.files![0])} />
            <label htmlFor="user-page-upload-picture">?????????????? ????????</label>
          </div>
          <Formik
            initialValues={{
              name: '',
              email: '',
            }}
            validationSchema={
              Yup.object().shape({
                name: Yup.string().min(3, "???????????????????? ?????????????? ?????????? 3 ??????????????!").required('?????????????? ???????? ????`?? ?????? ??????????????'),
                email: Yup.string().email('?????????????? ???????????????????? email'),
              })
            }
            onSubmit={values => {
              const { email, name } = values

              // update username in firestore
              if (email === '' && name !== '') {
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  displayName: values.name
                })
                  .then(() => enqueueSnackbar('???????????????????????? ??????????????????!', {
                    autoHideDuration: 3000,
                    variant: "success"
                  }))
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="user-page__user-data">
                <label>
                  <h3 className="user-page__title">?????? ??????????????:</h3>
                  <Field name="name" type="text" placeholder={username} />
                  {errors.name && touched.name ? <div className="form-error">{errors.name}</div> : null}
                </label>
                <label>
                  <h3 className="user-page__title">?????? ??????????:</h3>
                  <Field name="email" type="text" placeholder="?????? ?????? ???????? ???????????????? email" />
                  {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
                </label>
                <button type="submit" disabled={userDataLoading}>???????????????? ??????????</button>
              </Form>
            )}
          </Formik>
        </div>
        {/* <button onClick={onFirestoreReset}>?????????????? ???????? ???????? ??????????</button>
        <button onClick={onFirestoreFakeData}>?????????????????????? ?????????????? ???????? ?? ???????? ???????? ??????????</button> */}
      </div>
      <div className="main__right">
        <TodayInfo />
        <TodayFact />
      </div>
    </div>
  )
}

export default UserPage
