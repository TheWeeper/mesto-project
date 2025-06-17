import '../pages/index.css';
import avatar from '../images/avatar.jpg';

import { enableValidation, resetValidation } from "../components/validate.js";
import { openModal, closeModal } from "../components/modal.js";
import { createCard } from "../components/card.js";
import { initialCards } from "./cards.js";

const main = document.querySelector('.content');
const placesSection = main.querySelector('.places.page__section');
const placesList = placesSection.querySelector('.places__list');

const profilePopup = document.querySelector('.popup_type_edit');
const cardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');

const profileEditButton = main.querySelector('.profile__edit-button');
const profilePopupCloseButton = profilePopup.querySelector('.popup__close');
const profileFormElement = profilePopup.querySelector('.popup__form');
const nameInput = profileFormElement.querySelector('.popup__input_type_name');
const jobInput = profileFormElement.querySelector('.popup__input_type_description');

const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

const cardAddButton = main.querySelector('.profile__add-button');
const cardPopupCloseButton = cardPopup.querySelector('.popup__close');
const cardFormElement = cardPopup.querySelector('.popup__form');
const cardNameInput = cardFormElement.querySelector('.popup__input_type_card-name');
const cardLinkInput = cardFormElement.querySelector('.popup__input_type_url');

const imagePopupCloseButton = imagePopup.querySelector('.popup__close');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

const profileImage = document.querySelector('.profile__image');
profileImage.style.backgroundImage = `url(${avatar})`;

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
function handleProfileFormSubmit(evt) {
    evt.preventDefault();

    const name = nameInput.value;
    const job = jobInput.value;

    profileName.textContent = name;
    profileJob.textContent = job;
    closeModal(profilePopup);
}

function handleCardFormSubmit(evt) {
    evt.preventDefault();

    const nameValue = cardNameInput.value;
    const linkValue = cardLinkInput.value;
    const newCard = createCard(nameValue, linkValue);
    placesList.prepend(newCard);
    closeModal(cardPopup);
    cardFormElement.reset();
    resetValidation(cardFormElement, validationSettings);
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

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link));
});

enableValidation(validationSettings);