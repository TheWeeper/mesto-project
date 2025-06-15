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

profileEditButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileJob.textContent;

    openModal(profilePopup);
});

profilePopupCloseButton.addEventListener('click', () => {closeModal(profilePopup)});
profileFormElement.addEventListener('submit', handleProfileFormSubmit);

cardAddButton.addEventListener('click', () => {
    openModal(cardPopup);
}
);

cardPopupCloseButton.addEventListener('click', () => {closeModal(cardPopup)});

cardFormElement.addEventListener('submit', handleCardFormSubmit);

imagePopupCloseButton.addEventListener('click', () => {closeModal(imagePopup)});

profilePopup.classList.add('popup_is-animated');
cardPopup.classList.add('popup_is-animated');
imagePopup.classList.add('popup_is-animated');

function openModal(popup) {      
    popup.classList.add('popup_is-opened');
}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
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
}

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
initialCards.forEach(card => {
    placesList.append(createCard(card.name, card.link));
});

function openImagePopup(name, link) {
    imagePopupImage.setAttribute('src', link);
    imagePopupImage.setAttribute('alt', name);
    imagePopupCaption.textContent = name;
    openModal(imagePopup);
}