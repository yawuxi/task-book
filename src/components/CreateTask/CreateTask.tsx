// react
import React, { useContext } from "react"
// additional functional
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'
import { ACTION_TYPES } from "../../shared/actionTypes"
import { TaskBookContext } from "../../shared/context"
import { closeModal } from "../SidebarAddCategory/SidebarAddCategory"
// components
// styles
import './CreateTask.scss'

/**
 * //TODO: feature: if modal window hidden use class - create-task--hidden
 * TODO: feature: all select options dynamic from context
 * //TODO: modal form validation
 * TODO: feature: select template
 * //TODO: feature: calendar
 * //TODO: feature: cancle
 * //TODO: feture: add
 * TODO: feture: save as template
*/

const CreateTask: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const { modals: { createTask: { isOpen } } } = state
  const { modals: { createTask: { TOGGLE_CREATE_TASK, ADD_TASK } } } = ACTION_TYPES

  // conditional render
  const classes = isOpen ? 'create-task' : 'create-task create-task--hidden'

  return (
    <div className={classes} onClick={(e) => closeModal(e, dispatch, TOGGLE_CREATE_TASK)}>
      <div className="create-task__content user-component">
        <header>
          <h3 className="create-task__title h3-title">Добавить новую задачу</h3>
          <select className="modal-field-styles" name="template" placeholder="Вибрати шаблон">
            <option value="iAmFirstTemplate">Шаблон 1</option>
            <option value="iAmSecondTemplate">Шаблон 2</option>
            <option value="iAmSecondTemplate">Шаблон 3</option>
          </select>
        </header>
        <Formik
          initialValues={{
            task: '',
            category: '',
            date: '',
            priority: '',
          }}
          validationSchema={
            yup.object().shape({
              task: yup.string().min(5, 'Мінімальна довжина задачі 5 символів!').required('Напишіть задачу!'),
              category: yup.string().required('Вкажіть категорію!'),
              date: yup.string().required('Вкажіть дату!'),
              priority: yup.string().required('Вкажіть приіорітет!'),
            })
          }
          onSubmit={values => {
            dispatch({ type: ADD_TASK, payload: values })
          }}
        >
          {({ errors, touched }) => (
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
                  <Field className="create-task-info__input modal-field-styles" name="date" type="date" placeholder="тут буде календар" />
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
                  onClick={(e) => closeModal(e, dispatch, TOGGLE_CREATE_TASK)}
                  className="create-task__cancle button">
                  Відмінити
                </button>
                <div>
                  <button className="create-task__save-as-template button">Зберігти як шаблон</button>
                  <button type="submit" className="create-task__add button">Додати</button>
                </div>
              </footer>
            </Form>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default CreateTask
