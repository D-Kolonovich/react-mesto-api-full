import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  // Подписка на контекст
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser(name, description);
  }

  function onInputNameChange(e) {
    setName(e.target.value);
  }

  function onInputDescriptionChange(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="text"
        value={name}
        id="input-name"
        className="form__info form__info_type_name"
        name="name"
        autoComplete="off"
        minLength="2"
        maxLength="40"
        placeholder="Имя"
        required
        onChange={onInputNameChange}
      />
      <span className="form__input-error input-name-error">
        Вы пропустили это поле.
      </span>

      <input
        type="text"
        value={description}
        id="input-job"
        className="form__info form__info_type_job"
        name="about"
        autoComplete="off"
        minLength="2"
        maxLength="200"
        placeholder="Вид деятельности"
        required
        onChange={onInputDescriptionChange}
      />
      <span className="form__input-error input-job-error">
        Вы пропустили это поле.
      </span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
