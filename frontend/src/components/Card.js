import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.ownerId === currentUser._id;
  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = `element__button_type_delete ${
    isOwn ? "" : "element__delete-button_hidden"
  }`;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.likes.some((like) => like._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__button_type_active" : ""
  }`;

  function handleCardClick() {
    props.onCardClick({ name: props.name, link: props.link });
  }

  function handleLikeClick() {
    props.onCardLike({ likes: props.likes, _id: props.cardId });
  }

  function handleDeleteClick() {
    props.onCardDelete(props.cardId);
  }

  return (
    <li className="template-element">
      <article className="element">
        <img
          onClick={handleCardClick}
          src={props.link}
          alt="Изображение"
          className="element__image"
        />
        <button
          onClick={handleDeleteClick}
          type="button"
          className={cardDeleteButtonClassName}
          aria-label="Удалить"
          title="Удалить"
        ></button>
        <div className="element__content">
          <h2 className="element__title">{props.name}</h2>
          <div className="element__like-wrap">
            <button
              onClick={handleLikeClick}
              type="button"
              className={cardLikeButtonClassName}
              aria-label="Нравится"
              title="Нравится"
            ></button>
            <p className="element__like-number">{props.likes.length}</p>
          </div>
        </div>
      </article>
    </li>
  );
}

export default Card;
