"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Vehicle } from "@/app/api/entities/vehicles";
import { getAllVehicles } from "@/app/api/entities/vehicles";
import { usePaginatedData } from "../hooks/usePaginatedData";

const VehiclePage = () => {
    const fetchVehicles = useCallback((page: number) => getAllVehicles(page), []);

    const { data: vehicles, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Vehicle>(
        fetchVehicles
    );

    const columns: ColumnConfig<Vehicle>[] = [
        { label: "Name", field: "name", width: "15%" },
        { label: "Model", field: "model", width: "15%" },
        { label: "Class", field: "vehicleClass", width: "10%" },
        { label: "Manufacturer", field: "manufacturer", width: "20%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
        { label: "Cost", field: "costInCredits", width: "10%", render: (value) => value || "Unknown" },
        { label: "Length", field: "length", width: "10%", render: (value) => `${value} m` },
        { label: "Crew", field: "crew", width: "10%" },
        { label: "Passengers", field: "passengers", width: "10%" },
        { label: "Max Speed", field: "maxAtmospheringSpeed", width: "10%", render: (value) => `${value} km/h` },
        { label: "Cargo Capacity", field: "cargoCapacity", width: "10%", render: (value) => `${value} kg` },
        { label: "Consumables", field: "consumables", width: "10%" },
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Vehicles</h1>
            {vehicles && (
                <Table
                    columns={columns}
                    rows={vehicles}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default VehiclePage;
