import { useState } from "react";
import { usePagination } from "./usePagination";
import { ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import { PageSizeOption } from "@/Components/molecules/tables/DataTablePagination";

export type HookDataTableOptions = {paginate?: PaginationState & {
    pageSize: PageSizeOption
}}

export default function useDataTable(opt?: HookDataTableOptions) {
    const { limit, onPaginationChange, page, pagination, reset } = usePagination(opt?.paginate);
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
