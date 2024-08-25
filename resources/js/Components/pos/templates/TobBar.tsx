import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { RiArrowDownWideLine } from "react-icons/ri";
import MenuTobBar from "../atoms/MenuTopBar";
import { SearchProduct } from "@/Components/organisms/SearchProduct";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { IoIosHelpCircleOutline } from "react-icons/io";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/Components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { LuUserPlus } from "react-icons/lu";

export function TopBar() {
    return (
        <div className="border-b border-gray-300 bg-white shadow-sm px-3 py-1 w-full flex justify-center items-center gap-x-3 fixed z-50">
            <div className="flex gap-x-3">
                <Sidebar />

                <SearchProduct />

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

            <Button variant='outline' className="h-7 px-2">
                <IoIosHelpCircleOutline className="mr-1" />
                <span>Help</span>
            </Button>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

function Sidebar() {
    return (
        <Sheet>
            <SheetTrigger>
                <Button size='icon' variant='outline' className="p-0">
                    <TbLayoutSidebarLeftExpand className="text-2xl m-1" />
                </Button>
            </SheetTrigger>
            <SheetContent side='left' className="p-0">
                <SheetHeader className="pt-2 px-4">
                    <SheetTitle className="font-bold">airPOS</SheetTitle>
                </SheetHeader>
                <div className="h-">

                </div>
                <SheetFooter className="absolute bottom-0 py-3 px-3 w-full">
                    <Select value="userid_1">
                        <SelectTrigger className="w-full rounded-2xl h-fit bg-gray-300" iconDirection="top">
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
                                <div className="flex gap-x-2 py-1">
                                    <LuUserPlus />
                                    <p>Sign in new account</p>
                                </div>
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}

function UserSelectItem() {
    return (
        <div className="flex gap-x-2">
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-start">
                <strong>David Aprilio</strong>
                <span>cashier</span>
            </div>
        </div>
    )
}