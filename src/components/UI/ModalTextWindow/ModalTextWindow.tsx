// react
import React, { useContext } from "react"
// additional functional
import { TaskBookContext } from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { iAction } from "../../../types/Action"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
import { updateDoc, doc, arrayUnion } from "firebase/firestore"
import { firestoreDB, auth } from "../../../firebase"
import { useAuthState } from "react-firebase-hooks/auth"
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
                console.log('sidebar');
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  sidebarCategories: arrayUnion({ path: `/${values.term}`, title: values.term })
                })
                break;
              case 'createTask':
                console.log('createTask');
                updateDoc(doc(firestoreDB, 'users', user!.uid), {
                  taskItemTemplates: arrayUnion({ templateName: values.term })
                })
                break;
            }
          }}
        >
          {({ errors, touched, values }) => (
            <Form>
              <Field
                className="modal-field-styles"
                id="term"
                name="term"
                placeholder={additionalData.placeholder}
              />
              {errors.term && touched.term ? <div className="form-error">{errors.term}</div> : null}
              <button className="button" type="submit">
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
