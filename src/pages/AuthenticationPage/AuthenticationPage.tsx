// react
import React, { useState } from "react"
// additional functional
import { Formik, Field, Form } from "formik"
import * as Yup from 'yup'
import { signInUser, registrationNewUser } from "../../firebase"
// components
// styles
import './AuthenticationPage.scss'
import logotype from '../../images/logotype.png'

const AuthenticationPage: React.FC = () => {
  const [registration, setRegistration] = useState(false)

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
            onSubmit={() => { }}
          >
            {({ errors, touched, values }) => (
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
                      onClick={() => signInUser(values.email, values.password)}
                    >
                      Увійти
                    </button>
                    <div className="login-page__registration">
                      Ще не маєш акаунту?
                      <span> </span>
                      <button onClick={(e) => { return e.preventDefault(), setRegistration(true) }}>Рєєстрація</button>
                    </div>
                  </Form>
                ) : (
                  <Form className="login-page__form shadow br10">
                    <h3 className="login-page__title">Рєєстрація акаунту</h3>
                    <div className="login-page__inputs">
                      <Field name="email" type="email" className="login-page__input" placeholder="Електронна пошта" />
                      {errors.email && touched.email ? <div className="form-error">{errors.email}</div> : null}
                      <Field name="password" type="password" className="login-page__input" placeholder="Пароль" />
                      {errors.password && touched.password ? <div className="form-error">{errors.password}</div> : null}
                    </div>
                    <button
                      type="submit"
                      className="login-page__log-in br10"
                      onClick={() => registrationNewUser(values.email, values.password)}
                    >
                      Зарєєструватися
                    </button>
                    <div className="login-page__registration">
                      Вже маєш акаунту?<span> </span>
                      <button onClick={(e) => { return e.preventDefault(), setRegistration(false) }}>Увійти</button>
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
