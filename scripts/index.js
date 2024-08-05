// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const container = document.querySelector('.content');
const placeContainer = container.querySelector('.places__list');
const addButton = container.querySelector('.profile__add-button');

function addPlase(name, link) {
    const cardTemplate = document.querySelector('#card-template').content;
    const placeElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    placeElement.querySelector('.card__title').textContent = name;  
    placeElement.querySelector('.card__image').src = link;
    placeElement.querySelector('.card__image').setAttribute('alt', name);
    placeContainer.append(placeElement);

    const deleteButton = placeElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', delButton)
 
    return placeElement;
}

function delButton(evt) {
    evt.target.closest('.card').remove();
};

addButton.addEventListener('click', function () {
    const name = document.querySelector('.popup__input_type_url');
    const link = document.querySelector('.popup__input_type_card-name');
    addPlase(name.value, link.value);
  });
;

initialCards.forEach(function(placeElement) {
    placeContainer.append(addPlase(placeElement.name, placeElement.link))
})




