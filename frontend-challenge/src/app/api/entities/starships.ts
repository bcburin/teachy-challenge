import { SwapiStarship, fetchFromSwapi } from "../apiClients/swapiClient";

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

export async function getStarshipById(id: number): Promise<Starship> {
  const starshipData = await fetchFromSwapi<SwapiStarship>(`/starships/${id}/`);

  const transformedStarship: Starship = {
    name: starshipData.name,
    model: starshipData.model,
    starshipClass: starshipData.starship_class,
    manufacturer: starshipData.manufacturer.split(", ").map((m) => m.trim()),
    costInCredits: starshipData.cost_in_credits,
    length: starshipData.length,
    crew: starshipData.crew,
    passengers: starshipData.passengers,
    maxAtmospheringSpeed: starshipData.max_atmosphering_speed,
    hyperdriveRating: starshipData.hyperdrive_rating,
    MGLT: starshipData.MGLT,
    cargoCapacity: starshipData.cargo_capacity,
    consumables: starshipData.consumables,
    films: starshipData.films,
    pilots: starshipData.pilots,
  };

  return transformedStarship;
}
