import { useEffect, useState } from "react";
import useDebounce from "./useDebounce";
import { useFetchDataTable } from "./useFetchDataTable";
import { usePagination } from "./usePagination";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export default function useDataTable<T extends Record<string, unknown>>(url: string, opts?: {
    searchDebounceTime?: number
}) {
    const { limit, onPaginationChange, page, pagination, reset } = usePagination();
    const [keyword, setKeyword] = useState('')
    const [search, setSearch] = useDebounce<string>('', opts?.searchDebounceTime ?? 500, (val) => {
        reset()
        setKeyword(val);
    })

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])

    const {data, isLoading, total} = useFetchDataTable<T>(url, {
        pagination: {page, limit},
        search: keyword,
        filter: columnFilters,
        sort:  sorting,
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
            sorting,
            setSorting,
            setRowSelection,
            rowSelection,
            columnFilters,
            setColumnFilters,
        }
    }
}
