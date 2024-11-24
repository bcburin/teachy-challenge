import {
  SwapiFilm,
  SwapiGetAllResult,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

export interface Film {
  title: string;
  episodeId: number;
  openingCrawl: string;
  director: string;
  producer: string[];
  releaseDate: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}

function transformFilm(filmData: SwapiFilm) {
  const transformedFilm: Film = {
    title: filmData.title,
    episodeId: filmData.episode_id,
    openingCrawl: filmData.opening_crawl,
    director: filmData.director,
    producer: filmData.producer.split(", ").map((p) => p.trim()),
    releaseDate: filmData.release_date,
    characters: filmData.characters,
    planets: filmData.planets,
    starships: filmData.starships,
    vehicles: filmData.vehicles,
    species: filmData.species,
  };

  return transformedFilm;
}

export async function getFilmById(id: number): Promise<Film> {
  const filmData = await fetchFromSwapi<SwapiFilm>(`/films/${id}/`);

  return transformFilm(filmData);
}

export async function getAllFilms(): Promise<{
  result: Film[];
  count: number;
}> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiFilm>>(`/films/`);
  const films = await Promise.all(
    data.results.map((filmData) => transformFilm(filmData))
  );
  return {
    result: films,
    count: data.count,
  };
}
