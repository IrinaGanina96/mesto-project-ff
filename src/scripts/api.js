const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-23',
    headers: {
      authorization: 'a1d09a43-e0ce-4e49-b393-16f9fc49b527',
      'Content-Type': 'application/json'
    }
  }

const handleResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
}

  export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers
    })
      .then(handleResponse);
  } 

  export const getUser = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers
    })
      .then(handleResponse);
  } 

  export const editProfile = (profileName, profileAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: profileName.value,
        about: profileAbout.value
      })
    })
    .then(handleResponse);
  } 

  export const addCard = (plaseName, plaseImage) => {
    return fetch(`${config.baseUrl}/cards`, {
      method: 'POST',
      headers: config.headers,
      body: JSON.stringify({
        name: plaseName.value,
        link: plaseImage.value
      })
    })
    .then(handleResponse);
  } 

  export const changeAvatar = (avatarImage) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        avatar: avatarImage.value
      })
    })
    .then(handleResponse);
  }

  export const changeLike = (cardId, like) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: like ? 'PUT' : 'DELETE',
      headers: config.headers,
      })
    .then(handleResponse);
  }

  export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: config.headers,
    })
    .then(handleResponse);
  }




