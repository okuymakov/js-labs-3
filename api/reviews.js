export async function getReviews(filmId) {
    return await fetch('http://localhost:5000/api/films/reviews/get?' + new URLSearchParams({
        filmId: filmId
    }))
        .then((response) => response.json());
}
export async function addReview(review) {
    return await fetch('http://localhost:5000/api/films/reviews/add', {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}