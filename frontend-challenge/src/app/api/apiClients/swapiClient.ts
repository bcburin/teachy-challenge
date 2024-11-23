import axios from "axios";
import { setCache } from "@/app/store/swapiSlice";
import { store } from "@/app/store/index";

export const SWAPI_BASE_URL = "https://swapi.dev/api";

// Fetch data from SWAPI and handle caching via Redux
export async function fetchFromSwapi<T extends SwapiResult>(
  endpoint: string
): Promise<T> {
  const now = Date.now();

  // Get the cache from the Redux store
  const state = store.getState();
  const cachedData = state.swapi.cache[endpoint];

  if (cachedData && cachedData.expiry > now) {
    return cachedData.data as T;
  }

  try {
    const response = await axios.get<T>(`${SWAPI_BASE_URL}${endpoint}`);
    const data = response.data;

    store.dispatch(
      setCache({
        endpoint,
        data,
        expiry: now + 30 * 60 * 1000, // Cache for 30 minutes
      })
    );

    return data;
  } catch (error) {
    console.error(`Error fetching from SWAPI: ${endpoint}`, error);
    throw new Error("Failed to fetch data from SWAPI.");
  }
}

// SWAPI interfaces
export type SwapiEntity =
  | SwapiPerson
  | SwapiFilm
  | SwapiPlanet
  | SwapiSpecies
  | SwapiStarship
  | SwapiVehicle;

export type SwapiResult = SwapiEntity | SwapiGetAllResult<SwapiEntity>;

export interface SwapiGetAllResult<T extends SwapiEntity> {
  count: number;
  next: string;
  previous: string;
  results: T[];
}

export interface SwapiPerson {
  name: string;
  birth_year: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  species: string[];
  starships: string[];
  vehicles: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiFilm {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface SwapiPlanet {
  climate: string;
  created: string;
  diameter: string;
  edited: string;
  films: string[];
  gravity: string;
  name: string;
  orbital_period: string;
  population: string;
  residents: string[];
  rotation_period: string;
  surface_water: string;
  terrain: string;
  url: string;
}

export interface SwapiSpecies {
  average_height: string;
  average_lifespan: string;
  classification: string;
  created: string;
  designation: string;
  edited: string;
  eye_colors: string;
  hair_colors: string;
  homeworld: string | null;
  language: string;
  name: string;
  people: string[];
  films: string[];
  skin_colors: string;
  url: string;
}

export interface SwapiStarship {
  MGLT: string;
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  hyperdrive_rating: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  films: string[];
  pilots: string[];
  starship_class: string;
  url: string;
}

export interface SwapiVehicle {
  cargo_capacity: string;
  consumables: string;
  cost_in_credits: string;
  created: string;
  crew: string;
  edited: string;
  length: string;
  manufacturer: string;
  max_atmosphering_speed: string;
  model: string;
  name: string;
  passengers: string;
  pilots: string[];
  films: string[];
  vehicle_class: string;
  url: string;
}
