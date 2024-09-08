import Sidebar, { sidebarState } from "@/Components/organisms/dash/Sidebar"
import { stateOpenSearchBar } from "@/Components/organisms/SearchProduct";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Toaster } from "@/Components/ui/sonner";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Head, router } from "@inertiajs/react";
import { PropsWithChildren, useEffect } from "react"
import Hotkeys from 'react-hot-keys';
import { useRecoilState } from "recoil";

type DashLayoutProps = PropsWithChildren<{
    title?: string
}>

export default function DashLayout({ children, title }: DashLayoutProps) {
    const [isOpenSearchBar, setOpenSearchBar] = useRecoilState(stateOpenSearchBar)
    const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarState)
    const { theme } = useTheme()

    useEffect(() => {
        let open = isOpenSearchBar
        const handler = function (event: MouseEvent) {
            const threshold = 10; // Misalnya, 50px dari sisi kiri
            if (open === false && event.clientX <= threshold) {
                console.log('Mouse berada di sisi kiri browser!');
                // Tambahkan event atau logika lain di sini
                setSidebarOpen(true)
                open = true
            }
        }
        document.addEventListener('mousemove', handler);

        // return document.removeEventListener('mousemove', handler)
    }, [isSidebarOpen])

    return (
        <>
            <Hotkeys keyName='alt+p' onKeyDown={() => {
                router.visit(route('profile.edit'))
            }} />

            <Hotkeys keyName='alt+b' onKeyDown={() => {
                console.log('go to billing');
            }} />

            <Hotkeys keyName='alt+s' onKeyDown={() => {
                console.log('go to setting');
            }} />

            <Hotkeys keyName='alt+/' onKeyDown={() => setOpenSearchBar(true)} />
            <Hotkeys keyName='esc' onKeyDown={() => isOpenSearchBar && setOpenSearchBar(false)} />

            <Head title={title ?? 'Dashboard'} />

            <div className="min-h-screen flex md:justify-between">
                <Sidebar />
                <div className={cn("overflow-hidden md:transition-all md:duration-300 md:ease-in-out w-full md:w-11/12", {
                    'w-full md:w-full': !isSidebarOpen
                })}>
                    <ScrollArea className="h-screen w-full relative">
                        <main className="w-full mx-auto mb-10">
                            {children}
                        </main>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </div>

            <Toaster richColors position="top-center" theme={theme} />
        </>
    )
}
