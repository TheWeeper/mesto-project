import '../pages/index.css';

import { enableValidation, resetValidation } from "./validate.js";
import { openModal, closeModal } from "./modal.js";
import { createCard } from "./card.js";
import { getUserData, getInitialCards, updateUserData, createCardElement, updateAvatar } from './api.js';

const main = document.querySelector('.content');
const placesSection = main.querySelector('.places.page__section');
const placesList = placesSection.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const profileAvatarPopup = document.querySelector('.popup_type_new-avatar');

const profileEditButton = main.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');

const cardAddButton = main.querySelector('.profile__add-button');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileAvatarForm = profileAvatarPopup.querySelector('.popup__form');
const profileAvatarCloseButton = profileAvatarPopup.querySelector('.popup__close');

const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}


export function openImagePopup(name, link) {
    imagePopupImage.setAttribute('src', link);
    imagePopupImage.setAttribute('alt', name);
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
}

function renderLoading(isLoading, buttonElement) {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
}

function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, profileFormElement.querySelector('.popup__button'));
    const name = nameInput.value;
    const job = jobInput.value;

    updateUserData(name, job)
        .then(() => {
            profileName.textContent = name;
            profileJob.textContent = job;
            closeModal(profilePopup);
        })
        .catch(err => console.error(err))
        .finally(() => {
            renderLoading(false, profileFormElement.querySelector('.popup__button'));
        }
    );
}

function handleProfileAvatarFormSubmit(evt) {
    evt.preventDefault();

    renderLoading(true, profileAvatarForm.querySelector('.popup__button'));

    const avatarUrl = profileAvatarPopup.querySelector('.popup__input_type_avatar-link').value;

    updateAvatar(avatarUrl)
        .then(() => {
            profileAvatar.style.backgroundImage = `url(${avatarUrl})`;
            closeModal(profileAvatarPopup);
            profileAvatarForm.reset();
        })
        .catch(err => console.error(err))
        .finally(() => {
            renderLoading(false, profileAvatarForm.querySelector('.popup__button'));
            resetValidation(profileAvatarForm, validationSettings);
        });
}


function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const cardSubmitButton = cardFormElement.querySelector('.popup__button');

    renderLoading(true, cardSubmitButton);

    const nameValue = cardNameInput.value;
    const linkValue = cardLinkInput.value;

    createCardElement(nameValue, linkValue)
        .then((newCard) => {
            placesList.prepend(createCard(newCard));    
            closeModal(cardPopup);
            cardFormElement.reset();
        })
        .catch(err => console.error(err))
        .finally(() => {
            renderLoading(false, cardSubmitButton);
            resetValidation(cardFormElement, validationSettings);
        });
}

// Слушатели событий
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openModal(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
    resetValidation(profileFormElement, validationSettings);
});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

cardAddButton.addEventListener('click', () => {
    openModal(cardPopup);
}
);

cardPopupCloseButton.addEventListener('click', () => {
    closeModal(cardPopup);
});

cardFormElement.addEventListener('submit', handleCardFormSubmit);

imagePopupCloseButton.addEventListener('click', () => {closeModal(imagePopup)});

profileAvatar.addEventListener('click', () => {
    openModal(profileAvatarPopup);
});

profileAvatarForm.addEventListener('submit', handleProfileAvatarFormSubmit);

profileAvatarCloseButton.addEventListener('click', () => {
    closeModal(profileAvatarPopup);
});

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');
profileAvatarPopup.classList.add('popup_is-animated');


enableValidation(validationSettings);

Promise.all([getUserData(), getInitialCards()])
    .then(([userData, initialCards]) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
        const userId = userData._id;

        initialCards.forEach(card => {
            const newCard = createCard(card);
            if (card.owner._id !== userId) {
                newCard.querySelector('.card__delete-button').style.display = 'none';
            }
            if (card.likes.some(like => like._id === userId)) {
                newCard.querySelector('.card__like-button').classList.add('card__like-button_is-active');
            }
            placesList.append(newCard);
        });
    })
    .catch(err => console.error(err));