import NavbarTitle from '@/Components/atoms/dash/NavbarTitle'
import NavbarLayout from '@/Components/molecules/dash/NavbarLayout'
import DashLayout from '@/Layouts/DashLayout'
import { MdKeyboardBackspace } from "react-icons/md";
import { Link } from '@inertiajs/react'
import { Button } from '@/Components/ui/button';
import { IoIosAdd } from 'react-icons/io';
import { Input } from '@/Components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/Components/ui/form';
import { z } from 'zod'
import { ControllerRenderProps, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { InputHTMLAttributes, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { PiInfo } from 'react-icons/pi';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/Components/ui/tooltip';
import { Label } from "@/Components/ui/label"
import BarcodeReader from 'react-barcode-reader'
import { FaAutoprefixer } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import FormInputField from '@/Components/organisms/forms/FormInputField';


const FormSchema = z.object({
    name: z.string().min(1, 'required'),
    sku: z.string().min(1, 'required'),
    upc: z.coerce.number(),
    price: z.coerce.number(),
})


export default function Create() {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        // defaultValues: {
        //     name: "",
        //     sku: "",
        //     upc: "",
        //     price: ''
        // },
    })
    const formRef = useRef<HTMLFormElement>(null)

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            const res = await axios.post(route('api.product.create'), data)
            console.log(res.data);

        } catch (error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 422) {
                    toast.error(error.response?.data.msg)
                } else if (error.response?.status === 500) {
                    toast.error("Opps, Internal Server Error")
                } else {
                    toast.error("Unhandled Error Request")
                }
            }
        }
    }

    return (
        <DashLayout>
            <NavbarLayout>
                <div className='flex items-center gap-x-2'>
                    <Link href={route('product.index')}>
                        <Button size='icon' variant='ghost' className='w-8 h-8'>
                            <MdKeyboardBackspace className='text-lg' />
                        </Button>
                    </Link>
                    <NavbarTitle label="Buat Produk" />
                </div>

                <div>
                    <Button variant='outline' onClick={() => formRef.current?.requestSubmit()}>
                        <IoIosAdd className='mr-2 h-4 w-4' />
                        <span>{form.formState.isSubmitting ? 'Loading...' : 'Submit'}</span>
                    </Button>
                </div>
            </NavbarLayout>

            <main className='p-5'>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} ref={formRef} className="w-full flex gap-x-6">
                        <div className='max-w-32'>
                            <Label>Image Product</Label>
                            <div className='w-full aspect-square border shadow-md rounded-md p-2'>

                            </div>

                            <Button className='w-full bg-gray-700 mt-4' size='sm'>Unggah Foto</Button>
                        </div>
                        <div className='w-full col-span-10 grid grid-cols-12 gap-x-2'>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormInputField field={field} label='Nama' placeholder='Masukan nama produk' required />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="sku"
                                render={({ field }) => (
                                    <FormInputField 
                                        field={field} 
                                        label='SKU' 
                                        placeholder='Kode SKU' 
                                        required
                                        buttonOnclick={() => {
                                            form.setValue('sku', Math.random().toString())
                                        }}
                                        button={(
                                            <FaAutoprefixer title='Auto Generateg' className='text-lg -mx-1' />
                                        )}
                                        info='SKU Kode adalah kode kustom yang ada dibuat oleh retail untuk mengelola bahan dan traking barang'
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="upc"
                                render={({ field }) => (
                                    <FormInputField field={field} label='UPC'
                                        type='number'
                                        placeholder='Kode UPC'
                                        info={(
                                            <div>
                                                <p>UPC Kode adalah barcode yang biasa ditemukan di produk</p>
                                                <p className='mt-2'>Gunakan scanner untuk autoinput kode UPC</p>
                                            </div>
                                        )}
                                    />
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="price"
                                rules={{
                                    onChange: e => console.log(e)
                                }}
                                render={({ field }) => (
                                    <FormInputField field={field} label='Harga' placeholder='Harga produk' type='number' />
                                )}
                            />
                        </div>
                    </form>

                    <BarcodeReader
                        onError={(barcode, msg) => {
                            console.error(barcode, msg);
                        }}
                        onScan={(barcode) => {
                            form.setValue('upc', Number(barcode))
                        }}
                    />
                </Form>
            </main>
        </DashLayout>
    )
}
