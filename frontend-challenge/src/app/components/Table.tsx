import React, { ReactNode } from "react";

type TableProps<T> = {
    columns: Array<keyof T>;
    rows: T[];
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
    loading: boolean;
};

function TableHeader<T>({ columns }: { columns: Array<keyof T> }) {
    return (
        <thead className="bg-gray-800 text-white">
            <tr>
                {columns.map((column) => (
                    <th
                        key={column as string}
                        className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider"
                    >
                        {column as ReactNode}
                    </th>
                ))}
            </tr>
        </thead>
    );
}

function TableRow<T>({
    row,
    columns,
}: {
    row: T;
    columns: Array<keyof T>;
}) {
    return (
        <tr className="bg-white hover:bg-gray-100 even:bg-gray-50">
            {columns.map((column) => (
                <td
                    key={column as string}
                    className="px-6 py-4 text-sm text-gray-700"
                >
                    {row[column] as string | number}
                </td>
            ))}
        </tr>
    );
}

function LoadingRows<T>({ columns }: { columns: Array<keyof T> }) {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="animate-pulse bg-gray-100">
                    {columns.map((_, columnIndex) => (
                        <td
                            key={columnIndex}
                            className="px-6 py-4 text-sm text-gray-500"
                        >
                            <div className="h-4 bg-gray-300 rounded"></div>
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
}

function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) {
    return (
        <div className="flex justify-end items-center p-4 border-t bg-gray-100">
            <div className="flex space-x-2 items-center">
                <button
                    onClick={() => onPageChange(Math.max(1, currentPage - 1))}
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
                        onPageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next
                </button>
            </div>
        </div>
    );
}

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
            <table className="w-full border-collapse">
                <TableHeader columns={columns} />
                <tbody>
                    {loading ? (
                        <LoadingRows columns={columns} />
                    ) : (
                        rows.map((row, index) => (
                            <TableRow key={index} row={row} columns={columns} />
                        ))
                    )}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
}

export default Table;
