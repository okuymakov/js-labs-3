let modal = document.querySelector(".modal");


let btn = document.querySelector(".btn.add");


btn.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = "block";
});

window.addEventListener('click', e => {
    if (e.target == modal) {
        modal.style.display = "none";
    }
});
