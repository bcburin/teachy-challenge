"use client";

import React, { useCallback } from "react";
import Table, { ColumnConfig } from "../components/Table";

import { Film } from "@/app/api/entities/films";
import { getAllFilms } from "@/app/api/entities/films";
import { usePaginatedData } from "../hooks/usePaginatedData";

const FilmPage = () => {
    const fetchFilms = useCallback(() => getAllFilms(), []);

    const { data: films, currentPage, totalPages, loading, error, setCurrentPage } = usePaginatedData<Film>(
        fetchFilms
    );

    const columns: ColumnConfig<Film>[] = [
        { label: "Title", field: "title", width: "15%" },
        { label: "Episode", field: "episodeId", width: "5%" },
        { label: "Opening Crawl", field: "openingCrawl", width: "50%", render: (value) => `${value.toString().slice(0, 240)}...` },
        { label: "Director", field: "director", width: "10%" },
        { label: "Producers", field: "producer", width: "15%", render: (value) => Array.isArray(value) ? value.join(", ") : value },
        { label: "Release Date", field: "releaseDate", width: "5%", render: (value) => new Date(value.toString()).toLocaleDateString() }
    ];

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-gray-800">Films</h1>
            {films && (
                <Table
                    columns={columns}
                    rows={films}
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    loading={loading}
                />
            )}
        </div>
    );
};

export default FilmPage;
