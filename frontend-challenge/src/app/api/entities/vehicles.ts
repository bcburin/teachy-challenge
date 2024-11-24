import {
  SwapiGetAllResult,
  SwapiVehicle,
  fetchFromSwapi,
} from "../apiClients/swapiClient";

export interface Vehicle {
  name: string;
  model: string;
  vehicleClass: string;
  manufacturer: string[];
  costInCredits: string;
  length: string;
  crew: string;
  passengers: string;
  maxAtmospheringSpeed: string;
  cargoCapacity: string;
  consumables: string;
  films: string[];
  pilots: string[];
}

function transform(data: SwapiVehicle): Vehicle {
  return {
    name: data.name,
    model: data.model,
    vehicleClass: data.vehicle_class,
    manufacturer: data.manufacturer.split(", ").map((m) => m.trim()),
    costInCredits: data.cost_in_credits,
    length: data.length,
    crew: data.crew,
    passengers: data.passengers,
    maxAtmospheringSpeed: data.max_atmosphering_speed,
    cargoCapacity: data.cargo_capacity,
    consumables: data.consumables,
    films: data.films,
    pilots: data.pilots,
  };
}

export async function getVehicleById(id: number): Promise<Vehicle> {
  const vehicleData = await fetchFromSwapi<SwapiVehicle>(`/vehicles/${id}/`);

  return transform(vehicleData);
}

export async function getAllVehicles(page: number): Promise<{
  result: Vehicle[];
  count: number;
}> {
  const data = await fetchFromSwapi<SwapiGetAllResult<SwapiVehicle>>(
    `/vehicles/?page=${page}`
  );
  const vehicles = await Promise.all(
    data.results.map((planetData) => transform(planetData))
  );
  return {
    result: vehicles,
    count: data.count,
  };
}
