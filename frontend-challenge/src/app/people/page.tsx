"use client";

import React, { useEffect, useState } from "react";

import { Person } from "@/app/api/entities/people";
import Table from "../components/Table";
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
                const data = await getAllPeople(currentPage, false);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const columns: Array<keyof Person> = [
        "name",
        "birthYear",
        "gender",
        "height",
        "mass",
        "homeworld",
        "n_species",
        "n_starships",
        "n_vehicles",
    ];

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">People</h1>
            {people && (
                <Table
                    columns={columns}
                    rows={people}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            )}
        </div>
    );
};

export default PeoplePage;
