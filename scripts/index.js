// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы
const container = document.querySelector('.content');
const placeContainer = container.querySelector('.places__list');

// @todo: Функция создания карточки
function addPlase(element, deleteCard) {
    const placeElement = cardTemplate.cloneNode(true);
    placeElement.querySelector('.card__title').textContent = element.name;
    const cardImage = placeElement.querySelector('.card__image');
    cardImage.src = element.link; 
    cardImage.alt = element.name; 
    
    const deleteButton = placeElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard);

    return placeElement;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    evt.target.closest('.card').remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(element) {
    placeContainer.append(addPlase(element, deleteCard))
})