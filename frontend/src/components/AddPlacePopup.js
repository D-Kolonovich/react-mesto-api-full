import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const placeNameRef = React.useRef();
  const placeLinkRef = React.useRef();

  React.useEffect(() => {
    placeNameRef.current.value = "";
    placeLinkRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace(placeNameRef.current.value, placeLinkRef.current.value);
  }

  return (
    <PopupWithForm
      name="card"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      handleSubmit={handleSubmit}
    >
      <input
        type="text"
        id="input-title"
        className="form__info form__info_type_title"
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        autoComplete="off"
        required
        ref={placeNameRef}
      />
      <span className="form__input-error input-title-error">
        Вы пропустили это поле.
      </span>
      <input
        type="url"
        id="input-link"
        className="form__info form__info_type_link"
        name="link"
        placeholder="Ссылка на картинку"
        autoComplete="off"
        required
        ref={placeLinkRef}
      />
      <span className="form__input-error input-link-error">
        Введите адрес сайта.
      </span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
