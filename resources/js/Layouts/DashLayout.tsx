import Navbar from "@/Components/organisms/dash/Navbar"
import Sidebar from "@/Components/organisms/dash/Sidebar"
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Head, router } from "@inertiajs/react";
import { PropsWithChildren } from "react"
import Hotkeys from 'react-hot-keys';

type DashLayoutProps = PropsWithChildren<{
    title?: string
}>

export default function DashLayout({children, title}: DashLayoutProps) {

    return (
        <>
            <Hotkeys keyName='alt+p' onKeyDown={() => {
                router.visit(route('profile.edit'))
            }}/>

            <Hotkeys keyName='alt+b' onKeyDown={() => {
                console.log('go to billing');
            }}/>

            <Hotkeys keyName='alt+s' onKeyDown={() => {
                console.log('go to setting');
            }}/>

            <Head title={title ?? 'Dashboard'} />

            <Navbar />
            <div className="min-h-screen flex">
                <Sidebar />
                <div className="pt-12 w-full overflow-hidden">
                    <ScrollArea className="h-[calc(100vh-50px)] w-full px-5">
                        <main className="max-w-screen-2xl mx-auto pt-4 px-2">
                            {children}
                        </main>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}
