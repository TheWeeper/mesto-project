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

export { openModal, closeModal };