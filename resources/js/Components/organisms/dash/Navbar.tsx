import { sidebarState } from '@/Components/organisms/dash/Sidebar'
import { Button } from '@/Components/ui/button'
import { useRecoilState } from 'recoil'
import { GoSidebarCollapse } from "react-icons/go";
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import Hotkeys from 'react-hot-keys';

import {
    Cloud,
    CreditCard,
    LifeBuoy,
    LogOut,
    LucideProps,
    Plus,
    Settings,
    User,
    User2Icon,
    Users,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import { SearchProduct } from '../SearchProduct';
import { Link, usePage } from '@inertiajs/react';
import { PageProps } from '@/types';
import { PropsWithChildren } from 'react';
import { FaArrowDown, FaArrowTurnDown, FaChevronDown, FaPlus } from 'react-icons/fa6';
import { PiBellDuotone, PiBellRingingDuotone, PiStorefrontDuotone } from 'react-icons/pi';
import { IconType } from 'react-icons';

export default function Navbar() {
    const [open, setOpen] = useRecoilState(sidebarState)
    return (
        <div className="absolute px-3 h-12 py-2 border-b w-full mx-full z-50 bg-white flex items-center justify-between">
            <Button variant='ghost' size='icon' className='w-8 h-8' onClick={() => setOpen(v => !v)}>
                <GoSidebarCollapse className='text-xl' />
            </Button>
            <div className="text-1xl font-semibold ml-3">airPOS</div>

            <div className='-mt-10 mx-auto'>
                <SearchProduct />
            </div>

            <div className='flex gap-x-4'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className='space-x-2'><FaChevronDown /> <span>Add</span></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-10 mt-2">
                        <DropdownMenuGroup>
                            <ItemLinkAddDropdown icon={PiStorefrontDuotone} label='Toko' desc='Kelola toko dengan mudah' />
                            <ItemLinkAddDropdown icon={User2Icon} label='User' desc='buat user lain untuk membantu' />
                            <ItemLinkAddDropdown icon={User2Icon} label='User' desc='buat user lain untuk membantu' />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className='-space-x-1 relative px-2'>
                            <PiBellDuotone size={18} /> 
                            {/* <PiBellRingingDuotone size={18} className='animate-wiggle duration-700' />  */}
                            <span className='text-[9px] rounded-xl w-6 block -mt-2'>287</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-10 mt-2">
                        <DropdownMenuGroup>
                            <ItemLinkAddDropdown icon={PiStorefrontDuotone} label='Toko' desc='Kelola toko dengan mudah' />
                            <ItemLinkAddDropdown icon={User2Icon} label='User' desc='buat user lain untuk membantu' />
                            <ItemLinkAddDropdown icon={User2Icon} label='User' desc='buat user lain untuk membantu' />
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenuAccount />
            </div>
        </div>
    )
}

function ItemLinkAddDropdown(props: {
    icon: IconType|React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    label: string
    desc?: string
    href?: string
}) {
    return (
        <Link href={props.href ?? '#'}>
            <DropdownMenuItem className='items-start cursor-pointer'>
                <props.icon className="mr-2 h-4 w-4 mt-1" />
                <div className='flex flex-col -space-y-1'>
                    <span>{props.label}</span>
                    {props.desc && (<small className='text-gray-600'>{props.desc}</small>)}
                </div>
            </DropdownMenuItem>
        </Link>
    )
}

export function DropdownMenuAccount() {
    const { auth } = usePage<PageProps>().props

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className='w-9 h-9'>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 mr-4">
                <DropdownMenuLabel className='flex justify-between items-center'>
                    <div className='flex flex-col -space-y-1'>
                        <span>{auth.user.name}</span>
                        <small className='font-normal'>{auth.user.email}</small>
                    </div>
                    <span className='bg-gray-100 border border-gray-200 rounded text-xs py-0.5 px-1.5 text-gray-800 h-fit'>Free</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItemLink icon={User} children='Profil'
                        href={route('profile.edit')}
                        shortcut='Alt + P'
                    />
                    <DropdownMenuItem>
                        <CreditCard className="mr-2 h-4 w-4" />
                        <span>Billing</span>
                        <DropdownMenuShortcut>Alt + B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                        <DropdownMenuShortcut>Alt + S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Your Plans</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Users className="mr-2 h-4 w-4" />
                        <span>Log Activity</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Plus className="mr-2 h-4 w-4" />
                        <span>Your Devices</span>
                        <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LifeBuoy className="mr-2 h-4 w-4" />
                    <span>Support</span>
                </DropdownMenuItem>
                <DropdownMenuItem disabled>
                    <Cloud className="mr-2 h-4 w-4" />
                    <span>API</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

function DropdownMenuItemLink({ href, children, shortcut, icon: Icon }: PropsWithChildren<{
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    href: string
    shortcut?: string
}>) {
    return (
        <Link href={href}>
            <DropdownMenuItem>
                <Icon className="mr-2 h-4 w-4" />
                <span>{children}</span>
                {shortcut && (
                    <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                )}
            </DropdownMenuItem>
        </Link>
    )
}