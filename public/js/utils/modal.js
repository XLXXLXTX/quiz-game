let modalObj = document.getElementById('modal');

let closeModalBtn = modalObj.querySelector('#modal-close');
let modalTitle = modalObj.querySelector('#modal-title');
let modalBody = modalObj.querySelector('#modal-body');
let modalWindow = modalObj.querySelector('#modal-content');

function initializeModal(title, body, sizew, sizeh) {

    modalTitle.textContent = title;
    modalBody.innerHTML = body;

    if (!modalWindow) {
        alert('!modalWindow');
    }


    if (sizew !== undefined) {
        modalWindow.style.width = sizew;
    }

    if (sizeh !== undefined) {
        modalWindow.style.height = sizeh;
    }

    showModal();
}

function showModal() {

    if (modalObj === undefined) {
        console.error("showModal(): modal is undefined");
        return;
    }

    modalObj.style.display = 'block';

}

function closeModal() {

    if (modalObj === undefined) {
        console.error("closeModal(): modal is undefined");
        return;
    }

    modalObj.style.display = 'none';

}

// close modal when click on close (X) button
if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });
} else {
    console.error('closeModal.addEventListener(): The element #modal-close was not found');
}

// close modal when click outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});


export { initializeModal };
