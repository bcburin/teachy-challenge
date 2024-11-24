"use client";

import React, { useEffect, useState } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Person } from "@/app/api/entities/people";
import { getAllPeople } from "@/app/api/entities/people";

const PeoplePage = () => {
    const [people, setPeople] = useState<Person[] | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = await getAllPeople(currentPage, true);
                setPeople(data.result);
                setTotalPages(Math.ceil(data.count / data.result.length));
            } catch (err) {
                setError(`Failed to load data: ${err}`);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage]);

    const columns: ColumnConfig<Person>[] = [
        { label: "Name", field: "name", width: "15%" },
        { label: "Birth Year", field: "birthYear", width: "5%" },
        { label: "Gender", field: "gender", width: "5%" },
        { label: "Height", field: "height", width: "5%", render: (value) => `${value} cm` },
        { label: "Mass", field: "mass", width: "5%", render: (value) => `${value} kg` },
        { label: "Homeworld", field: "homeworld", width: "10%" },
        { label: "Starships", field: "n_starships", width: "5%", render: (value) => value || "0" },
        { label: "Movies", field: "films", width: "40%", render: (value) => Array.isArray(value) ? value.join(", ") : "None" }
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
