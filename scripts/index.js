// @todo: Темплейт карточки

// @todo: DOM узлы
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

const popups = document.querySelectorAll('.popup');

// @todo: Функция создания карточки
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

// @todo: Функция удаления карточки
function removeCard(evt) {
    evt.target.closest('.places__item').remove();
}

// @todo: Вывести карточки на страницу
function openImagePopup(name, link) {
    imagePopupImage.setAttribute('src', link);
    imagePopupImage.setAttribute('alt', name);
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
}

function handleEscClose(evt){
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closeModal(openedPopup);
        }
    }
}

function handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup_is-opened')) {
        closeModal(evt.target);
    }
}

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('click', handleOverlayClose);
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleOverlayClose);
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
    resetValidation(cardFormElement);
}

function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__input-error_active');
}

function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_type_error');
    errorElement.textContent = '';
    errorElement.classList.remove('popup__input-error_active');
}

function checkInputValidity(formElement, inputElement) {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
}

function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_disabled');
    } else {
        buttonElement.classList.remove('popup__button_disabled');
    }
}

function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
}

function enableValidation() {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
}

function resetValidation(formElement) {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.popup__button');
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement);
    });
    buttonElement.classList.remove('popup__button_disabled');
}



// Слушатели событий
profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openModal(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => {
    closeModal(profilePopup);
    
    resetValidation(profileFormElement);
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

enableValidation();