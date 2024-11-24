"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Species } from "@/app/api/entities/species";
import { getAllSpecies } from "@/app/api/entities/species";
import { usePaginatedData } from "../hooks/usePaginatedData";

const SpeciesPage = () => {
    const fetchSpecies = useCallback((page: number) => getAllSpecies(page), []);

    const { data: species, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Species>(
        fetchSpecies
    );

    const columns: ColumnConfig<Species>[] = [
        { label: "Name", field: "name", width: "20%" },
        { label: "Classification", field: "classification", width: "15%" },
        { label: "Designation", field: "designation", width: "10%" },
        { label: "Average Height", field: "averageHeight", width: "10%", render: (value) => `${value} cm` },
        { label: "Average Lifespan", field: "averageLifespan", width: "10%", render: (value) => `${value} years` },
        { label: "Hair Colors", field: "hairColors", width: "15%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
        { label: "Eye Colors", field: "eyeColors", width: "15%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
        { label: "Skin Colors", field: "skinColors", width: "15%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
        { label: "Language", field: "language", width: "10%" },
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Species</h1>
            <Table
                columns={columns}
                rows={species ?? []}
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
                loading={loading}
            />
        </div>
    );
};

export default SpeciesPage;
