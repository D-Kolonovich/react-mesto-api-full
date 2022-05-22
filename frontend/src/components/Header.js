import React from "react";
import { Switch } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import logoSvg from "../images/logo.svg";

function Header({ email, onClick }) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logoSvg} alt="логотип" className="logo" />
      </Link>

      <ul className="header__nav">
        <Switch>
          <Route exact path="/">
              <li className="header__nav">
                <p className="header__email">{email}</p>
              </li>
              <li className="header__nav">
                <button className="header__out" onClick={onClick}>
                  Выйти
                </button>
              </li>
            </Route>
            <Route path="/sign-in">
              <li className="header__nav">
                <Link to="/sign-up" className="header__auth-link">
                  Регистрация
                </Link>
              </li>
            </Route>
            <Route path="/sign-up">
              <li className="header__nav">
                <Link to="/sign-in" className="header__auth-link">
                  Войти
                </Link>
              </li>
            </Route>
        </Switch>
      </ul>
    </header>
  );
}

export default Header;
