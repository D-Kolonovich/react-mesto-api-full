import React from "react";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import api from "../utils/Api";

import { Redirect, Switch, Route, useHistory } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import * as auth from "../utils/Auth";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

function App() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    about: "",
    avatar: "",
    _id: "",
    cohort: "",
  });

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [isInfoTooltipPopupOpen, setIsInfoTooltipPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [infoTooltipMessage, setInfoTooltipMessage] = useState("");
  const history = useHistory();

  const [cards, setCards] = useState([]);

  const handleEditProfilePopupOpen = () => {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  };

  const handleAddPlacePopupOpen = () => {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  };

  const handleEditAvatarPopupOpen = () => {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  // const AUTHORIZATION_ERROR_CODE = 403;

  const closeAllPopups = () => {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setIsInfoTooltipPopupOpen(false);
    setSelectedCard(null);
  };

  // React.useEffect(() => {
  //     Promise.all([api.getUserInfo(), api.getInitialCards()])
  //     .then(([data, cards]) => {
  //       setCurrentUser(data);
  //       setCards(cards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
    
  // }, []);

  React.useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([data, cards]) => {
        setCurrentUser(data);
        setCards(cards);
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }, [loggedIn]);

  // React.useEffect(() => {
  //   api
  //     .getInitialCards()
  //     .then((cards) => {
  //       setCards(cards);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  // React.useEffect(() => {
  //   api
  //     .getUserInfo()
  //     .then((data) => {
  //       setCurrentUser(data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const handleUpdateUser = (name, description) => {
    api
      .setUserInfo(name, description)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateAvatar = (avatar) => {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCardLike = (card) => {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((like) => like._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  };

  const handleAddPlaceSubmit = (place, link) => {
    api
      .addCard(place, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleCardDelete(cardId) {
    api
      .deleteCard(cardId)
      .then((data) => {
        setCards((state) => state.filter((c) => c._id !== cardId));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      setToken(token);
      auth
        .getContent(token)
        .then((data) => {
          setLoggedIn(true);
          setEmail(data.email);
          history.push("/");
        })
        .catch((err) => {
          if (err === 400)
            return console.log("Токен не передан или передан не в том формате");
          if (err === 401) return console.log("Переданный токен некорректен");
          console.log(err);
        });
    }
  }
  React.useEffect(() => {
    checkToken();
  }, []);

  function onSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  function onLogin({ email, password }) {
    auth
      .authorize({ email, password })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          localStorage.setItem("jwt", data.token);
          setEmail(email);
          setLoggedIn(true);
          setIsInfoTooltipPopupOpen(false);
          setIsSuccess(true);
          setInfoTooltipMessage("Вы успешно авторизировались!");
          history.push("/");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        if (err === 400)
          return setInfoTooltipMessage("не передано одно из полей");
        if (err === 401)
          return setInfoTooltipMessage("неправильная почта или пароль");
        setInfoTooltipMessage("Попробуйте еще раз!");
        console.log(err);
      });
  }

  function onRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((data) => {
        if (data) {
          setIsInfoTooltipPopupOpen(true);
          setIsSuccess(true);
          setInfoTooltipMessage("Вы успешно зарегистрировались!");
          history.push("/sign-in");
        }
      })
      .catch((err) => {
        setIsInfoTooltipPopupOpen(true);
        setIsSuccess(false);
        setInfoTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        if (err === 400)
          return console.log("некорректно заполнено одно из полей ");
        console.log(err);
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header email={email} onClick={onSignOut} />

        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              onEditProfile={handleEditProfilePopupOpen}
              onAddPlace={handleAddPlacePopupOpen}
              onEditAvatar={handleEditAvatarPopupOpen}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cards}
            />
          </ProtectedRoute>

          <Route path="/sign-in">
            <Login onLogin={onLogin} />
          </Route>

          <Route path="/sign-up">
            <Register onRegister={onRegister} />
          </Route>

          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>

        <Footer />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm
          name="confirm"
          title="Вы уверены?"
          buttonText="Да"
        ></PopupWithForm>

        <ImagePopup
          card={selectedCard !== null && selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          message={infoTooltipMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
