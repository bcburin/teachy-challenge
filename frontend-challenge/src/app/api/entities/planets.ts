import {
  SwapiGetAllResult,
  SwapiPlanet,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

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
  swapiUrl: string;
}

function transformPlanet(planetData: SwapiPlanet): Planet {
  return {
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
    swapiUrl: planetData.url,
  };
}

export async function getPlanetById(id: number): Promise<Planet> {
  const planetData = await fetchFromSwapi<SwapiPlanet>(`/planets/${id}/`);

  return transformPlanet(planetData);
}

export async function getAllPlanets(page: number): Promise<{
  result: Planet[];
  count: number;
}> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiPlanet>>(
    `/planets/?page=${page}`
  );
  const planets = await Promise.all(
    data.results.map((planetData) => transformPlanet(planetData))
  );
  return {
    result: planets,
    count: data.count,
  };
}

export async function getAllPlanetsAllPages(): Promise<Planet[]> {
  let currentPage = 1;
  let allPlanets: Planet[] = [];
  let totalPlanets = 0;

  do {
    const { result: planets, count } = await getAllPlanets(currentPage);
    allPlanets = allPlanets.concat(planets);

    // Determine the total pages based on the first request
    if (currentPage === 1) {
      totalPlanets = count;
    }

    currentPage++;
  } while (allPlanets.length < totalPlanets);

  return allPlanets;
}
