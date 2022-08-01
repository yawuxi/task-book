// react
import React from "react"

// additional functional
// components
// styles
import './CreateTask.scss'

/**
 * TODO: feature: if modal window hidden use class - create-task--hidden
 * TODO: feature: all select options dynamic from context
 * TODO: feature: select template
 * TODO: feature: calendar
 * TODO: feature: cancle, save as template, add (work with context!)
*/

const CreateTask: React.FC = () => {
  return (
    <div className="create-task create-task--hidden">
      <div className="create-task__content user-component">
        <header>
          <h3 className="create-task__title h3-title">Добавить новую задачу</h3>
          <select className="modal-field-styles" name="template" placeholder="Вибрати шаблон">
            <option value="iAmFirstTemplate">Шаблон 1</option>
            <option value="iAmSecondTemplate">Шаблон 2</option>
            <option value="iAmSecondTemplate">Шаблон 3</option>
          </select>
        </header>
        <h4 className="create-task__small-title">Що потрібно зробити</h4>
        <input className="create-task__task-input modal-field-styles" type="text" placeholder="Приготувати вечерю" />
        <ul className="create-task-info">
          <li className="create-task-info__item">
            <h4 className="create-task__small-title">Категорія</h4>
            <select className="create-task-info__input modal-field-styles" name="category" placeholder="Вибрати">
              <option value="iAmFirstCategory">first category</option>
              <option value="iAmSecondCategory">second category</option>
            </select>
          </li>
          <li className="create-task-info__item">
            <h4 className="create-task__small-title">Коли</h4>
            <input className="create-task-info__input modal-field-styles" type="text" placeholder="тут буде календар" />
          </li>
          <li className="create-task-info__item">
            <h4 className="create-task__small-title">Приорітет задачі</h4>
            <select className="create-task-info__input modal-field-styles" name="category" placeholder="Вибрати">
              <option value="iAmFirstCategory">Дуже важливо</option>
              <option value="iAmSecondCategory">Важливо</option>
              <option value="iAmSecondCategory">Ну таке</option>
            </select>
          </li>
        </ul>
        <footer className="create-task__controls">
          <button className="create-task__cancle button">Відмінити</button>
          <div>
            <button className="create-task__save-as-template button">Зберігти як шаблон</button>
            <button className="create-task__add button">Додати</button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default CreateTask
