// @todo: Функция открытия модального окна
function openPopup(element) {
    element.classList.add('popup_is-opened');
    element.addEventListener('click', closePopupOverlay);
    document.addEventListener('keydown', closePopupKey);
  }

// @todo: Функция закрытия модального окна
function closePopup(element) {
    element.classList.remove('popup_is-opened');
    element.removeEventListener('click', closePopupOverlay);
    document.removeEventListener('keydown', closePopupKey);
  }

// @todo: Функция закрытия попапа нажатием на Esc
function closePopupKey (evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector('.popup_is-opened')
        closePopup(popupOpened)
    }
}

// @todo: Функция закрытия попапа кликом на оверлей
function closePopupOverlay (evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.currentTarget)
    }
}

export {openPopup, closePopup}
