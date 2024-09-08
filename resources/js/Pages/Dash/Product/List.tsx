import { DataTable } from "@/Components/organisms/table/DataTable";
import { Button } from "@/Components/ui/button";
import useDataTableApi from "@/hooks/useDataTableApi";
import DashLayout from "@/Layouts/DashLayout";
import { Unit } from "../Unit/List";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox"
import { DataTableColumnHeader } from "@/Components/molecules/tables/DataTableColumnHeader";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import NavbarLayout from "@/Components/molecules/dash/NavbarLayout";
import { Link } from "@inertiajs/react";
import NavbarTitle from "@/Components/atoms/dash/NavbarTitle";

export const columns: (ColumnDef<Unit> & { headerText?: string })[] = [
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
        headerText: 'ssss',
        header: "Nama",
        cell: ({ row }) => {
            return (
                <div className="capitalize">{row.getValue("name")}</div>
            )
        },
    },
    {
        accessorKey: "symbol",
        header: ({ column }) => <DataTableColumnHeader title="Simbol" column={column} />
    },
    {
        id: 'type',
        accessorKey: "type",
        header: "Tipe",
        cell: ({ row: { original } }) => <span className='lowercase'>{original.type}</span>,
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
    {
        accessorKey: "conversion factor",
        header: () => <div className="text-right">Faktor Konversi</div>,
        cell: ({ row: { original } }) => {
            const formated = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 10 }).format(original.conversion_factor)

            return <div className="text-right">{formated} {original.parent?.name ?? original.name}</div>
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const units = row.original
            return (
                <div className='text-end'>
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
                </div>
            )
        },
    },
]

export default function List() {
    const { attrs } = useDataTableApi<Unit>('/api/units', {
        paginate: {
            pageIndex: 0,
            pageSize: 20
        }
    })

    return (
        <DashLayout>
            <NavbarLayout>
                <div>
                    <NavbarTitle label="Produk" />
                </div>

                <div>
                    <Link href={route('product.create')}>
                        <Button className='bg-primary' size='sm'>Tambah Produk</Button>
                    </Link>
                </div>
            </NavbarLayout>

            <main className='mt-2'>
                <DataTable {...attrs}
                    setRowId={row => row.id.toString()}
                    columns={columns}
                    classNames={{
                        toolbarWrapper: "px-3",
                        tableWrapper: 'border-y border-x-0 rounded-none',
                        footerWrapper: 'sticky bottom-0 bg-white pt-3 pb-2'
                    }}
                />

            </main>
        </DashLayout>
    )
}
