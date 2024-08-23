import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar"
import { TbLayoutSidebarLeftExpand } from "react-icons/tb"


import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
} from "lucide-react"

import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/Components/ui/command"
import { Button } from "@/Components/ui/button"
import { useEffect, useState } from "react"
import { arrFrom, cn } from "@/lib/utils"
import { RiArrowDownWideLine } from "react-icons/ri"
import { FaMinus, FaPlus } from "react-icons/fa6"
import { IconType } from "react-icons"
import { ScrollArea } from "@/Components/ui/scroll-area"


export default function Main() {
    return (
        <div className="relative h-screen">
            <TopBar />
            <div className="flex h-full pt-12">
                <div className="w-full">
                    e
                </div>
                <SidebarCart />
            </div>
        </div>
    )
}



function TopBar() {
    return (
        <div className="border-b border-gray-300 bg-white shadow-sm px-3 py-1 w-full flex justify-center items-center gap-x-3 fixed">
            <div className="flex gap-x-3">
                <Button size='icon' variant='outline' className="p-0">
                    <TbLayoutSidebarLeftExpand className="text-2xl m-1" />
                </Button>

                <CommandDemo />
            
                <div className="flex items-center gap-x-2 cursor-pointer">
                    <div>
                        <RiArrowDownWideLine />
                    </div>
                    <MenuTobBar label="customer" text="Walk Customer" />
                </div>

                <div className="flex items-center gap-x-2 cursor-pointer">
                    <MenuTobBar label="hold" text="Transaction" />
                </div>
            </div>

            <div className="w-full"></div>
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

function MenuTobBar({label, text}: {label: string, text: string}) {
    return (
        <div className="flex flex-col text-nowrap">
            <div className="-mb-2 text-sm text-gray-600 font-medium">{label}</div>
            <strong className="text-gray-700">{text}</strong>
        </div>
    )
}

function SumaryInfoText({label, value, className}: {label: string, value: string, className?: string}) {
    return (
        <div className="flex justify-between text-primary">
            <strong className={cn("text-sm", className)}>{label}</strong>
            <span><sup className="mr-1">Rp</sup>{value}</span>
        </div>
    )
}

function SidebarCart() {
    return (
        <div className="border-l min-w-[350px] px-5 py-3 relative flex flex-col pb-10">
            <ScrollArea className="mb-5 pr-4 -mr-2">
                <div className="flex flex-col gap-y-2">
                    {arrFrom(15, i => (
                        <CartItem  key={i} />
                    ))}
                </div>
            </ScrollArea>

            <div className="bg-secondary p-4 rounded-xl my-6 relative mt-auto">
                <div className="bg-white rounded-full w-7 h-7 absolute bottom-11 -left-3.5"></div>
                <div className="bg-white rounded-full w-7 h-7 absolute bottom-11 -right-3.5"></div>
                <SumaryInfoText label="Total" value="75.000" />
                <SumaryInfoText label="Discount" value="-5.000" />
                <SumaryInfoText label="Tax" value="500" />
                <hr className="my-3 border-dashed border-b-2 border-0" />
                <SumaryInfoText label="Total" value="70.500" className="text-lg" />
            </div>

            <Button className="mx-auto bg-primary w-full">
                Continue to payment
            </Button>
        </div>
    )
}

function CommandDemo() {
    const [open, setOpen] = useState(false)
    return (
        <div className="relative md:min-w-[450px]">
            <Command 
                onBlur={() => {setOpen(false)}}
                onFocus={() => {setOpen(true)}}
                className={cn("rounded-lg border w-full absolute h-fit", {
                    'shadow-md': open
                })}
            >
                <CommandInput placeholder="Search name or serial number ..." className="h-[2.4rem]" />
                {open && (
                    <CommandList className="border-t w-full bottom-10 bg-white ">
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup heading="Suggestions">
                            <CommandItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Calendar</span>
                            </CommandItem>
                            <CommandItem>
                                <Smile className="mr-2 h-4 w-4" />
                                <span>Search Emoji</span>
                            </CommandItem>
                            <CommandItem disabled>
                                <Calculator className="mr-2 h-4 w-4" />
                                <span>Calculator</span>
                            </CommandItem>
                        </CommandGroup>
                        <CommandSeparator />
                        <CommandGroup heading="Settings">
                            <CommandItem>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                                <CommandShortcut>⌘P</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <CreditCard className="mr-2 h-4 w-4" />
                                <span>Billing</span>
                                <CommandShortcut>⌘B</CommandShortcut>
                            </CommandItem>
                            <CommandItem>
                                <Settings className="mr-2 h-4 w-4" />
                                <span>Settings</span>
                                <CommandShortcut>⌘S</CommandShortcut>
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                )}
            </Command>
        </div>
    )
}


function CartItem() {
    return (
        <div className="flex items-center w-full">
            <figure className="rounded-xl overflow-hidden aspect-square w-16">
                <img src="https://via.placeholder.com/100" alt="product image" />
            </figure>

            <div className="ml-2 w-full">
                <h5>Lorem ipsum dolor sit amet</h5>
                <div className="flex justify-between items-end w-full">
                    <small><sup>Rp</sup> 10.000</small>
                    <Counter />
                </div>
            </div>

        </div>
    )
}

function Counter() {
    const [count, setCount] = useState(1)
    return (
        <div className="flex items-center">
            <CounterBtn Icon={FaPlus} onClick={() => setCount(v => v+1)} />
            <div className="w-10 text-center">{count}</div>
            <CounterBtn Icon={FaMinus} onClick={() => setCount(v => Math.max(0, v-1))} />
        </div>
    )
}

function CounterBtn({Icon, onClick}: {Icon: IconType, onClick: () => void }) {
    return (
        <Button variant='outline' className="w-7 h-7 p-0 text-gray-800" onClick={onClick}>
            <Icon />
        </Button>   
    )
}