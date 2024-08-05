// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const placeContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');

initialCards.forEach(function(element) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    function deleteCard(evt) {
    evt.target.closest('.card').remove();
    };
    
    placeElement.querySelector('.card__title').textContent = element.name;
    placeElement.querySelector('.card__image').src = element.link;
    placeElement.querySelector('.card__image').setAttribute('alt', element.name);
    
    const deleteButton = placeElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', deleteCard)
    
    placeContainer.append(placeElement)
    return placeElement;
})



