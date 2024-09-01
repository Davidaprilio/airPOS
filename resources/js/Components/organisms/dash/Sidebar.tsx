import { atom } from "recoil"
import { cn } from '@/lib/utils'
import { useRecoilState } from 'recoil'
import { useEffect } from "react";
import { GoHome } from "react-icons/go";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { LuPlus } from "react-icons/lu";
import { Link } from "@inertiajs/react";
import { IconType } from "react-icons";
import { RiScales2Line } from "react-icons/ri";
const getDefaultValue = (): boolean => {
    const savedOpt = localStorage.getItem('opt');
    return (savedOpt !== null ? JSON.parse(savedOpt) : { sidebarOpen: true }).sidebarOpen ?? true;
};

export const sidebarState = atom({
    key: 'sidebarState',
    default: getDefaultValue()
})

export default function Sidebar() {
    const [open] = useRecoilState(sidebarState)

    useEffect(() => {
        localStorage.setItem('opt', JSON.stringify({ sidebarOpen: open }))
    }, [open])

    return (
        <div className={cn("border-r px-3 pt-16 max-w-[250px] min-w-52 w-full h-screen transition-transform", {
            "-translate-x-96 w-0 min-w-0 p-0": !open
        })}>
            <Select value="userid_1">
                <SelectTrigger className="w-full rounded-lg h-fit border p-1.5">
                    <SelectValue placeholder={(
                        <UserSelectItem />
                    )} />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem className="cursor-pointer" value="userid_1">
                        <UserSelectItem />
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="userid_2">
                        <UserSelectItem />
                    </SelectItem>
                    <SelectItem className="cursor-pointer" value="userid_3">
                        <UserSelectItem />
                    </SelectItem>
                    <SelectSeparator />
                    <SelectItem className="cursor-pointer" value="sign_new" onClick={() => {
                        alert('sign new account')
                    }}>
                        <div className="flex gap-x-2 py-1 items-center">
                            <LuPlus />
                            <p>New Busines</p>
                        </div>
                    </SelectItem>
                </SelectContent>
            </Select>
            <div className="mt-5 text-sm flex flex-col gap-y-1">

                <MenuItem icon={GoHome} href="/dashboard" label="Home" />
                <MenuSection label="Kelola" />
                <MenuItem icon={GoHome} href="#" label="Toko" />
                <MenuItem icon={GoHome} href="#" label="Produk" />
                <MenuItem icon={GoHome} href="#" label="Bahan Dasar" />
                <MenuItem icon={RiScales2Line} href={route('unit.list')} label="Satuan Dasar" />
            </div>
        </div>
    )
}

function UserSelectItem() {
    return (
        <div className="flex gap-x-2 items-center">
            <img src="https://github.com/shadcn.png" alt="" className="w-6 h-6 rounded" />
            <div>I Love Bakery</div>
        </div>
    )
}

function MenuSection({ label }: { label: string }) {
    return (
        <div className="px-2 py-1.5 font-semibold uppercase text-gray-500 mt-2 -mb-1">
            <span>{label}</span>
        </div>
    )
}
function MenuItem({ label, href, icon: Icon}: { label: string, href: string, icon: IconType }) {
    return (
        <Link href={href} className="flex items-center hover:bg-slate-100 rounded px-2 py-1.5 gap-x-2">
            <Icon className="text-xl text-gray-500" />
            <span>{label}</span>
        </Link>
    )
}