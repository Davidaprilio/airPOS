import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import { Button } from "@/Components/ui/button";
import { RiArrowDownWideLine } from "react-icons/ri";
import MenuTobBar from "../atoms/MenuTopBar";
import { SearchProduct } from "@/Components/organisms/SearchProduct";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";

export function TopBar() {
    return (
        <div className="border-b border-gray-300 bg-white shadow-sm px-3 py-1 w-full flex justify-center items-center gap-x-3 fixed z-50">
            <div className="flex gap-x-3">
                <Button size='icon' variant='outline' className="p-0">
                    <TbLayoutSidebarLeftExpand className="text-2xl m-1" />
                </Button>

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
            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}