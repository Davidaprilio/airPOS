import { useEffect, useState } from "react";
import { usePagination } from "./usePagination";
import { ColumnFiltersState, SortingState } from "@tanstack/react-table";

export default function useDataTable() {
    const { limit, onPaginationChange, page, pagination, reset } = usePagination();
    const [search, setSearch] = useState('')

    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [rowSelection, setRowSelection] = useState({})
    const [sorting, setSorting] = useState<SortingState>([])

    return {
        limit,
        page,
        paginateReset: reset,

        attrs: {
            onPaginationChange,
            pagination,
            search,
            setSearch,
            sorting,
            setSorting,
            setRowSelection,
            rowSelection,
            columnFilters,
            setColumnFilters,
            manualPagination: false,
            globalFilter: search
        }
    }
}
