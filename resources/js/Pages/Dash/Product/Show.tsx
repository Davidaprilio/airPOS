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
import { ChevronDownCircleIcon, ChevronsDownIcon, ChevronsUpIcon, ChevronUpCircleIcon, ChevronUpIcon } from 'lucide-react';


const FormSchema = z.object({
    name: z.string().min(1, 'required'),
    sku: z.string().min(1, 'required'),
    upc: z.coerce.number(),
    price: z.coerce.number(),
})


export default function Show() {
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
                    <NavbarTitle label="Detail Produk" />

                    <div className='flex flex-col text-gray-600 space-y-0.5'>
                        <button className='hover:bg-gray-200 active:scale-90 duration-75 rounded-full' title='next'>
                            <ChevronUpCircleIcon size={16} />
                        </button>
                        <button className='hover:bg-gray-200 active:scale-90 duration-75 rounded-full' title='previous'>
                            <ChevronDownCircleIcon size={16} />
                        </button>
                    </div>
                </div>

                <div>
                    <Button variant='outline' onClick={() => formRef.current?.requestSubmit()}>
                        <IoIosAdd className='mr-2 h-4 w-4' />
                        <span>{form.formState.isSubmitting ? 'Loading...' : 'Submit'}</span>
                    </Button>
                </div>
            </NavbarLayout>

            <TooltipProvider>
                <main className='p-5'>
                    <div onSubmit={form.handleSubmit(onSubmit)} className="w-full flex gap-x-6">
                        <div className='max-w-32'>
                            <Label>Image Product</Label>
                            <div className='w-full aspect-square border shadow-md rounded-md p-2'>

                            </div>

                            <Button className='w-full bg-gray-700 mt-4' size='sm'>Unggah Foto</Button>
                        </div>
                        <div className='w-full col-span-10 grid grid-cols-12 gap-x-2'>
                         
                        </div>
                    </div>
                </main>
            </TooltipProvider>
        </DashLayout>
    )
}


function FormInput({ field, description, info, button, label, buttonOnclick, required, ...props }: InputHTMLAttributes<{}> & {
    field: ControllerRenderProps<any>
    description?: string
    label?: string
    info?: string | JSX.Element
    button?: string | JSX.Element
    buttonOnclick?: () => void
}) {
    return (
        <FormItem className='col-span-12 md:col-span-6 lg:col-span-4 2xl:col-span-3 space-y-0.5'>
            {label && (
                <FormLabel>
                    {label}
                    {required && (<sup className='text-destructive' title='* berarti input wajib diisi'>*</sup>)}
                    {info && (
                        <Tooltip>
                            <TooltipTrigger tabIndex={-1}>
                                <PiInfo className='inline-block ml-2' />
                            </TooltipTrigger>
                            <TooltipContent className='max-w-sm font-normal' side='bottom'>
                                {typeof info === 'string' ? (<p>{info}</p>) : info}
                            </TooltipContent>
                        </Tooltip>
                    )}
                </FormLabel>
            )}
            {description && (
                <FormDescription className='!-mt-1 !mb-1'>{description}</FormDescription>
            )}
            <div className='flex'>
                <FormControl>
                    <Input {...field}
                        value={field.value ?? ''}
                        {...props}
                        className={cn({
                            'rounded-r-none': button
                        })}
                    />
                </FormControl>
                {button && (
                    <Button type='button' className='rounded-l-none border-l-0' variant='outline' onClick={buttonOnclick}>
                        {button}
                    </Button>
                )}
            </div>
            <FormMessage />
        </FormItem>
    )
}