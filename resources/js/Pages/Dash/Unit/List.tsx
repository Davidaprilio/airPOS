import DashLayout from '@/Layouts/DashLayout'
import { PageProps } from '@/types'

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
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
import { DataTableColumnHeader } from '@/Components/molecules/tables/DataTableColumnHeader'
import useDataTable from '@/hooks/useDataTable'
import { useFetchDataTable } from '@/hooks/useFetchDataTable'
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/Components/ui/sheet'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/Components/ui/select'
import { useState } from 'react'
import { useForm } from '@inertiajs/react'
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

export default function List({ }: PageProps<{}>) {
    // const {attrs} = useDataTableApi<Unit>('/api/units')
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
        <DashLayout title="Unit">
            <div className='h-12 border-b flex items-center justify-between px-4'>
                <div>
                    <h3 className='text-xl'>Satuan Dasar</h3>
                </div>

                <div>
                    <Button className='bg-primary' size='sm'>Tambah Satuan</Button>
                    <SheetDemo />
                </div>
            </div>

            <main className='grid grid-cols-12'>
                <div className='col-span-12 lg:col-span-9 mt-2'>
                    <DataTable {...attrs}
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
                        classNames={{
                            toolbarWrapper: "px-3",
                            tableWrapper: 'border-y border-x-0 rounded-none'
                        }}
                    />
                </div>
                <div className='col-span-12  lg:col-span-3 border-l lg:h-screen p-4 text-sm'>
                    <h3 className='text-lg'>Apa itu satuan dasar?</h3>
                    <p className='mt-2'>Satuan dasar digunankan untuk mengelola stok barang yang ada di dapur/gudang/rak toko. ini sangat membantu anda yang ingin metracking stok barang tetap terjaga dan mempermudah penjualan eceran.</p>

                    <strong className='mt-3 block'>Contoh</strong> 
                    <p className='mt-2'>dalam dunia retail, pembelian stok berupa 1 dus mie instan yang berisi 24 bungkus mie, anda bisa membuat satuan dengan nama dus dengan konversi 1 dus = 24 bungkus, maka jika anda membeli 5 dus sistem akan mengelola dan memberi tahu anda berapa bungkus yang tersedia. </p>
                    <p className='mt-2'>dalam dunia FnB, pembelian minuman memiliki bahan baku, dan anda bisa menentukan bahan baku apa saja yang dipakai. setiap minuman itu dijual bahan baku akan berkurang sesuai stok. misal kopi bahan baku yang akan berkurang dalam setiap pembuatan kopi: 5g biji kopi, 2g gula pasir, dll. </p>
                </div>
            </main>
        </DashLayout>
    )
}

export function SheetDemo() {
    const [valueTest, setValueTest] = useState(0)
    const { data, setData } = useForm<{
        name: string
        symbol: string
        type: string
        conversion?: number
    }>({
        name: '',
        symbol: '',
        type: '',
        conversion: undefined,
    })
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline">Open</Button>
            </SheetTrigger>
            <SheetContent className='h-[calc(100vh-16px)] mt-2 right-2 rounded-md p-4'>
                <SheetHeader>
                    <SheetTitle>Tambah Satuan Dasar</SheetTitle>
                    <SheetDescription>
                        Buat satuaan kustom kamu sendiri dan pastikan nilai konversi benar
                    </SheetDescription>
                </SheetHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Tipe
                        </Label>
                        <div className="col-span-3">
                            <Select defaultValue='mass' onValueChange={v => setData('type', v)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a type" className='w-full' />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="mass">mass</SelectItem>
                                    <SelectItem value="volume">volume</SelectItem>
                                    <SelectItem value="length">length</SelectItem>
                                    <SelectItem value="piece">piece</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name">
                            Nama
                        </Label>
                        <Input id="name" className="col-span-3" placeholder='eg. gram' onChange={e => setData('name', e.currentTarget.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="symbol">
                            Simbol
                        </Label>
                        <Input id="symbol" className="col-span-3" placeholder='eg. g' onChange={e => setData('symbol', e.currentTarget.value)} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="convertion" className='mb-5'>
                            Faktor Konversi
                        </Label>
                        <div className="col-span-3" >
                            <Input id="convertion" placeholder='1.0' type='number'
                                value={data.conversion}
                                onChange={e => setData('conversion', e.currentTarget.valueAsNumber)}
                            />
                            <small className='text-gray-600'>konversi terhadap 1 gram</small>
                        </div>
                    </div>
                </div>

                <hr className='mt-6 mb-3' />

                <h4 className='text-md mb-2'>Uji coba konversi</h4>
                <div className='border rounded-md px-4'>

                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="convertion" className='mb-5'>
                                Nilai
                            </Label>
                            <div className="col-span-3" >
                                <Input id="convertion" placeholder='1.0' type='number' value={valueTest} onChange={e => setValueTest(e.currentTarget.valueAsNumber)} />
                                <small className='text-gray-600'>konversi terhadap 1 gram</small>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name">
                                Tujuan
                            </Label>
                            <div className="col-span-3">
                                <Select defaultValue='gram'>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select a type" className='w-full' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gram">gram</SelectItem>
                                        <SelectItem value="miligram">miligram</SelectItem>
                                        <SelectItem value="kilogram">kilogram</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div>
                            Hasil konversi dari {valueTest} {data.name} ({data.symbol}) = 1 gram
                        </div>
                    </div>

                </div>

                <hr className='my-6' />

                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className='w-full'>Simpan</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
