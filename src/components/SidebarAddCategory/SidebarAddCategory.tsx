// react
import React, { useContext } from "react"

// additional functional
import iAction from "../../shared/context"
import { TaskBookContext } from "../../shared/context"
import { ACTION_TYPES } from "../../shared/actionTypes"
import { Formik, Form, Field } from "formik"
import * as yup from 'yup'
// components
// styles
import './SidebarAddCategory.scss'

export function closeModal(e: React.MouseEvent, dispatch: React.Dispatch<iAction>, type: string): void {
  if (e.currentTarget === e.target) {
    dispatch({ type })
  }
}

const SidebarAddCategory: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const { modals: { sidebarAddCategory: { isOpen } } } = state
  const { sidebar: { SIDEBAR_ADD_CATEGORY }, modals: { CLOSE_SIDEBAR_ADD_CATEGORY } } = ACTION_TYPES

  // opening SidebarAddCategory modal when isOpen === true and close when isOpen === false
  const classes = isOpen ? 'sidebar-add-category' : 'sidebar-add-category sidebar-add-category--hidden'

  return (
    <div className={classes} onClick={(e) => closeModal(e, dispatch, CLOSE_SIDEBAR_ADD_CATEGORY)}>
      <div className="sidebar-add-category__content user-component">
        <Formik
          initialValues={{
            categoryTitle: ''
          }}
          validationSchema={yup.object().shape({
            categoryTitle: yup.string().min(2, 'Мінімум 2 символа!').required('Введіть назву категорії!')
          })}
          onSubmit={(values, actions) => {
            dispatch({ type: SIDEBAR_ADD_CATEGORY, payload: values.categoryTitle })
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <Field id="categoryTitle" name="categoryTitle" placeholder="Назва категорії" />
              {errors.categoryTitle && touched.categoryTitle ? <div className="sidebar-add-category__error">{errors.categoryTitle}</div> : null}
              <button className="br10" type="submit">Submit</button>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default SidebarAddCategory
