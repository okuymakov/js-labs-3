import Film from "../models/film.js";
import { addFilm } from "../api/films.js";
import { renderFilms } from "./films.js"
const inputs = document.querySelectorAll('.add-new-films-form input');
const addBtn = document.querySelector('.add-film.btn');
inputs.forEach(el => {
    el.addEventListener('input', () => {
        let readyToSubmit = !Array.from(inputs)
            .filter(input => input.type == 'text')
            .map(input => input.value)
            .some(value => value == '');
        readyToSubmit = readyToSubmit & !Array.from(inputs)
            .filter(input => input.type == 'number')
            .map(input => input.value)
            .some(value => value < 0);
        addBtn.disabled = !readyToSubmit;
    })
});

addBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let film = new Film(
        document.querySelector('.film-name-input').value,
        document.querySelector('.film-country-input').value,
        Array.from(document.querySelectorAll('.film-genres-input')).map(el => el.value),
        Array.from(document.querySelectorAll('.film-directors-input')).map(el => el.value),
        Array.from(document.querySelectorAll('.film-scenario-input')).map(el => el.value),
        Array.from(document.querySelectorAll('.film-producers-input')).map(el => el.value),
        Array.from(document.querySelectorAll('.film-оperators-input')).map(el => el.value),
        Array.from(document.querySelectorAll('.film-composers-input')).map(el => el.value),
        document.querySelector('.film-budget-input').value,
        document.querySelector('.film-boxOffice-input').value,
        document.querySelector('.film-ageRate-input').value,
        document.querySelector('.film-runtime-input').value,
        document.querySelector('.film-releaseDate-input').value,
        document.querySelector('.film-src-input').value
    )
    await addFilm(film);
    document.querySelector(".modal").style.display = 'none';
    renderFilms();
    clearInputs();
})

document.querySelectorAll('.input-array-add').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        let inputArray = document.querySelector('.' + el.dataset.for);
        let input = inputArray.lastElementChild.cloneNode(true);
        input.value = '';
        inputArray.append(input);
    })
});
document.querySelectorAll('.input-array-remove').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        let inputArray = document.querySelector('.' + el.dataset.for);
        if (inputArray.childElementCount > 1) {
            let input = inputArray.lastChild;
            inputArray.removeChild(input);
        }
    })
});

function clearInputs() {
    inputs.forEach(el => el.value = '');
}

