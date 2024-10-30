import { DataTable } from '@/Components/organisms/table/DataTable'
import { Button } from '@/Components/ui/button'
import useDataTable from '@/hooks/useDataTable'
import { useFetchDataTable } from '@/hooks/useFetchDataTable'
import DashLayout from '@/Layouts/DashLayout'
import { PiStorefrontDuotone } from 'react-icons/pi'
import { Unit } from '../Unit/List'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/Components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import { Link } from '@inertiajs/react'
import HeaderTitle from '@/Components/atoms/dash/HeaderTitle'


export const columns: (ColumnDef<Unit> & { headerText?: string })[] = [
    {
        accessorKey: "name",
        headerText: 'ssss',
        header: "Nama",
    },
    {
        accessorKey: "symbol",
        header: "Karyawan",
        cell: ({ row: { original } }) => {
            return <a href='#' className="text-left px-5 hover:underline"><span title='Masuk 23 dari 30 karyawan'>23</span> / <span title='Total 30 karyawan'>30</span></a>
        },
    },
    {
        id: 'type',
        accessorKey: "type",
        header: "Lokasi",
        cell: ({ row: { original } }) => <span className='lowercase'>{original.type}</span>,
    },
    {
        accessorKey: "conversion factor",
        header: "Info",
        cell: ({ row: { original } }) => {
            return <div className="text-left"><span className='bg-green-200 border border-green-400 px-2 py-1 rounded text-xs'>Buka</span> - 23:00</div>
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
    const { attrs } = useDataTable({
        paginate: {
            pageIndex: 0,
            pageSize: 10
        }
    })

    const { data, isLoading, total } = useFetchDataTable<Unit>('/api/units', {
        pagination: { limit: 0 }
    })
    return (
        <DashLayout title='Store' className='pt-10'>
            <div className='container mt-8'>
                <div className='flex w-full justify-between'>
                    <div>
                        <HeaderTitle title={(
                            <>
                                <PiStorefrontDuotone className='inline mr-2' />
                                <span>Toko / Outlet</span>
                            </>
                        )} supTitle='PT Sukses Jaya Makmur' desc='Kelola dan pantau performa penjuaalan setiap toko anda.' />
                    </div>
                    <div>
                        <Link href={route('store.create')}>
                            <Button>Buat Toko</Button>
                        </Link>
                    </div>
                </div>

                <DataTable
                    {...attrs}
                    data={data}
                    total={total}
                    isLoading={isLoading}
                    setRowId={row => row.id.toString()}
                    columns={columns}
                    filters={[
                        {
                            columnId: 'type',
                            title: 'Tipe',
                            options: Array.from(new Set(data.map(d => d.type))).map(type => ({
                                label: type,
                                value: type,
                            }))
                        }
                    ]}
                    className='mt-10'
                    classNames={{
                        trHead: "bg-muted/50"
                    }}
                />
            </div>
        </DashLayout>
    )
}

