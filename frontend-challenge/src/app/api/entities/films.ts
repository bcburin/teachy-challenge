import { SwapiFilm, fetchFromSwapi } from "../apiClients/swapiClient";

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

export async function getFilmById(id: number): Promise<Film> {
  const filmData = await fetchFromSwapi<SwapiFilm>(`/films/${id}/`);

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

export async function getFilmsByUrls(filmUrls: string[]) {
  try {
    const filmPromises = filmUrls.map((filmUrl) => {
      const filmId =
        parseInt(
          filmUrl
            .substring(0, filmUrl.length - 1)
            .split("/")
            .at(-1) ?? "",
          10
        ) || 0;
      return getFilmById(filmId);
    });

    const films = await Promise.all(filmPromises);

    return films;
  } catch (error) {
    console.error("Error fetching films:", error);
    return [];
  }
}
