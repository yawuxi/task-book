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

const ModalTextWindow: React.FC<{
  placeHolder: string,
  additionalData?: { [key: string]: any },
}> = ({
  placeHolder,
  additionalData,
}) => {
    const { state, dispatch } = useContext(TaskBookContext)
    const { modals: { modalTextWindow: { TOGGLE_TEXT_MODAL } } } = ACTION_TYPES
    const [user] = useAuthState(auth)

    // opening ModalTextWindow modal when isOpen === true and close when isOpen === false
    const classes = state.modals.modalTextWindow.isOpen ? 'modal-text-window' : 'modal-text-window modal-text-window--hidden'

    return (
      <div className={classes} onClick={e => closeModal(e, dispatch, TOGGLE_TEXT_MODAL)}>
        <div className="modal-text-window__content user-component">
          <Formik
            initialValues={{
              term: '',
            }}
            validationSchema={yup.object().shape({
              term: yup.string().min(2, 'Мінімум 2 символа!').required(`${placeHolder}!`)
            })}
            onSubmit={values => {
              updateDoc(doc(firestoreDB, 'users', user!.uid), {
                [additionalData?.where]: arrayUnion({ path: `/${values.term}`, title: values.term })
              })
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <Field
                  className="modal-field-styles"
                  id="term"
                  name="term"
                  placeholder={placeHolder}
                />
                {errors.term && touched.term ? <div className="form-error">{errors.term}</div> : null}
                <button className="button" type="submit" onClick={e => closeModal(e, dispatch, TOGGLE_TEXT_MODAL, values.term)}>
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
