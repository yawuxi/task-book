// react
import React, { useContext } from "react"
// additional functional
import { TaskBookContext } from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { iAction } from "../../../types/Action"
import { Category } from "../../../types/Category"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { firestoreDB, auth } from "../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import { useDocumentData } from "react-firebase-hooks/firestore"
import { iTaskItem } from "../../../types/TaskItem"
import { uuidv4 } from "@firebase/util"
// components
// styles
import './ModalTextWindow.scss'

// closing modal functional, when value !== '', ModalTextWindow will be close
export function closeModal(
  e: React.MouseEvent,
  dispatch: React.Dispatch<iAction>,
  type: string,
  value?: string,
): void {
  if (e.currentTarget === e.target && value !== '') {
    dispatch({ type })
  }
}

const ModalTextWindow: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const { modals: { modalTextWindow: { TOGGLE_TEXT_MODAL } } } = ACTION_TYPES
  const [user] = useAuthState(auth)
  const [userData] = useDocumentData(doc(firestoreDB, 'users', user!.uid))

  // destructuring
  const { modals: { modalTextWindow: { additionalData } } } = state

  return (
    <div className="modal-text-window" onClick={e => closeModal(e, dispatch, TOGGLE_TEXT_MODAL)}>
      <div className="modal-text-window__content user-component">
        <Formik
          initialValues={{
            term: '',
          }}
          validationSchema={yup.object().shape({
            term: yup.string().min(2, 'Мінімум 2 символа!').required(`${additionalData.placeholder}!`)
          })}
          onSubmit={values => {
            switch (additionalData.submitFrom) {
              default:
                break;
              case 'sidebar':
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  pages: arrayUnion({
                    title: values.term,
                    path: uuidv4(),
                    createTaskCategories: [],
                    createTaskPriorities: [],
                    taskItemTemplates: [],
                    tasksList: [],
                    tasksRemoved: 0,
                  })
                })
                break;
              case 'createTask':
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  taskItemTemplates: arrayUnion({ templateName: values.term })
                })
                break;
              case 'editingTask':
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  pages: userData?.pages.map((category: Category) => {
                    if (`/${category.path}` === window.location.pathname || category.path === window.location.pathname) {
                      return {
                        ...category,
                        tasksList: category.tasksList.map((task: iTaskItem) => task.id === additionalData.id ? { ...task, task: values.term } : task),
                      }
                    } else {
                      return category
                    }
                  })
                })
                break;
            }
          }}
        >
          {({ values, handleSubmit, errors, touched }) => (
            <Form>
              <Field
                className="modal-field-styles"
                id="term"
                name="term"
                placeholder={additionalData.placeholder}
              />
              {errors.term && touched.term ? <div className="form-error">{errors.term}</div> : null}
              <button
                onClick={e => { return handleSubmit(), closeModal(e, dispatch, TOGGLE_TEXT_MODAL, values.term) }}
                className="button"
                type="button"
              >
                Додати
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default ModalTextWindow
