import * as films from '../api/films.js'
import * as reviews from '../api/reviews.js'
import FilmReview from '../models/filmReview.js'

let id = localStorage.getItem('filmId');
let data = await films.getFilmById(id);
document.querySelector('.film-details .film-img').src = data.src;
document.querySelector('.film-details .film-name').textContent = data.name + ` (${new Date(data.releaseDate).getFullYear()})`;

document.querySelector('.film-info-country').textContent = data.country;
document.querySelector('.film-info-genres').textContent = data.genres.join(', ');
document.querySelector('.film-info-directors').textContent = data.directors.join(', ');
document.querySelector('.film-info-scenario').textContent = data.scenario.join(', ');
document.querySelector('.film-info-producers').textContent = data.producers.join(', ');
document.querySelector('.film-info-оperators').textContent = data.оperators.join(', ');
document.querySelector('.film-info-composers').textContent = data.composers.join(', ');
document.querySelector('.film-info-budget').textContent = '$ ' + data.budget.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
document.querySelector('.film-info-boxOffice').textContent = '$ ' + data.boxOffice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
document.querySelector('.film-info-ageRate').textContent = data.ageRate + '+';
document.querySelector('.film-info-runtime').textContent = data.runtime + ' мин.';
document.querySelector('.film-info-releaseDate').textContent = new Date(data.releaseDate).toLocaleDateString();
renderReviews();
const rateSelect = document.querySelector('.review-rate-input');
for(let i = 0; i <= 10; i++) {
    let option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    rateSelect.appendChild(option);
};
rateSelect.value = '5';

const inputs = document.querySelectorAll('input,textarea');
const addBtn = document.querySelector('.add-new-review.btn');
const removeBtn = document.querySelector('.delete-film');
inputs.forEach(el => {
    el.addEventListener('input', e => {
        e.preventDefault();
        let readyToSubmit = !Array.from(inputs)
            .map(input => input.value)
            .some(value => value == '');
        addBtn.disabled = !readyToSubmit;
    });
});

addBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let review = new FilmReview(
        document.querySelector('.review-name-input').value,
        document.querySelector('.review-role-input').value,
        document.querySelector('.review-text-input').value,
        parseInt(document.querySelector('.review-rate-input').value),
        id
    );
    await reviews.addReview(review);
    renderReviews();
    clearInputs();
});
removeBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await films.deleteFilm(id);
    removeBtn.textContent = 'Фильм удален'
    window.location.replace("./index.html");
});

function clearInputs() {
    inputs.forEach(el => el.value = '');
    rateSelect.value = '5';
}
async function renderReviews() {
    let reviewsData = await reviews.getReviews(id);
    let reviewsHTML = '<ul class="review-list">';
    reviewsData.forEach(review => {
        reviewsHTML += `
        <li class="review-item">
            <div class="review flex">
                <div class="left flex flex-column">
                    <div class="review-name">${review.author}</div>
                    <div class="review-role">${review.authorRole}</div>
                    <div class="review-rate">Рейтинг: ${review.rate}</div>
                </div>
                <div class="review-text right">${review.text}</div>
            </div>
        </li>
    `;
    });
    reviewsHTML += '</ul>';
    document.querySelector('.film-reviews-content').innerHTML = reviewsHTML;
}