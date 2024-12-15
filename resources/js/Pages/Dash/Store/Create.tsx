import HeaderTitle from "@/Components/atoms/dash/HeaderTitle";
import FormInputField from "@/Components/organisms/forms/FormInputField";
import { Button } from "@/Components/ui/button";
import { Form, FormField } from "@/Components/ui/form";
import DashLayout from "@/Layouts/DashLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


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

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        console.log(data);
        
    }

    return (
        <DashLayout title='Store' className='pt-10'>
            <div className='container mt-8'>
                <div className='flex w-full justify-between'>
                    <div>
                        <HeaderTitle
                            title='Buat Toko'
                            supTitle='PT Sukses Jaya Makmur'
                            desc='Tambahkan data toko anda dan permudah untuk kelola dan pantau toko.'
                        />
                    </div>
                    <div>
                        <Button>Buat Toko</Button>
                    </div>
                </div>

                <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="mt-10 grid grid-cols-10 gap-5 bg-neutral-50 border rounded-lg p-5">
                        <FormField control={form.control} name="name" render={({ field }) => (
                            <FormInputField field={field}
                                label='Nama'
                                placeholder='Nama Toko'
                                autoComplete="store_name"
                                required
                            />
                        )}/>
                        

                        <div className="col-span-full">
                            <h2>Informasi tambahan</h2>
                            <hr />
                        </div>

                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormInputField field={field}
                                label='Biaya Oprasional'
                                placeholder='Alamat Toko'
                            />
                        )}/>

                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormInputField field={field}
                                label='Jam oprasional'
                                placeholder=''
                            />
                        )}/>

                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormInputField field={field}
                                label='Alamat'
                                placeholder='Alamat Toko'
                            />
                        )}/>

                    </div>
                </Form>
            </div>
        </DashLayout>
    )
}
