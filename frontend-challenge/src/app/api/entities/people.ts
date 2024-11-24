import { Film, getAllFilms } from "./films";
import {
  SwapiGetAllResult,
  SwapiPerson,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

export interface Person {
  name: string;
  birthYear: string;
  eyeColor: string;
  gender: string;
  hairColor: string;
  height: number;
  mass: number;
  skinColor: string;
  homeworld: string;
  films: string[];
  n_species: number;
  n_starships: number;
  n_vehicles: number;
}

function transformPerson(personData: SwapiPerson): Person {
  const transformedPerson: Person = {
    name: personData.name,
    birthYear: personData.birth_year,
    eyeColor: personData.eye_color,
    gender: personData.gender,
    hairColor: personData.hair_color,
    height: parseInt(personData.height, 10) || 0,
    mass: parseFloat(personData.mass) || 0,
    skinColor: personData.skin_color,
    homeworld: personData.homeworld,
    films: personData.films,
    n_species: personData.species.length,
    n_starships: personData.starships.length,
    n_vehicles: personData.vehicles.length,
  };

  return transformedPerson;
}

export async function getPersonById(id: number): Promise<Person> {
  const personData = await fetchFromSwapi<SwapiPerson>(`/people/${id}/`);
  return transformPerson(personData);
}

const getIdFromUrl = (url: string) =>
  parseInt(
    url
      .substring(0, url.length - 1)
      .split("/")
      .at(-1) ?? "",
    10
  ) || 0;

const fetchFilmTitlesForPerson = (person: Person, allFilmData: Film[]) => {
  const filmIds = person.films.map((filmUrl) => getIdFromUrl(filmUrl));
  const filmTitles = allFilmData
    .filter((filmData) => filmIds.includes(filmData.episodeId))
    .map((filmData) => filmData.title);
  person.films = filmTitles;
  return person;
};

export async function getAllPeople(
  page: number,
  resolveDeps: boolean = false
): Promise<{ result: Person[]; count: number }> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiPerson>>(
    `/people/?page=${page}`
  );
  let people = data.results.map((personData) => transformPerson(personData));
  if (resolveDeps) {
    const allFilmData = (await getAllFilms()).result;
    for (let i = 0; i < people.length; i++) {
      fetchFilmTitlesForPerson(people[i], allFilmData);
    }
    people = people.map((person) =>
      fetchFilmTitlesForPerson(person, allFilmData)
    );
  }
  return {
    result: people,
    count: data.count,
  };
}
