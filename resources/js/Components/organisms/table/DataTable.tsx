import { DataTablePagination } from "@/Components/molecules/tables/DataTablePagination";
import { DataTableToolbar, DataTableToolbarProps } from "@/Components/molecules/tables/DataTableToolbar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { cn } from "@/lib/utils";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, OnChangeFn, PaginationState, RowSelectionState, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { useState } from "react";
import { ImSpinner10 } from "react-icons/im";
import { PiEmptyLight } from "react-icons/pi";

export function DataTable<T extends Record<string, any>>({
    data,
    total,
    pagination,
    isLoading = true,
    columns,
    onPaginationChange,
    classNames: cns,
    className,
    filters,
    search,
    setSearch,
    sorting,
    setSorting,
    setColumnFilters,
    columnFilters,
    setRowSelection,
    rowSelection,
    setRowId,
    manualPagination = true,
    globalFilter,
}: {
    data: T[];
    setRowId?: (row: T) => string
    columns: ColumnDef<T>[];
    onPaginationChange: OnChangeFn<PaginationState>
    pagination: PaginationState
    isLoading?: boolean
    total: number
    className?: string
    classNames?: {
        thead?: string
        tbody?: string
        trHead?: string
        tr?: string
        th?: string
        td?: string
        tableWrapper?: string
        toolbarWrapper?: string
        footerWrapper?: string
    }
    filters?: DataTableToolbarProps<T>['filters']
    setSearch?: React.Dispatch<React.SetStateAction<string>>
    search?: string
    setSorting?: React.Dispatch<React.SetStateAction<SortingState>>
    sorting?: SortingState
    setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFiltersState>>
    columnFilters?: ColumnFiltersState
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>
    rowSelection?: RowSelectionState
    manualPagination?: boolean
    globalFilter?: string
}) {    
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getRowId: (row, i) => setRowId ? setRowId(row) : i.toString(),
        onRowSelectionChange: setRowSelection,
        manualPagination,
        onPaginationChange,
        rowCount: total,
        state: {
            globalFilter,
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    })

    return (
        <div className={cn("w-full space-y-2", className)}>
            <div className={cns?.toolbarWrapper}>
                <DataTableToolbar 
                    table={table} 
                    filters={filters} 
                    search={search} 
                    onSearch={async (keyword) => setSearch && setSearch(keyword)} 
                />
            </div>
            <div className={cn("rounded-md border", cns?.tableWrapper)}>
                <Table>
                    <TableHeader className={cns?.thead}>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className={cns?.trHead}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={cns?.th}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className={cns?.tbody}>
                        {isLoading ? (
                            <TableRow className={cns?.tr}>
                                <TableCell colSpan={columns.length}>
                                    <div className='w-full flex justify-center items-center text-xl bold text-gray-600 gap-x-3 py-16'>
                                        <ImSpinner10 className='animate-spin' />
                                        Loading
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : (
                            <>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow 
                                        className={cns?.tr}
                                        key={row.id}
                                        data-state={row.getIsSelected() && "selected"}
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={cns?.td}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow className={cns?.tr}>
                                    <TableCell colSpan={columns.length}>
                                        <div className="flex text-center justify-center items-center gap-x-4 py-16 text-xl bold text-gray-600 w-full">
                                            <PiEmptyLight />
                                            No results.
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                            </>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className={cns?.footerWrapper}>
                <DataTablePagination table={table} />
            </div>
        </div>
    )
}