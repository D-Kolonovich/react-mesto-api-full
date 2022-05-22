import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar(avatarRef.current.value);
    /* Значение инпута, полученное с помощью рефа */
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="url"
        id="avatar-link"
        name="avatar"
        className="form__info form__info_type_avatar-link"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
      />
      <span className="form__input-error avatar-link-error">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
