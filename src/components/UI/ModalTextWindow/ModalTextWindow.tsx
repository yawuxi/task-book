// react
import React, { useContext } from "react"

// additional functional
import iAction from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { TaskBookContext } from "../../../shared/context"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
// components
// styles
import './ModalTextWindow.scss'

export function closeModal(e: React.MouseEvent, dispatch: React.Dispatch<iAction>, type: string): void {
  if (e.currentTarget === e.target) {
    dispatch({ type })
  }
}

const ModalTextWindow: React.FC<{ submitActionType: string, placeHolder: string, additionalData?: object }> = ({ submitActionType, placeHolder, additionalData }) => {
  const { state, dispatch } = useContext(TaskBookContext)
  const { modals: { modalTextWindow: { TOGGLE_TEXT_MODAL } } } = ACTION_TYPES

  // opening ModalTextWindow modal when isOpen === true and close when isOpen === false
  const classes = state.modals.modalTextWindow.isOpen ? 'modal-text-window' : 'modal-text-window modal-text-window--hidden'

  return (
    <div className={classes} onClick={e => closeModal(e, dispatch, TOGGLE_TEXT_MODAL)}>
      <div className="modal-text-window__content user-component">
        <Formik
          initialValues={{
            categoryTitle: ''
          }}
          validationSchema={yup.object().shape({
            categoryTitle: yup.string().min(2, 'Мінімум 2 символа!').required(`${placeHolder}!`)
          })}
          onSubmit={values => {
            if (additionalData !== undefined) {
              dispatch({ type: submitActionType, payload: { title: values.categoryTitle, additionalData } })
            } else {
              dispatch({ type: submitActionType, payload: values.categoryTitle })
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field className="modal-field-styles" id="categoryTitle" name="categoryTitle" placeholder={placeHolder} />
              {errors.categoryTitle && touched.categoryTitle ? <div className="form-error">{errors.categoryTitle}</div> : null}
              <button className="button" type="submit">Додати</button>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default ModalTextWindow
