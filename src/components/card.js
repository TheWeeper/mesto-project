import { openImagePopup } from './index.js';
import { deleteCardElement, likeCard, unlikeCard } from './api.js';

function removeCard(evt) {
    evt.target.closest('.places__item').remove();
}

function createCard(cardData) {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardDescription = cardElement.querySelector('.card__description');

    cardDescription.querySelector('.card__title').textContent = cardData.name;
    const cardImage = cardElement.querySelector('.card__image');
    cardImage.setAttribute('src', cardData.link);
    cardImage.setAttribute('alt', cardData.name);

    const likeCounter = cardDescription.querySelector('.card__like-counter');
    likeCounter.textContent = cardData.likes ? cardData.likes.length : 0;

    cardDescription.querySelector('.card__like-button').addEventListener('click', (evt) => {
        const isLiked = evt.target.classList.contains('card__like-button_is-active');
        if (isLiked) {
            unlikeCard(cardData._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
            })
            .catch(err => console.error(`Ошибка при снятии лайка: ${err}`));
        } else {
            likeCard(cardData._id)
            .then((res) => {
                likeCounter.textContent = res.likes.length;
            })
            .catch(err => console.error(`Ошибка при добавлении лайка: ${err}`));
        }
        evt.target.classList.toggle('card__like-button_is-active');
    }
    );

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', (evt) => {
        const cardId = cardData._id;
        deleteCardElement(cardId)
        .then(() => {
            removeCard(evt);
        })
        .catch(err => console.error(`Ошибка при удалении карточки: ${err}`));
        }
        );



    cardImage.addEventListener('click', () => {
        openImagePopup(cardData.name, cardData.link);
    }
    );

    return cardElement;
}

export { createCard };

