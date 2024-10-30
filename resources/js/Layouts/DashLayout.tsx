import Navbar from "@/Components/organisms/dash/Navbar";
import Sidebar, { sidebarState } from "@/Components/organisms/dash/Sidebar"
import { stateOpenSearchBar } from "@/Components/organisms/SearchProduct";
import { ScrollArea, ScrollBar } from "@/Components/ui/scroll-area"
import { Toaster } from "@/Components/ui/sonner";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { Head, router } from "@inertiajs/react";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import { PropsWithChildren, useEffect } from "react"
import Hotkeys from 'react-hot-keys';
import { useRecoilState } from "recoil";

type DashLayoutProps = PropsWithChildren<{
    title?: string
    withNav?: boolean
    className?: string
}>

export default function DashLayout({ children, title, withNav = true, className }: DashLayoutProps) {
    const [isOpenSearchBar, setOpenSearchBar] = useRecoilState(stateOpenSearchBar)
    const [isSidebarOpen, setSidebarOpen] = useRecoilState(sidebarState)
    const { theme } = useTheme()

    useEffect(() => {
        let open = isOpenSearchBar
        const handler = function (event: MouseEvent) {
            const threshold = 7; // Misalnya, 50px dari sisi kiri
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

            <TooltipProvider>
                <div className="min-h-screen flex md:justify-between">
                    <Sidebar />
                    <div className={cn("overflow-hidden md:transition-all md:duration-300 md:ease-in-out w-full md:w-11/12 relative", {
                        'w-full md:w-full': !isSidebarOpen
                    })}>
                        {withNav && (<Navbar />)}
                        <ScrollArea className="h-screen w-full relative">
                            <main className={cn("w-full mx-auto mb-10", {
                                "pt-2.5": withNav,
                                [`${className}`]: true
                            })}>
                                {children}
                            </main>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
                </div>
            </TooltipProvider>

            <Toaster richColors position="top-center" theme={theme} />
        </>
    )
}
