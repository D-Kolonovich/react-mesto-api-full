import React from "react";
import { Switch } from "react-router-dom";
import { Link, Route } from "react-router-dom";
import logoSvg from "../images/logo.svg";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Header({ email, onClick }) {
  const currentUser = useContext(CurrentUserContext);
  // console.log(useContext(CurrentUserContext));
  return (
    currentUser.data ?
    <header className="header">
      <Link to="/">
        <img src={logoSvg} alt="логотип" className="logo" />
      </Link>

      <ul className="header__nav">
        <Switch>
          <Route exact path="/">
              <li className="header__nav">
                <p className="header__email">{currentUser.data.email}</p>
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
    : <div>загрузка</div>
  );
}

export default Header;
