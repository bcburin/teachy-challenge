import { useEffect, useState } from "react";

interface PaginatedData<T> {
  data: T[] | null;
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
  setCurrentPage: (page: number) => void;
}

export const usePaginatedData = <T>(
  fetchDataFn: (page: number) => Promise<{ result: T[]; count: number }>
): PaginatedData<T> => {
  const [data, setData] = useState<T[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchDataFn(currentPage);
        setData(response.result);
        setTotalPages(Math.ceil(response.count / response.result.length));
      } catch (err) {
        setError(`Failed to load data: ${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage, fetchDataFn]);

  return { data, currentPage, totalPages, loading, error, setCurrentPage };
};
