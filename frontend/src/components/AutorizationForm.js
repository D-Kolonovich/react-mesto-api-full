import React from "react";
import { Link } from "react-router-dom";

function AutorizationForm({ name, textButton, onSubmit, loginLink }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    onSubmit(e, { email: email, password: password });
    setEmail("");
    setPassword("");
  }

  return (
    <form className="form" action="#" onSubmit={handleSubmit}>
      <h2 className="form__title">{name}</h2>
      <input
        className="form__input-autorization"
        type="email"
        placeholder="email"
        name="email"
        value={email || ''}
        onChange={handleChangeEmail}
        required
      ></input>
      <input
        className="form__input-autorization"
        type="password"
        placeholder="Пароль"
        name="password"
        value={password || ''}
        onChange={handleChangePassword}
        required
      ></input>
      <button className="form__button-autorization" type="submit">
        {textButton}
      </button>
      <Link to="/sign-in" className="form__link">
        {loginLink ? "Уже зарегестрированны? Войти" : ""}
      </Link>
    </form>
  );
}

export default AutorizationForm;
