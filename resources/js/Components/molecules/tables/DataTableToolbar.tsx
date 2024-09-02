"use client"

import { Table } from "@tanstack/react-table"
import { IoSearchOutline } from "react-icons/io5";
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { DataTableFacetedFilter, DataTableFacetedFilterOption } from "@/Components/molecules/tables/DataTableFacetedFilter"
import { RxCross2 } from "react-icons/rx"
import { DataTableViewOptions } from "./DataTableViewOption"

export interface DataTableToolbarProps<TData> {
    table: Table<TData>
    onSearch?: (keyword: string) => Promise<void>,
    search?: string
    filters?: {
        columnId: string
        title: string
        options: DataTableFacetedFilterOption[]
    }[]
}

export function DataTableToolbar<TData>({
    table,
    search,
    onSearch,
    filters,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <div className="flex items-center px-3 border rounded-lg" cmdk-input-wrapper="">
                    <IoSearchOutline className="w-4 shrink-0 opacity-50" />
                    <Input
                        placeholder="Search in table ..."
                        value={search}
                        onChange={(event) => onSearch && onSearch(event.target.value)}
                        className="h-8 w-[150px] lg:w-[250px] flex bg-transparent py-0 text-sm outline-none border-none focus:ring-0 placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                {filters?.length && (
                    <>
                        {filters.map((filter, i) => table.getColumn(filter.columnId) && (
                            <DataTableFacetedFilter
                                key={i}
                                column={table.getColumn(filter.columnId)}
                                title={filter.title}
                                options={filter.options}
                            />
                        ))}
                        {isFiltered && (
                            <Button
                                variant="ghost"
                                onClick={() => table.resetColumnFilters()}
                                className="h-8 px-2 lg:px-3"
                            >
                                Reset
                                <RxCross2 className="ml-2 h-4 w-4" />
                            </Button>
                        )}
                    </>
                )}
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}