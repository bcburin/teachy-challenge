"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Planet } from "@/app/api/entities/planets";
import { getAllPlanets } from "@/app/api/entities/planets";
import { usePaginatedData } from "../hooks/usePaginatedData";

const PlanetPage = () => {
    const fetchPlanets = useCallback((page: number) => getAllPlanets(page), [])

    const { data: planets, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Planet>(
        fetchPlanets
    );

    const columns: ColumnConfig<Planet>[] = [
        { label: "Name", field: "name", width: "20%" },
        { label: "Climate", field: "climate", width: "15%" },
        { label: "Terrain", field: "terrain", width: "15%", render: (value) => Array.isArray(value) ? value.join(", ") : value },
        { label: "Diameter", field: "diameter", width: "10%", render: (value) => `${value} km` },
        { label: "Population", field: "population", width: "15%", render: (value) => value || "Unknown" },
        { label: "Gravity", field: "gravity", width: "10%" },
        { label: "Rotation Period", field: "rotationPeriod", width: "7%", render: (value) => `${value} hours` },
        { label: "Orbital Period", field: "orbitalPeriod", width: "8%", render: (value) => `${value} days` },
        { label: "Surface Water", field: "surfaceWater", width: "10%", render: (value) => `${value}%` },
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Planets</h1>
            {planets && (
                <Table
                    columns={columns}
                    rows={planets}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default PlanetPage;
