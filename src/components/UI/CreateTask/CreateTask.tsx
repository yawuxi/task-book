// react
import React, { useContext, useEffect, useState } from "react"
// additional functional
import { TaskBookContext } from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'
import dayjs from "dayjs";
import { updateDoc, doc } from "firebase/firestore";
import { firestoreDB, auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { closeModal } from "../ModalTextWindow/ModalTextWindow"
import { uuidv4 } from "@firebase/util";
import { Category } from "../../../types/Category";
// components
// styles
import './CreateTask.scss'

// setting minimal date to date input
function getCurrentDate(): string {
  const day = dayjs().date().toString().length < 2 ? `0${dayjs().date()}` : dayjs().date().toString()
  const month = (dayjs().month() + 1).toString().length < 2 ? `0${dayjs().month() + 1}` : dayjs().month() + 1
  const year = dayjs().year()
  const date = `${year}-${month}-${day}`

  return date
}

const CreateTask: React.FC = () => {
  const [minDate, setMinDate] = useState('')
  const { dispatch } = useContext(TaskBookContext)
  const [user] = useAuthState(auth)
  const [userData, userDataLoading, userDataError] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  // destructuring
  const {
    modals: {
      createTask: { TOGGLE_CREATE_TASK },
      modalTextWindow: { TOGGLE_TEXT_MODAL }
    },
  } = ACTION_TYPES

  // effects
  useEffect(() => {
    setMinDate(getCurrentDate())
  }, [])

  return (
    <div className="create-task" onClick={(e) => closeModal(e, dispatch, TOGGLE_CREATE_TASK)}>
      <div className="create-task__content user-component">
        <Formik
          initialValues={{
            task: '',
            category: '',
            date: '',
            priority: '',
            actionType: '',
          }}
          validationSchema={
            yup.object().shape({
              task: yup.string().min(5, 'Мінімальна довжина задачі 5 символів!').required('Напишіть задачу!'),
              category: yup.string().required('Вкажіть категорію!'),
              date: yup.string().required('Вкажіть дату!'),
              priority: yup.string().required('Вкажіть приіорітет!'),
            })
          }
          onSubmit={
            (values) => {
              updateDoc(doc(firestoreDB, 'users', user!.uid), {
                pages: userData?.pages.map((item: Category) => {
                  if (`/${item.path}` === window.location.pathname || item.path === window.location.pathname) {
                    return {
                      ...item,
                      tasksList: [
                        ...item.tasksList,
                        {
                          task: values.task,
                          id: uuidv4(),
                          category: values.category,
                          dateWillFinish: values.date,
                          dateCreated: dayjs().format('YYYY-MM-DD'),
                          dateFinished: '',
                          isComleted: false,
                          priority: values.priority,
                        }
                      ]
                    }
                  } else {
                    return item
                  }
                }
                ),
              })
            }
          }
        >
          {({ values, errors, touched, handleSubmit }) => (
            <>
              <header>
                <h3 className="create-task__title h3-title">Добавить новую задачу</h3>
              </header>
              <Form>
                <h4 className="create-task__small-title">Що потрібно зробити</h4>
                {errors.task && touched.task ? <div className="form-error">{errors.task}</div> : null}
                <Field className="create-task__task-input modal-field-styles" name="task" type="text" placeholder="Приготувати вечерю" />
                <ul className="create-task-info">
                  <li className="create-task-info__item">
                    <h4 className="create-task__small-title">Категорія</h4>
                    <Field className="create-task-info__input modal-field-styles" name="category" placeholder="Вибрати" as="select">
                      <option value=""></option>
                      <option value="Без категорії">Без категорії</option>
                      <option value="Спорт">Спорт</option>
                    </Field>
                    {errors.category && touched.category ? <div className="form-error">{errors.category}</div> : null}
                  </li>
                  <li className="create-task-info__item">
                    <h4 className="create-task__small-title">Коли</h4>
                    <Field
                      className="create-task-info__input modal-field-styles"
                      name="date"
                      type="date"
                      min={minDate}
                      placeholder="тут буде календар" />
                    {errors.date && touched.date ? <div className="form-error">{errors.date}</div> : null}
                  </li>
                  <li className="create-task-info__item">
                    <h4 className="create-task__small-title">Приорітет задачі</h4>
                    <Field className="create-task-info__input modal-field-styles" name="priority" placeholder="Вибрати" as="select">
                      <option value=""></option>
                      <option value="Без пріорітету">Без пріорітету</option>
                      <option value="Дуже важливо">Дуже важливо</option>
                      <option value="Важливо">Важливо</option>
                      <option value="Ну таке">Ну таке</option>
                    </Field>
                    {errors.priority && touched.priority ? <div className="form-error">{errors.priority}</div> : null}
                  </li>
                </ul>
                <footer className="create-task__controls">
                  <button
                    type="button"
                    onClick={(e) => closeModal(e, dispatch, TOGGLE_CREATE_TASK)}
                    className="create-task__cancle button">
                    Відмінити
                  </button>
                  <div>
                    <button
                      onClick={(e) => { return handleSubmit(), closeModal(e, dispatch, TOGGLE_CREATE_TASK, values.task) }}
                      type="button"
                      className="create-task__add button"
                    >
                      Додати
                    </button>
                  </div>
                </footer>
              </Form>
            </>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default CreateTask
