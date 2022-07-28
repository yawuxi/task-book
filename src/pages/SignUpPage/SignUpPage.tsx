// react
import React from "react"

// additional functional
// components
// styles
import './SignUpPage.scss'
import logotype from '../../images/logotype.png'

const SignUpPage: React.FC = () => {
  return (
    <div className="sign-up">
      <img src={logotype} alt="logotype" />
      <div className="sign-up__content">
        <div className="sign-up__form-wrapper">
          <form className="sign-up__form shadow br10">
            <h3 className="sign-up__title">Вхід в акаунт</h3>
            <div className="sign-up__inputs">
              <input type="email" className="sign-up__input" placeholder="Електронна пошта" />
              <input type="password" className="sign-up__input" placeholder="Пароль" />
            </div>
            <button className="sign-up__log-in br10">Увійти</button>
            <div className="sign-up__registration">Ще не маєш акаунту? <a href="#">Рєєстрація</a></div>
          </form>
        </div>
        <div className="sign-up__info">&copy; copyright 2022 <a href="#">Політика конфіденційності</a></div>
      </div>
    </div>
  )
}

export default SignUpPage
