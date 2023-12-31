let modalObj = document.getElementById('modal');

let closeModalBtn = modalObj.querySelector('#modal-close');
let modalTitle = modalObj.querySelector('#modal-title');
let modalBody = modalObj.querySelector('#modal-body');


function initializeModal(title, body) {

    modalTitle.textContent = title;
    modalBody.innerHTML = body;

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
