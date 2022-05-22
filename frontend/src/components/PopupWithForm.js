import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          onClick={props.onClose}
          type="button"
          className="popup__button"
          aria-label="Закрыть"
          title="Закрыть"
        ></button>
        <h2 className="popup__heading">{props.title}</h2>
        <form className="form form-edit" name={`form-${props.name}`} noValidate onSubmit={props.handleSubmit}>
          <fieldset className="form__contact-info">
            {props.children}
            <button type="submit" className="form__button form__button-submit" name="submit">{props.buttonText}</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
