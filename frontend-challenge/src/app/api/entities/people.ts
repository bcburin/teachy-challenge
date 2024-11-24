import { Film, getAllFilms } from "./films";
import { Planet, getAllPlanetsAllPages } from "./planets";
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

const fetchFilmTitlesForPerson = (person: Person, allFilmData: Film[]) => {
  const filmTitles = allFilmData
    .filter((filmData) => person.films.includes(filmData.swapiUrl))
    .map((filmData) => filmData.title);
  person.films = filmTitles;
  return person;
};

const fetchPlanetNamesForPerson = (person: Person, allPlanetData: Planet[]) => {
  const planetName =
    allPlanetData
      .filter((planetData) => person.homeworld == planetData.swapiUrl)
      .map((planetData) => planetData.name)
      .at(0) || "None";
  person.homeworld = planetName;
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
    const allPlanetData = await getAllPlanetsAllPages();
    people = people.map(
      (person) =>
        fetchFilmTitlesForPerson(person, allFilmData) &&
        fetchPlanetNamesForPerson(person, allPlanetData)
    );
  }

  return {
    result: people,
    count: data.count,
  };
}
