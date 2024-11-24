import {
  SwapiGetAllResult,
  SwapiSpecies,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

export interface Species {
  name: string;
  classification: string;
  designation: string;
  averageHeight: string;
  averageLifespan: string;
  hairColors: string[];
  eyeColors: string[];
  skinColors: string[];
  language: string;
  homeworld: string | null;
  people: string[];
  films: string[];
}

function transform(data: SwapiSpecies): Species {
  return {
    name: data.name,
    classification: data.classification,
    designation: data.designation,
    averageHeight: data.average_height,
    averageLifespan: data.average_lifespan,
    hairColors: data.hair_colors.split(", ").map((h) => h.trim()),
    eyeColors: data.eye_colors.split(", ").map((e) => e.trim()),
    skinColors: data.skin_colors.split(", ").map((s) => s.trim()),
    language: data.language,
    homeworld: data.homeworld,
    people: data.people,
    films: data.films,
  };
}

export async function getSpeciesById(id: number): Promise<Species> {
  const speciesData = await fetchFromSwapi<SwapiSpecies>(`/species/${id}/`);

  return transform(speciesData);
}

export async function getAllSpecies(page: number): Promise<{
  result: Species[];
  count: number;
}> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiSpecies>>(
    `/species/?page=${page}`
  );
  const species = await Promise.all(
    data.results.map((speciesData) => transform(speciesData))
  );
  return {
    result: species,
    count: data.count,
  };
}
