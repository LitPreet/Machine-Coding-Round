const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

openModalBtn.addEventListener("click", openModal)
closeModalBtn.addEventListener("click", closeModal)

function openModal()
{
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
function closeModal()
{
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}