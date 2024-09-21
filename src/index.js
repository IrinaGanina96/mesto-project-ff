import './styles/index.css';
import {initialCards} from './scripts/cards.js'
import {createPlace, onLikeIcon} from './scripts/card.js'
import {openPopup, closePopup} from './scripts/modal.js'
import {enableValidation, clearValidation} from './scripts/validation.js'
import {getInitialCards, getUser, editProfile, addCard, changeAvatar, deleteCard} from './scripts/api.js'

// @todo: DOM узлы
const container = document.querySelector('.content');
const placeContainer = container.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpener = document.querySelector('.profile__add-button');
const popupCloseButtons = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpener = document.querySelector('.profile__edit-button');
const popupNewAvatar = document.querySelector('.popup_new_avatar');
const popupNewAvatarOpener = document.querySelector('.profile__image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageOpener = document.querySelector('.popup_type_image');
const formProfile = document.querySelector('[name="edit-profile"]');
const nameInput = formProfile.querySelector('[name="name"]');
const jobInput = formProfile.querySelector('[name="description"]');
const buttonFormProfile = formProfile.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formPlase = document.querySelector('[name="new-place"]');
const plaseName = formPlase.querySelector('[name="place-name"]');
const plaseImage = formPlase.querySelector('[name="link"]');
const buttonFormPlase = formPlase.querySelector('.popup__button');
const formAvatar = document.querySelector('[name="avatar"]');
const avatarImage = formAvatar.querySelector('[name="link"]');
const buttonFormAvatar = formAvatar.querySelector('.popup__button');
const formDeleteCard = document.querySelector('[name="delete_card"]');
const popupDeleteCard = document.querySelector('.popup_delete_card');
const buttonFormDeleteCard = formDeleteCard.querySelector('.popup__button');
const popups = document.querySelectorAll('.popup');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };

let profile;
let cardForDelete = {};

popupNewCardOpener.addEventListener('click', function() {
    openPopup(popupNewCard)
    // очистка ошибок валидации вызовом clearValidation
    clearValidation(formPlase, validationConfig); 
    plaseName.value = ''
    plaseImage.value = ''
});

popupProfileOpener.addEventListener('click', function() {
    openPopup(popupProfile)
    // очистка ошибок валидации вызовом clearValidation
    clearValidation(formProfile, validationConfig);
    nameInput.value = profileName.textContent
    jobInput.value =  profileJob.textContent
});

popupNewAvatarOpener.addEventListener('click', function() {
    openPopup(popupNewAvatar)
    // очистка ошибок валидации вызовом clearValidation
    clearValidation(formAvatar, validationConfig);
    avatarImage.value = ""
});

popupCloseButtons.forEach(function (button)  {
    button.addEventListener('click', function () {
        const popupElement = button.closest('.popup');
        closePopup(popupElement);
    });
});

// @todo: Функция открытия попапа с картинкой 
function openPopupImage (popupImageLink, popupImageName) {
    popupImage.src = popupImageLink; 
    popupImage.alt = popupImageName;
    popupCaption.textContent= popupImageName;

    openPopup(popupImageOpener)
}

// @todo: Функция редактирования имени и информации
function handleFormSubmit(evt) {
    evt.preventDefault();
    const newName = nameInput.value
    const newJob = jobInput.value

    loading (buttonFormProfile, true)
    
    editProfile (newName, newJob)
    .then(() => {
        profileName.textContent = newName;
        profileJob.textContent = newJob;
        closePopup (popupProfile);
    })
    .catch((err) => {
        console.log('Ошибка:', err);
    })
    .finally(() => {
        loading (buttonFormProfile, false)
    })
}

formProfile.addEventListener('submit', handleFormSubmit); 


// @todo: Функция добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();
    loading (buttonFormPlase, true)
    const newNamePlase = plaseName.value
    const newImagePlace = plaseImage.value

    addCard (newNamePlase, newImagePlace)
    .then ((card) => {
        const newCard = createPlace (card, profile, openPopupImage, onLikeIcon, handleDelete)
        placeContainer.prepend(newCard)

        closePopup (popupNewCard)
    })
    .catch((err)=>{
        console.log('Ошибка:', err);
    }) 
    .finally(() => {
        loading (buttonFormPlase, false)
    })   
}

formPlase.addEventListener('submit', handleCardSubmit);

// @todo: Функция смены аватарки
function handleAvatarSubmit(evt) {
    evt.preventDefault();
    const newAvatar = avatarImage.value

    loading (buttonFormAvatar, true)
    
    changeAvatar (newAvatar)
    .then (() => {
        popupNewAvatarOpener.style.backgroundImage = `url(${newAvatar})`;
        
        closePopup (popupNewAvatar)
    })
    .catch((err)=>{
        console.log('Ошибка:', err);
    })    
    .finally(() => {
        loading (buttonFormAvatar, false)
    })   
}

formAvatar.addEventListener('submit', handleAvatarSubmit);

// @todo: Функция удаления карточки 
const handleDelete = (cardId, cardElement) => {
    cardForDelete = {
        id: cardId,
        cardElement
      }
    openPopup (popupDeleteCard)
};

function handleDeleteSubmit (evt) {
    evt.preventDefault();
    if (!cardForDelete.cardElement) return;
    
    loading (buttonFormDeleteCard, true, 'Удаление...', 'Да')

    deleteCard(cardForDelete.id)
        .then(() => {
            cardForDelete.cardElement.remove();
            closePopup(popupDeleteCard);
            cardForDelete = {};
        })
        .catch(err =>
            console.log('Ошибка:', err)
        ) 
        .finally(() => {
            loading (buttonFormDeleteCard, false, 'Удаление...', 'Да')
        }) 
}

formDeleteCard.addEventListener('submit', handleDeleteSubmit);

// @todo: Плавное открытие и закрытие попапов
popups.forEach (function (popup) {
    popup.classList.add('popup_is-animated');
  })

// @todo: Вывести карточки на страницу
// initialCards.forEach(function(element) {
//     placeContainer.append(createPlace(element, deleteCard, openPopupImage, likeCard))
// });

//включение валидации вызовом enableValidation
enableValidation(validationConfig); 

//уведомление пользователя о процессе загрузки
function loading (button, load, loadText = 'Сохранение...', defaultText = 'Сохранить') {

    if (load) {
        button.textContent = loadText;   
    }
    else {
        button.textContent = defaultText;   
    }
}

//для загрузки данных пользователя и карточек 
Promise.all([getInitialCards(), getUser()])
    .then (([cards, user]) => {
        profile = user
        profileName.textContent = user.name
        profileJob.textContent = user.about
        popupNewAvatarOpener.style.backgroundImage = `url(${user.avatar})`;

        cards.forEach((card) => {
            const newCard = createPlace(card, user, openPopupImage, onLikeIcon, handleDelete);
            placeContainer.append(newCard)
        })
    })
    .catch ((err) => {
        console.log('Ошибка:', err);
    })