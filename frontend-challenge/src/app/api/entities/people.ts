import {
  SwapiGetAllResult,
  SwapiPerson,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

import { getFilmsByUrls } from "./films";

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

async function transformPerson(
  personData: SwapiPerson,
  resolveDeps: boolean
): Promise<Person> {
  const films = resolveDeps
    ? (await getFilmsByUrls(personData.films)).map((film) => film.title)
    : personData.films;

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
    films: films,
    n_species: personData.species.length,
    n_starships: personData.starships.length,
    n_vehicles: personData.vehicles.length,
  };

  return transformedPerson;
}

export async function getPersonById(
  id: number,
  resolveDeps: boolean = false
): Promise<Person> {
  const personData = await fetchFromSwapi<SwapiPerson>(`/people/${id}/`);
  return transformPerson(personData, resolveDeps);
}

export async function getAllPeople(
  page: number,
  resolveDeps: boolean = false
): Promise<{ result: Person[]; count: number }> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiPerson>>(
    `/people/?page=${page}`
  );
  const people = await Promise.all(
    data.results.map((personData) => transformPerson(personData, resolveDeps))
  );
  return {
    result: people,
    count: data.count,
  };
}
