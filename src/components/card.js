import { openImagePopup } from './index.js';

function removeCard(evt) {
    evt.target.closest('.places__item').remove();
}

function createCard(nameValue, linkValue) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDescription = cardElement.querySelector('.card__description');

    cardDescription.querySelector('.card__title').textContent = nameValue;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', linkValue);
    cardImage.setAttribute('alt', nameValue);

    cardDescription.querySelector('.card__like-button').addEventListener('click', (evt) => {
        evt.target.classList.toggle('card__like-button_is-active');
    }
    );

    cardElement.querySelector('.card__delete-button').addEventListener('click', removeCard);

    cardImage.addEventListener('click', () => {
        openImagePopup(nameValue, linkValue);
    }
    );

    return cardElement;
}

export { createCard };

