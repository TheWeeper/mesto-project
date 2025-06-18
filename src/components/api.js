export { getUserData, getInitialCards, updateUserData, createCardElement, deleteCardElement,
    likeCard, unlikeCard, updateAvatar };

const confing = {
    baseURL: 'https://nomoreparties.co/v1/apf-cohort-202',
    headers: {
        authorization: '503ba882-dae2-43ad-969e-24c71ec054db',
        'Content-Type': 'application/json'
    }
}

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

function getUserData() {
    return fetch(`${confing.baseURL}/users/me`, {
        headers: confing.headers
      })
      .then(res => checkResponse(res));
}

function updateUserData(name, about) {
    return fetch(`${confing.baseURL}/users/me`, {
      method: 'PATCH',
      headers: confing.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then(res => checkResponse(res));
}

function getInitialCards() {
    return fetch(`${confing.baseURL}/cards`, {
        headers: confing.headers
      })
      .then(res => checkResponse(res));
}

function createCardElement(cardName, cardLink) {
    return fetch(`${confing.baseURL}/cards`, {
        method: 'POST',
        headers: confing.headers,
        body: JSON.stringify({
            name: cardName,
            link: cardLink
        })
    })
    .then(res => checkResponse(res));
}

function deleteCardElement(cardId) {
    return fetch(`${confing.baseURL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: confing.headers
    })
    .then(res => checkResponse(res));
}

function likeCard(cardId) {
    return fetch(`${confing.baseURL}/cards/likes/${cardId}`, {
        method: 'PUT',
        headers: confing.headers
    })
    .then(res => checkResponse(res));
}

function unlikeCard(cardId) {
    return fetch(`${confing.baseURL}/cards/likes/${cardId}`, {
        method: 'DELETE',
        headers: confing.headers
    })
    .then(res => checkResponse(res));
}

function updateAvatar(avatarUrl) {
    return fetch(`${confing.baseURL}/users/me/avatar`, {
        method: 'PATCH',
        headers: confing.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(res => checkResponse(res));
}