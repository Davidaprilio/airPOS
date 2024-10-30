import { atom } from "recoil"
import { cn } from '@/lib/utils'
import { useRecoilState } from 'recoil'
import { useEffect } from "react";
import { GoHome, GoSidebarCollapse, GoSidebarExpand } from "react-icons/go";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { LuPlus } from "react-icons/lu";
import { Link } from "@inertiajs/react";
import { IconType } from "react-icons";
import { RiDiscountPercentLine, RiScales2Line } from "react-icons/ri";
import { Button } from "@/Components/ui/button";
import { ChevronsUpDownIcon } from "lucide-react";
import { PiBuildingApartmentDuotone, PiStorefrontDuotone } from "react-icons/pi";
import { AiOutlineProduct, AiTwotoneShop } from "react-icons/ai";
import { GiPowderBag } from "react-icons/gi";
import { TbPackages } from "react-icons/tb";


const getDefaultValue = (): boolean => {
    const savedOpt = localStorage.getItem('opt');
    return (savedOpt !== null ? JSON.parse(savedOpt) : { sidebarOpen: true }).sidebarOpen ?? true;
};

export const sidebarState = atom({
    key: 'sidebarState',
    default: getDefaultValue()
})

export default function Sidebar() {
    const [open, setOpen] = useRecoilState(sidebarState)

    useEffect(() => {
        localStorage.setItem('opt', JSON.stringify({ sidebarOpen: open }))
    }, [open])

    return (
        <div className={cn("border-r relative bg-gray-100 transition-all duration-200 overflow-hidden p-0 h-screen w-0 min-w-0 max-w-[250px] md:relative z-40 shadow-inner md:shadow-none", {
            "min-w-52 w-full": open
        })}>
            <div className="border-b px-3 h-12">
                <Select value="userid_1">
                    <SelectTrigger className="w-full rounded-lg h-fit border-none p-1.5 bg-gray-100" iconChild={(
                        <ChevronsUpDownIcon className="text-xs w-3.5 h-3.5" />
                    )}>
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
            </div>
            <div className="mt-5 text-sm flex flex-col gap-y-0.5 px-3">

                <MenuItem icon={GoHome} href="/dashboard" label="Home" />
                <MenuSection label="Kelola" />
                <MenuItem icon={PiStorefrontDuotone} label="Toko"
                    href={route('store.index')}
                />
                <MenuItem icon={AiOutlineProduct} label="Produk" 
                    href={route('product.index')}
                    isActive={route().current('product.*')}
                />
                <MenuItem icon={PiBuildingApartmentDuotone} href="#" label="Bisnis" />
                <MenuItem icon={GiPowderBag} href="#" label="Bahan Dasar" />
                <MenuItem icon={RiDiscountPercentLine} href="#" label="Diskon" />
                <MenuItem icon={RiScales2Line} label="Satuan Dasar" 
                    href={route('unit.list')} 
                    isActive={route().current('unit.*')}
                />
            </div>
            <div className="mt-auto absolute bottom-0 left-0 right-0 flex justify-between items-center px-5 pt-2 pb-3">
                <div className="-space-y-1">
                    <small className="text-xs">Powered by</small>
                    <h4>airPOS</h4>
                </div>

                <Button variant='ghost' size='icon' className='w-8 h-8' onClick={() => setOpen(v => !v)}>
                    <GoSidebarExpand className='text-xl' />
                </Button>
            </div>
        </div>
    )
}

function UserSelectItem() {
    return (
        <div className="flex gap-x-2 items-center">
            <img src="https://github.com/shadcn.png" alt="" className="w-6 h-6 rounded" />
            <div className="flex flex-col -space-y-1.5 text-left">
                <h4 className="mb-0">I Love Bakery</h4>
                <small className="block">Free</small>
            </div>
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
function MenuItem({ label, href, icon: Icon, isActive }: { label: string, href: string, icon: IconType, isActive?: boolean }) 
{
    isActive = isActive===undefined ? document.location.pathname === href : isActive
    return (
        <Link href={href} 
            className="flex items-center group hover:bg-gray-200 data-[active=true]:bg-gray-200 rounded px-2 py-2 gap-x-2" 
            data-active={isActive}
        >
            <Icon className="text-xl text-gray-500" />
            <span className="group-data-[active=true]:font-medium group-hover:text-gray800">{label}</span>
        </Link>
    )
}