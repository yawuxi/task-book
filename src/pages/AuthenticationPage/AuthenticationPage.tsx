// react
import React, { useContext, useState } from "react"
// additional functional
import { TaskBookContext } from "../../shared/context"
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'
// components
// styles
import './AuthenticationPage.scss'
import logotype from '../../images/logotype.png'
import { ACTION_TYPES } from "../../shared/actionTypes"

const AuthenticationPage: React.FC = () => {
  const { state, dispatch } = useContext(TaskBookContext)
  const [registration, setRegistration] = useState(false)

  // destructuring
  const { userMethods: { signIn, signUp } } = state
  const { errors: { SET_ERROR } } = ACTION_TYPES

  console.log(state.errors);
  return (
    <div className="login-page">
      <img src={logotype} alt="logotype" />
      <div className="login-page__content">
        <div className="login-page__form-wrapper">
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email().required('Впишіть вашу електронну пошту!'),
                password: Yup.string().min(6, 'Мінімум 6 символів для паролю!').required('Вкажіть ваш пароль!')
              })
            }
            onSubmit={(values, action) => {
              if (state.errors) {
                setTimeout(() => {
                  action.setSubmitting(false)
                }, 1500);
              }
            }}
          >
            {({ errors, touched, values, isSubmitting, handleReset }) => (
              (!registration) ?
                (
                  <Form className="login-page__form shadow br10">
                    <h3 className="login-page__title">Вхід в акаунт</h3>
                    <div className="login-page__inputs">
                      <Field name="email" type="email" className="login-page__input" placeholder="Електронна пошта" />
                      {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
                      <Field name="password" type="password" className="login-page__input" placeholder="Пароль" />
                      {errors.password && touched.password ? <div className="form-error">{errors.password}</div> : null}
                    </div>
                    <button
                      type="submit"
                      className="login-page__log-in br10"
                      disabled={isSubmitting}
                      onClick={() => { return signIn(values.email, values.password), dispatch({ type: SET_ERROR, payload: '' }) }}
                    >
                      Увійти
                    </button>
                    <div className="login-page__registration">
                      Ще не маєш акаунту?
                      <span> </span>
                      <button
                        onClick={() => { return setRegistration(true), handleReset() }}
                        type="button"
                      >
                        Рєєстрація
                      </button>
                    </div>
                  </Form>
                ) : (
                  <Form className="login-page__form shadow br10">
                    <h3 className="login-page__title">Рєєстрація акаунту {isSubmitting}</h3>
                    <div className="login-page__inputs">
                      <Field name="email" type="email" className="login-page__input" placeholder="Електронна пошта" />
                      {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
                      <Field name="password" type="password" className="login-page__input" placeholder="Пароль" />
                      {errors.password && touched.password ? <div className="form-error">{errors.password}</div> : null}
                    </div>
                    <button
                      type="submit"
                      className="login-page__log-in br10"
                      onClick={() => { return signUp(values.email, values.password), dispatch({ type: SET_ERROR, payload: '' }) }}
                      disabled={isSubmitting}
                    >
                      Зарєєструватися
                    </button>
                    <div className="login-page__registration">
                      Вже маєш акаунту?<span> </span>
                      <button
                        onClick={() => { return setRegistration(false), handleReset() }}
                        type="button"
                      >
                        Увійти
                      </button>
                    </div>
                  </Form>
                )
            )}
          </Formik>
        </div>
        <div className="login-page__info">
          &copy; copyright 2022 <a href="https://nometa.xyz/ru.html" target="_blank">Політика конфіденційності</a>
        </div>
      </div>
    </div>
  )
}

export default AuthenticationPage
