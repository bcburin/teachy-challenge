"use client"

import React from "react";

interface TableProps<T> {
    columns: Array<keyof T>; // Column keys
    rows: T[]; // Data rows
    totalPages: number; // Total number of pages
    currentPage: number; // Current page number
    onPageChange: (page: number) => void; // Callback for page changes
}

function Table<T>({
    columns,
    rows,
    totalPages,
    currentPage,
    onPageChange,
}: TableProps<T>) {
    return (
        <div>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        {columns.map((col) => (
                            <th key={String(col)} className="px-4 py-2 border border-gray-300 text-left">
                                {String(col)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className={rowIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                            {columns.map((col) => (
                                <td key={String(col)} className="px-4 py-2 border border-gray-300">
                                    {row[col] as React.ReactNode}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;
