import React, { ReactNode } from "react";

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
        <div>
            {loading ? (
                <div className="text-center py-4">Loading...</div>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column as string}
                                    className="border border-gray-300 px-4 py-2 text-left"
                                >
                                    {column as ReactNode}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((column) => (
                                    <td
                                        key={column as string}
                                        className="border border-gray-300 px-4 py-2"
                                    >
                                        {row[column] as string | number}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    onClick={() =>
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default Table;
