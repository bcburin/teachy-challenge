import { SwapiSpecies, fetchFromSwapi } from "../apiClients/swapiClient";

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

export async function getSpeciesById(id: number): Promise<Species> {
  const speciesData = await fetchFromSwapi<SwapiSpecies>(`/species/${id}/`);

  const transformedSpecies: Species = {
    name: speciesData.name,
    classification: speciesData.classification,
    designation: speciesData.designation,
    averageHeight: speciesData.average_height,
    averageLifespan: speciesData.average_lifespan,
    hairColors: speciesData.hair_colors.split(", ").map((h) => h.trim()),
    eyeColors: speciesData.eye_colors.split(", ").map((e) => e.trim()),
    skinColors: speciesData.skin_colors.split(", ").map((s) => s.trim()),
    language: speciesData.language,
    homeworld: speciesData.homeworld,
    people: speciesData.people,
    films: speciesData.films,
  };

  return transformedSpecies;
}
