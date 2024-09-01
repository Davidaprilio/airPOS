import PageTitle from '@/Components/atoms/PageTitle'
import DashLayout from '@/Layouts/DashLayout'
import { PageProps, Paginate } from '@/types'

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Checkbox } from "@/Components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { DataTable } from '@/Components/organisms/table/DataTable'
import useDataTable from '@/hooks/useDataTable'
export type Unit = {
    id: number
    is_universal: boolean
    name: string
    parent: null | {
        id: number
        name: string
    }
    symbol: string
    conversion_factor: number
    type: string
}

export const columns: ColumnDef<Unit>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                className='ml-2'
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: "Nama",
        cell: ({ row }) => {
            return (
                <div className="capitalize">{row.getValue("name")}</div>
            )
        },
    },
    {
        accessorKey: "symbol",
        header: ({ table, column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Simbol
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "type_unit",
        header: "Tipe",
        cell: ({ row: { original } }) => <span className='lowercase'>{original.type}</span>,
    },
    {
        accessorKey: "conversion_factor",
        header: () => <div className="text-right">Faktor Konversi</div>,
        cell: ({ row: { original } }) => {
            const formated = new Intl.NumberFormat('id-ID').format(original.conversion_factor)

            return <div className="text-right">{formated} {original.parent?.name ?? original.name}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const units = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(units.id.toString())}
                        >
                            Copy units ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export default function List({}: PageProps<{}>) {
    const {attrs} = useDataTable<Unit>('/api/units')

    return (
        <DashLayout title="Unit">
            <PageTitle>Satuan Dasar</PageTitle>

            <main>
                <DataTable {...attrs} columns={columns} />
            </main>
        </DashLayout>
    )
}
