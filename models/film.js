export default class Film {
    constructor(name, country, genres, directors,
        scenario, producers, оperators, composers,
        budget, boxOffice, ageRate, runtime, releaseDate, src
    ) {
        this.name = name;
        this.country = country;
        this.genres = genres;
        this.directors = directors;
        this.scenario = scenario;
        this.producers = producers;
        this.оperators = оperators;
        this.composers = composers;
        this.budget = budget;
        this.boxOffice = boxOffice;
        this.ageRate = ageRate;
        this.runtime = runtime;
        this.releaseDate = releaseDate;
        this.src = src;
    }
}