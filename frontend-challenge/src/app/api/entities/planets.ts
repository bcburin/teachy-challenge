import { SwapiPlanet, fetchFromSwapi } from "../apiClients/swapiClient";

export interface Planet {
  name: string;
  climate: string;
  terrain: string[];
  diameter: string;
  population: string;
  gravity: string;
  rotationPeriod: string;
  orbitalPeriod: string;
  surfaceWater: string;
  films: string[];
  residents: string[];
}

export async function getPlanetById(id: number): Promise<Planet> {
  const planetData = await fetchFromSwapi<SwapiPlanet>(`/planets/${id}/`);

  const transformedPlanet: Planet = {
    name: planetData.name,
    climate: planetData.climate,
    terrain: planetData.terrain.split(", ").map((t) => t.trim()),
    diameter: planetData.diameter,
    population: planetData.population,
    gravity: planetData.gravity,
    rotationPeriod: planetData.rotation_period,
    orbitalPeriod: planetData.orbital_period,
    surfaceWater: planetData.surface_water,
    films: planetData.films,
    residents: planetData.residents,
  };

  return transformedPlanet;
}
