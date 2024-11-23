import { SwapiVehicle, fetchFromSwapi } from "../apiClients/swapiClient";

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

export async function getVehicleById(id: number): Promise<Vehicle> {
  const vehicleData = await fetchFromSwapi<SwapiVehicle>(`/vehicles/${id}/`);

  const transformedVehicle: Vehicle = {
    name: vehicleData.name,
    model: vehicleData.model,
    vehicleClass: vehicleData.vehicle_class,
    manufacturer: vehicleData.manufacturer.split(", ").map((m) => m.trim()),
    costInCredits: vehicleData.cost_in_credits,
    length: vehicleData.length,
    crew: vehicleData.crew,
    passengers: vehicleData.passengers,
    maxAtmospheringSpeed: vehicleData.max_atmosphering_speed,
    cargoCapacity: vehicleData.cargo_capacity,
    consumables: vehicleData.consumables,
    films: vehicleData.films,
    pilots: vehicleData.pilots,
  };

  return transformedVehicle;
}
