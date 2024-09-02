import { useState } from "react";
import useDebounce from "./useDebounce";
import { useFetchDataTable } from "./useFetchDataTable";
import { usePagination } from "./usePagination";

export default function useDataTable<T extends Record<string, unknown>>(url: string, opts?: {
    searchDebounceTime?: number
}) {
    const { limit, onPaginationChange, page, pagination, reset } = usePagination();
    const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useDebounce<string>('', opts?.searchDebounceTime ?? 500, (val) => {
        reset()
        setKeyword(val);
    })

    const {data, isLoading, total} = useFetchDataTable<T>(url, {
        pagination: {page, limit},
        search: keyword,
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
            search,
            setSearch,
        }
    }
}
