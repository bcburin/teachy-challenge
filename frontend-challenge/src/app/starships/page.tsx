"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Starship } from "@/app/api/entities/starships";
import { getAllStarships } from "@/app/api/entities/starships";
import { usePaginatedData } from "../hooks/usePaginatedData";

const StarshipPage = () => {
    const fetchStarships = useCallback((page: number) => getAllStarships(page), []);

    const { data: starships, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Starship>(
        fetchStarships
    );

    const columns: ColumnConfig<Starship>[] = [
        { label: "Name", field: "name", width: "15%" },
        { label: "Model", field: "model", width: "15%" },
        { label: "Class", field: "starshipClass", width: "10%" },
        { label: "Manufacturer", field: "manufacturer", width: "20%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
        { label: "Cost", field: "costInCredits", width: "10%", render: (value) => value || "Unknown" },
        { label: "Length", field: "length", width: "10%", render: (value) => `${value} m` },
        { label: "Crew", field: "crew", width: "10%" },
        { label: "Passengers", field: "passengers", width: "10%" },
        { label: "Hyperdrive Rating", field: "hyperdriveRating", width: "10%" },
        { label: "MGLT", field: "MGLT", width: "10%" },
        { label: "Cargo Capacity", field: "cargoCapacity", width: "10%", render: (value) => `${value} kg` },
        { label: "Consumables", field: "consumables", width: "10%" },
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Starships</h1>
            {starships && (
                <Table
                    columns={columns}
                    rows={starships}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default StarshipPage;
