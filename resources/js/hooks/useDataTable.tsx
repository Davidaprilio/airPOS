import { FetchApiOpt, useFetchDataTable } from "./useFetchDataTable";
import { usePagination } from "./usePagination";

export default function useDataTable<T extends Record<string, unknown>>(url: string,) {
    const { limit, onPaginationChange, page, pagination } = usePagination();
    const {data, isLoading, total} = useFetchDataTable<T>(url, {
        pagination: {page, limit}
    })
  
    return {
        data,
        total,
        isLoading,

        limit,
        page,
        attrs: {
            data,
            onPaginationChange,
            pagination,
            isLoading,
            total,
        }
    }
}
