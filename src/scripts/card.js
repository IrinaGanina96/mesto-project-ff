// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
function createPlace(element, deleteCard, openPopupImage, likeCard)  {
    const placeElement = cardTemplate.cloneNode(true);
    const cardText = placeElement.querySelector('.card__title');
    const deleteButton = placeElement.querySelector('.card__delete-button');
    const cardImage = placeElement.querySelector('.card__image');
    const like = placeElement.querySelector('.card__like-button');

    cardText.textContent = element.name;
    cardImage.src = element.link; 
    cardImage.alt = element.name; 

    cardImage.addEventListener('click', function () {
        openPopupImage(element.link, element.name)
    });
    
    deleteButton.addEventListener('click', deleteCard);
    like.addEventListener('click', likeCard);

    return placeElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// @todo: Функция лайка
function likeCard (evt) {
    if (evt.target.classList.contains('card__like-button')) {
        evt.target.classList.toggle('card__like-button_is-active');
    }
}

export {createPlace, deleteCard, likeCard}