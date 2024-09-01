"use client"

import { Table } from "@tanstack/react-table"

import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { DataTableFacetedFilter } from "@/Components/molecules/tables/DataTableFacetedFilter"
import { RxArrowDown, RxArrowRight, RxArrowUp, RxCheckCircled, RxCircle, RxCross2, RxCrossCircled, RxQuestionMark, RxStopwatch } from "react-icons/rx"
import { DataTableViewOptions } from "./DataTableViewOption"


export const labels = [
    {
        value: "bug",
        label: "Bug",
    },
    {
        value: "feature",
        label: "Feature",
    },
    {
        value: "documentation",
        label: "Documentation",
    },
]

export const statuses = [
    {
        value: "backlog",
        label: "Backlog",
        icon: RxQuestionMark,
    },
    {
        value: "todo",
        label: "Todo",
        icon: RxCircle,
    },
    {
        value: "in progress",
        label: "In Progress",
        icon: RxStopwatch,
    },
    {
        value: "done",
        label: "Done",
        icon: RxCheckCircled,
    },
    {
        value: "canceled",
        label: "Canceled",
        icon: RxCrossCircled,
    },
]

export const priorities = [
    {
        label: "Low",
        value: "low",
        icon: RxArrowDown,
    },
    {
        label: "Medium",
        value: "medium",
        icon: RxArrowRight,
    },
    {
        label: "High",
        value: "high",
        icon: RxArrowUp,
    },
]

interface DataTableToolbarProps<TData> {
    table: Table<TData>
}

export function DataTableToolbar<TData>({
    table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-2">
                <Input
                    placeholder="Filter tasks..."
                    value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("title")?.setFilterValue(event.target.value)
                    }
                    className="h-8 w-[150px] lg:w-[250px]"
                />
                {table.getColumn("status") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("status")}
                        title="Status"
                        options={statuses}
                    />
                )}
                {table.getColumn("priority") && (
                    <DataTableFacetedFilter
                        column={table.getColumn("priority")}
                        title="Priority"
                        options={priorities}
                    />
                )}
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
            </div>
            <DataTableViewOptions table={table} />
        </div>
    )
}