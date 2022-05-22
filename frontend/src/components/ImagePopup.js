import React from 'react';

function ImagePopup(props) {
  return (
    <div className={` popup popup_type_picture ${props.card && 'popup_opened'} `}>
      <div className="popup__container popup__container_type_picture">
        <button onClick={ props.onClose } type="button" className="popup__button popup__button_type_close" aria-label="Закрыть" title="Закрыть"></button>
        <figure className="popup__figure">
          <img className="popup__image" alt="Реклама" src={`${props.card.link}`}/>
          <h3 className="popup__description">{ props.card.name }</h3>
        </figure>
      </div>
    </div>
  )
}

export default ImagePopup;