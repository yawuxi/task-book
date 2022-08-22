// react
import React from "react"
// additional functional
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
// components
import TodayInfo from "../../components/TodayInfo/TodayInfo"
import TodayFact from "../../components/TodayFact/TodayFact"
import ProgressChart from "../../components/ProgressChart/ProgressChart"
import { useAuthState } from 'react-firebase-hooks/auth'
import { useDocumentData } from 'react-firebase-hooks/firestore'
import { auth, firestoreDB } from "../../firebase"
import { updateDoc, setDoc, doc, getDoc } from "firebase/firestore"
import { uuidv4 } from "@firebase/util"
// import
// styles
import './UserPage.scss'
import imgTest from '../../images/test-image.png'

/**
 * TODO: feature: ability to change profile picture, nickname and email
*/

const UserPage: React.FC = () => {
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  // reset firestore database
  function onFirestoreReset() {
    getDoc(doc(firestoreDB, 'users', user!.uid))
      .then(data => {
        if (data.exists()) {
          updateDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            sidebarCategories: [
              { title: 'Дім', path: '/' },
            ],
            createTaskCategories: [],
            createTaskPriorities: [],
            taskItemTemplates: [],
            tasksList: [],
            tasksFinished: 0,
            tasksRemoved: 0,
          })
        } else {
          setDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            sidebarCategories: [
              { title: 'Дім', path: '/' },
            ],
            createTaskCategories: [],
            createTaskPriorities: [],
            taskItemTemplates: [],
            tasksList: [],
            tasksFinished: 0,
            tasksRemoved: 0,
          })
        }
      })
  }

  function onFirestoreFakeData() {
    getDoc(doc(firestoreDB, 'users', user!.uid))
      .then(data => {
        if (data.exists()) {
          updateDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            sidebarCategories: [
              { title: 'Дім', path: '/' },
            ],
            createTaskCategories: [],
            createTaskPriorities: [],
            taskItemTemplates: [],
            tasksList: [
              {
                task: 'testTask1',
                id: uuidv4(),
                category: 'Спорт',
                dateWillFinish: '2022-03-18',
                dateCreated: '2022-08-21',
                dateFinished: '',
                isComleted: false,
                priority: 'Ну таке',
              },
              {
                task: 'testTask2',
                id: uuidv4(),
                category: 'Спорт',
                dateWillFinish: '2022-03-18',
                dateCreated: '2022-08-21',
                dateFinished: '',
                isComleted: false,
                priority: 'Ну таке',
              },
              {
                task: 'testTask3',
                id: uuidv4(),
                category: 'Спорт',
                dateWillFinish: '2022-03-18',
                dateCreated: '2022-08-21',
                dateFinished: '',
                isComleted: false,
                priority: 'Ну таке',
              },
            ],
            tasksFinished: 0,
            tasksRemoved: 0,
          })
        } else {
          setDoc(doc(firestoreDB, 'users', user!.uid), {
            displayName: '',
            profilePicture: '',
            sidebarCategories: [
              { title: 'Дім', path: '/' },
            ],
            createTaskCategories: [],
            createTaskPriorities: [],
            taskItemTemplates: [],
            tasksList: [
              {
                task: 'testTask1',
                id: uuidv4(),
                category: 'Спорт',
                date: '2022-03-18',
                isComleted: false,
                priority: 'Ну таке',
              },
              {
                task: 'testTask2',
                id: uuidv4(),
                category: 'Спорт',
                date: '2022-03-18',
                isComleted: false,
                priority: 'Ну таке',
              },
              {
                task: 'testTask3',
                id: uuidv4(),
                category: 'Спорт',
                date: '2022-03-18',
                isComleted: false,
                priority: 'Ну таке',
              },
            ],
            tasksFinished: 0,
            tasksRemoved: 0,
          })
        }
      })
  }

  // username
  const username = userData?.displayName === '' || userData?.displayName === undefined ? user?.email : userData?.displayName

  return (
    <div className="main__content">
      <div className="main__left">
        <div className="user-page user-component">
          <div className="user-page__profile-picture">
            <img src={imgTest} alt="profile" />
            <p>змінити фото</p>
          </div>
          <Formik
            initialValues={{
              name: '',
              email: '',
            }}
            validationSchema={
              Yup.object().shape({
                name: Yup.string().min(3, "Мінімальна довжина імені 3 символи!"),
                email: Yup.string().email('Введіть правильний email'),
              })
            }
            onSubmit={values => {
              const { email, name } = values
              if (email === '' && name === '') {
                alert('Введіть дані')
              }

              // update username in firestore
              if (email === '' && name !== '') {
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  displayName: values.name
                })
              }
            }}
          >
            {({ errors, touched }) => (
              <Form className="user-page__user-data">
                <label>
                  <h3 className="user-page__title">Ваш нікнейм:</h3>
                  <Field name="name" type="text" placeholder={username} />
                  {errors.name && touched.name ? <div className="form-error">{errors.name}</div> : null}
                </label>
                <label>
                  <h3 className="user-page__title">Ваш пошта:</h3>
                  <Field name="email" type="text" placeholder="тут має бути поточний email" />
                  {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
                </label>
                <button type="submit" disabled={userDataLoading}>Зберігти зміни</button>
              </Form>
            )}
          </Formik>
        </div>
        <button onClick={onFirestoreReset}>Скинути вашу базу даних</button>
        <button onClick={onFirestoreFakeData}>Завантажити фейкові дані у вашу базу даних</button>
      </div>
      <div className="main__right">
        <TodayInfo />
        <TodayFact />
        {/* <ProgressChart /> */}
      </div>
    </div>
  )
}

export default UserPage
