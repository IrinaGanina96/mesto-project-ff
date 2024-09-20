import {changeLike} from './api.js'

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createPlace(card, user, openPopupImage, onLikeIcon, handleDelete)  {
    const placeElement = cardTemplate.cloneNode(true);
    const cardText = placeElement.querySelector('.card__title');
    const deleteButton = placeElement.querySelector('.card__delete-button');
    const cardImage = placeElement.querySelector('.card__image');
    const likeButton = placeElement.querySelector('.card__like-button');
    const numberLike = placeElement.querySelector('.number__like');
    const cardElement = placeElement.querySelector('.card');
    const cardId = card._id
    const profileId = user._id
    const ownerId = card.owner._id
    const isLiked = card.likes.some(like => like._id === profileId);
    numberLike.textContent = card.likes.length;

    cardText.textContent = card.name;
    cardImage.src = card.link; 
    cardImage.alt = card.name; 

    cardImage.addEventListener('click', () => {
        openPopupImage (card.link, card.name)
    });

    // проверка мой ли лайк стоит
    if (isLiked) {
        likeButton.classList.add("card__like-button_is-active");    
    } 
    
    likeButton.addEventListener('click', () => {
        onLikeIcon (cardId, likeButton, numberLike)
    })

    // проверка моя ли карточка
    if (ownerId !== profileId) {
        deleteButton.classList.add("card__delete-button_inactive");
        deleteButton.disabled = true;    
    }

    deleteButton.addEventListener('click', () => {
        handleDelete (cardId, cardElement)
    });

    return placeElement;
}

// @todo: Функция лайка
function onLikeIcon (cardId, likeButton, numberLike) {
    const isLiked = likeButton.classList.contains("card__like-button_is-active")
    changeLike (cardId, !isLiked)
        .then (result => {
            likeButton.classList.toggle('card__like-button_is-active')
            numberLike.textContent = result.likes.length
        })
        .catch(err =>
            console.log('Ошибка:', err)
        ) 
    }

export {createPlace, onLikeIcon}
