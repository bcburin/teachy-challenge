import {
  SwapiGetAllResult,
  SwapiStarship,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

export interface Starship {
  name: string;
  model: string;
  starshipClass: string;
  manufacturer: string[];
  costInCredits: string;
  length: string;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: string;
  hyperdriveRating: string;
  MGLT: string;
  cargoCapacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
}

function transform(data: SwapiStarship): Starship {
  return {
    name: data.name,
    model: data.model,
    starshipClass: data.starship_class,
    manufacturer: data.manufacturer.split(", ").map((m) => m.trim()),
    costInCredits: data.cost_in_credits,
    length: data.length,
    crew: data.crew,
    passengers: data.passengers,
    maxAtmospheringSpeed: data.max_atmosphering_speed,
    hyperdriveRating: data.hyperdrive_rating,
    MGLT: data.MGLT,
    cargoCapacity: data.cargo_capacity,
    consumables: data.consumables,
    films: data.films,
    pilots: data.pilots,
  };
}

export async function getStarshipById(id: number): Promise<Starship> {
  const starshipData = await fetchFromSwapi<SwapiStarship>(`/starships/${id}/`);

  return transform(starshipData);
}

export async function getAllStarships(page: number): Promise<{
  result: Starship[];
  count: number;
}> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiStarship>>(
    `/starships/?page=${page}`
  );
  const starships = await Promise.all(
    data.results.map((starshipData) => transform(starshipData))
  );
  return {
    result: starships,
    count: data.count,
  };
}
