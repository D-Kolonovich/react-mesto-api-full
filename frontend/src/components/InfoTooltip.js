import React from "react";
import success from "../images/success.svg";
import unsuccess from "../images/unsuccess.svg";

function InfoTooltip({ isOpen, onClose, isSuccess, message }) {
  const image = isSuccess ? success : unsuccess;
  return (
    <div className={`popup ${isOpen ? "popup_opened" : " "}`}>
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__button"
          type="button"
        ></button>
        <img className="popup__image-tooltip" src={image} />
        <p className="popup__heading popup__heading-tooltip">{message}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;