// react
import React, { useContext, useEffect, useState } from "react"
// additional functional
import { TaskBookContext } from "../../../shared/context"
import { ACTION_TYPES } from "../../../shared/actionTypes"
import { iTaskItemTemplate } from "../../../types/TaskItemTemplate";
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup'
import dayjs from "dayjs";
// components
import ModalTextWindow, { closeModal } from "../ModalTextWindow/ModalTextWindow"
// styles
import './CreateTask.scss'

/**
 * //TODO: feature: if modal window hidden use class - create-task--hidden
 * //TODO: feature: all select options dynamic from context
 * //TODO: modal form validation
 * TODO: feature: select template
 * //TODO: feature: calendar
 * //TODO: feature: cancle
 * //TODO: feture: add
 * //TODO: feature: save as template
 * //TODO: feature: user can choose only today date, can not choose yesterdays date
*/

function getMinDate(): string {
  const day = dayjs().date().toString().length < 2 ? `0${dayjs().date()}` : dayjs().date().toString()
  const month = (dayjs().month() + 1).toString().length < 2 ? `0${dayjs().month() + 1}` : dayjs().month() + 1
  const year = dayjs().year()
  const date = `${year}-${month}-${day}`

  return date
}

const CreateTask: React.FC = () => {
  const [minDate, setMinDate] = useState('')
  const { state, dispatch } = useContext(TaskBookContext)
  const { taskItemTemplate } = state
  const { modals: { createTask: { TOGGLE_CREATE_TASK, ADD_TASK }, modalTextWindow: { TOGGLE_TEXT_MODAL } }, taskItemTemplate: { ADD_TASK_TEMPLATE } } = ACTION_TYPES

  useEffect(() => {
    setMinDate(getMinDate())
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
          onSubmit={values => {
            dispatch({ type: ADD_TASK, payload: values })
          }}
        >
          {({ errors, touched, values }) => (
            <>
              <header>
                <h3 className="create-task__title h3-title">Добавить новую задачу</h3>
                <Field
                  className="modal-field-styles"
                  name="template"
                  placeholder="Вибрати шаблон"
                  as="select"
                >
                  <option>Вибрати шаблон</option>
                  {taskItemTemplate.map((item: iTaskItemTemplate) => {
                    return <option key={item.title} value={item.title}>{item.title}</option>
                  })}
                </Field>
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
                      type="button"
                      className="create-task__save-as-template button"
                      onClick={() => dispatch({ type: TOGGLE_TEXT_MODAL })}
                    >
                      Зберігти як шаблон
                    </button>
                    <button
                      type="submit"
                      className="create-task__add button"
                      onClick={e => {
                        if (values.category !== '') {
                          closeModal(e, dispatch, TOGGLE_CREATE_TASK)
                        }
                      }}
                    >
                      Додати
                    </button>
                  </div>
                </footer>
              </Form>
              <ModalTextWindow submitActionType={ADD_TASK_TEMPLATE} placeHolder="Вкажіть назву шаблону" additionalData={values} />
            </>
          )}
        </Formik>
      </div>
    </div >
  )
}

export default CreateTask
