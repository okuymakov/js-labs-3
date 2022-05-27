import * as films from '../api/films.js'
import * as reviews from '../api/reviews.js'
import genres from './data/genres.js'
import countries from './data/countries.js'
import years from './data/years.js'

let countriesSelect = document.querySelector('select.countries');
let genresSelect = document.querySelector('select.genres');
let yearsSelect = document.querySelector('select.years');
genres.forEach(el => {
    let option = document.createElement("option");
    option.textContent = el;
    option.value = el;
    genresSelect.appendChild(option);
});
countries.forEach(el => {
    let option = document.createElement("option");
    option.textContent = el;
    option.value = el;
    countriesSelect.appendChild(option);
});
years.forEach(el => {
    let option = document.createElement("option");
    option.textContent = el;
    option.value = el;
    yearsSelect.appendChild(option);
});


await renderFilms();

document.querySelector('.btn.find').addEventListener('click', e => {
    e.preventDefault();
    console.log("click find button...")
    let countries = [...countriesSelect.selectedOptions].map(option => option.value);
    let genres = [...genresSelect.selectedOptions].map(option => option.value);
    let years = [...yearsSelect.selectedOptions].map(option => option.value);
    renderFilms(countries,genres,years);
})

export async function renderFilms(countries,genres,years) {
    let filmsView = document.querySelector('.films');
    let data;
    try {
        data = await films.getFilms(countries,genres,years);
    } catch {
        data = [];
    }
    if(data.length === 0) {
        filmsView.innerHTML = '<div class="empty-film-list">Фильмов нет</div>'
        return;
    }
    let filmsHTML = '<ul class="film-list flex flex-wrap">';
    data.forEach(el => {
        filmsHTML += `
            <li class="film-item">
                <a href = "./film-details.html" class = "film-detailes-ref" data-id=${el._id}>
                    <div class="film-card flex flex-column">
                        <img src="${el.src}" alt="" class="img">
                        <div class="title">${el.name} (${new Date(el.releaseDate).getFullYear()})</div>
                    </div>
                </a>
            </li>
        `
    });
    filmsHTML += '</ul>';
    filmsView.innerHTML = filmsHTML;
    document.querySelectorAll('.film-detailes-ref').forEach(el => {
        el.addEventListener('click', (e) => {
            console.log('card click...')
            let id = el.dataset.id;
            localStorage.setItem("filmId",id);
        });
    });
}


