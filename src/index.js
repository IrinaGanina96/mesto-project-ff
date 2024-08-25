import './styles/index.css';
import {initialCards} from './scripts/cards.js'
import {createPlace, deleteCard, likeCard} from './scripts/card.js'
import {openPopup, closePopup} from './scripts/modal.js'

// @todo: DOM узлы
const container = document.querySelector('.content');
const placeContainer = container.querySelector('.places__list');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupNewCardOpener = document.querySelector('.profile__add-button');
const popupCloser = document.querySelectorAll('.popup__close');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpener = document.querySelector('.profile__edit-button');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const popupImageOpener = document.querySelector('.popup_type_image');
const formElement = document.querySelector('[name="edit-profile"]');
const nameInput = formElement.querySelector('[name="name"]');
const jobInput = formElement.querySelector('[name="description"]');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const formPlase = document.querySelector('[name="new-place"]');
const plaseName = formPlase.querySelector('[name="place-name"]');
const plaseImage = formPlase.querySelector('[name="link"]');
const popups = document.querySelectorAll('.popup');


popupNewCardOpener.addEventListener('click', function() {
    openPopup(popupNewCard)
    plaseName.value = ''
    plaseImage.value = ''
});

popupProfileOpener.addEventListener('click', function() {
    openPopup(popupProfile)
    nameInput.value = profileName.textContent
    jobInput.value =  profileJob.textContent
});

popupCloser.forEach(function (button)  {
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

    profileName.textContent = nameInput.value
    profileJob.textContent = jobInput.value

    closePopup (popupProfile)
}

formElement.addEventListener('submit', handleFormSubmit); 


// @todo: Функция добавления карточки
function handleCardSubmit(evt) {
    evt.preventDefault();

    const plaseNameInput = plaseName.value
    const plaseImageImput = plaseImage.value

    const newCard = createPlace ({name:plaseNameInput, link:plaseImageImput, alt:plaseNameInput}, deleteCard, openPopupImage, likeCard)
    placeContainer.prepend(newCard)

    closePopup (popupNewCard)
}

formPlase.addEventListener('submit', handleCardSubmit);

// @todo: Плавное открытие и закрытие попапов
popups.forEach (function (popup) {
    popup.classList.add('popup_is-animated');
  })

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    placeContainer.append(createPlace(element, deleteCard, openPopupImage, likeCard))
});