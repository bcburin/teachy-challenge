"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Person } from "@/app/api/entities/people";
import { getAllPeople } from "@/app/api/entities/people";
import { usePaginatedData } from "../hooks/usePaginatedData";

const PeoplePage = () => {
    const fetchPeople = useCallback((page: number) => getAllPeople(page, true), []);

    const { data: people, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Person>(
        fetchPeople
    );

    const columns: ColumnConfig<Person>[] = [
        { label: "Name", field: "name", width: "15%" },
        { label: "Birth Year", field: "birthYear", width: "5%" },
        { label: "Gender", field: "gender", width: "5%" },
        { label: "Height", field: "height", width: "5%", render: (value) => `${value} cm` },
        { label: "Mass", field: "mass", width: "5%", render: (value) => `${value} kg` },
        { label: "Homeworld", field: "homeworld", width: "10%" },
        { label: "Starships", field: "n_starships", width: "5%", render: (value) => value || "0" },
        { label: "Movies", field: "films", width: "40%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" },
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">People</h1>
            {people && (
                <Table
                    columns={columns}
                    rows={people}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default PeoplePage;
