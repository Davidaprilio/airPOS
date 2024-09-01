import Navbar from "@/Components/organisms/dash/Navbar"
import Sidebar, { sidebarState } from "@/Components/organisms/dash/Sidebar"
import { stateOpenSearchBar } from "@/Components/organisms/SearchProduct";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { cn } from "@/lib/utils";
import { Head, router } from "@inertiajs/react";
import { PropsWithChildren } from "react"
import Hotkeys from 'react-hot-keys';
import { useRecoilState } from "recoil";

type DashLayoutProps = PropsWithChildren<{
    title?: string
}>

export default function DashLayout({children, title}: DashLayoutProps) {
    const [isOpenSearchBar, setOpenSearchBar] = useRecoilState(stateOpenSearchBar)
    const [isSidebarOpen] = useRecoilState(sidebarState)

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
            
            <Hotkeys keyName='alt+/' onKeyDown={() => setOpenSearchBar(true)}/>
            <Hotkeys keyName='esc' onKeyDown={() => isOpenSearchBar && setOpenSearchBar(false)}/>

            <Head title={title ?? 'Dashboard'} />

            <Navbar />
            <div className="min-h-screen flex md:justify-between">
                <Sidebar />
                <div className={cn("pt-12 overflow-hidden md:transition-all md:duration-300 md:ease-in-out w-full md:w-11/12", {
                    'w-full md:w-full': !isSidebarOpen
                })}>
                    <ScrollArea className="h-[calc(100vh-50px)] w-full px-5">
                        <main className="max-w-screen-2xl mx-auto pt-4 px-2 mb-10">
                            {children}
                        </main>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>
        </>
    )
}
