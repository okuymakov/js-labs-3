export async function getFilms(countries, genres, years) {
    return await fetch('http://localhost:5000/api/films/get?' + new URLSearchParams({
        countries: countries, genres: genres, years: years
    }))
        .then((response) => response.json());
}

export async function getFilmById(id) {
    return await fetch('http://localhost:5000/api/films/getById?' + new URLSearchParams({
        id: id
    }))
        .then((response) => response.json());

}

export async function addFilm(film) {
    return await fetch('http://localhost:5000/api/films/add', {
        method: 'POST',
        body: JSON.stringify(film),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function deleteFilm(id) {
    await fetch('http://localhost:5000/api/films/delete', {
        method: 'DELETE',
        body: JSON.stringify({ id: id }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
