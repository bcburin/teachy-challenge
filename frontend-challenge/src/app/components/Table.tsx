import React from "react";

type TableProps<T> = {
    columns: Array<keyof T>;
    rows: T[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    loading: boolean;
};

function Table<T>({
    columns,
    rows,
    totalPages,
    currentPage,
    onPageChange,
    loading,
}: TableProps<T>) {
    return (
        <div className="rounded-lg shadow-md bg-white overflow-hidden">
            {loading ? (
                <div className="text-center py-6 text-gray-600">Loading...</div>
            ) : (
                <>
                    <table className="w-full border-collapse">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                {columns.map((column) => (
                                    <th
                                        key={column as string}
                                        className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr
                                    key={rowIndex}
                                    className={`${rowIndex % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                        } hover:bg-gray-100`}
                                >
                                    {columns.map((column) => (
                                        <td
                                            key={column as string}
                                            className="px-6 py-4 text-sm text-gray-700"
                                        >
                                            {row[column] as string | number}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-end items-center p-4 border-t bg-gray-100">
                        <div className="flex space-x-2 items-center">
                            <button
                                onClick={() =>
                                    onPageChange(Math.max(1, currentPage - 1))
                                }
                                disabled={currentPage === 1}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <span className="text-sm text-gray-600">
                                Page {currentPage} of {totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    onPageChange(
                                        Math.min(totalPages, currentPage + 1)
                                    )
                                }
                                disabled={currentPage === totalPages}
                                className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}

export default Table;
