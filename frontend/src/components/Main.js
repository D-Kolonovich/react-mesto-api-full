import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
//import api from "../utils/Api"
import Card from "../components/Card";
import addButton from "../images/add_button.svg";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  // console.log(useContext(CurrentUserContext));
// console.log(props.cards, 'card');
  return (
    currentUser.data ?
    <main className="content">
      <section className="profile page__section-hidden">
        <div className="profile__wrap-avatar">
          <img
            src={currentUser.data.avatar}
            alt="Фото профиля"
            className="profile__avatar"
          />
          <button
            type="button"
            className="profile__button profile__button-avatar"
            aria-label="Редактировать"
            title="Редактировать"
            onClick={props.onEditAvatar}
          ></button>
        </div>

        <div className="profile__info">
          <h1 className="profile__name" id="name">
            {currentUser.data.name}
          </h1>
          <button
            type="button"
            className="profile__button profile__button_type_edit"
            aria-label="Редактировать"
            title="Редактировать"
            onClick={props.onEditProfile}
          ></button>
          <p className="profile__description" id="description">
            {currentUser.data.about}
          </p>
        </div>

        <button
          type="button"
          className="profile__button profile__button_type_add"
          aria-label="Добавить"
          title="Добавить"
          onClick={props.onAddPlace}
        >
          <img src={addButton} alt="Добавить фото" />
        </button>
      </section>

      <section className="elements">
        {props.cards.map((card) => {
          if (card.data) {
            return <Card
            key={card.data._id}
            cardId={card.data._id}
            name={card.data.name}
            link={card.data.link}
            ownerId={card.data.owner}
            likes={card.data.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
          } else {
            return <Card
            key={card._id}
            cardId={card._id}
            name={card.name}
            link={card.link}
            ownerId={card.owner}
            likes={card.likes}
            onCardClick={props.onCardClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
          />
          }
          
        })}
      </section>
    </main>
    : <div>загрузки</div>
  );
}

export default Main;
