import BillCard from "@/Components/organisms/cards/BillCard";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { arrFrom } from "@/lib/utils";
import CartItemCard from "@/Components/pos/organisms/CartItemCard";
import { HiOutlineTrash } from "react-icons/hi2";
import { LiaSave } from "react-icons/lia";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/Components/ui/tooltip";

export default function SideBarCart() {
    return (
        <div className="border-l min-w-[350px] px-5 py-3 relative flex flex-col pb-10 bg-white">
            <div className="flex justify-between mb-2">
                <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                        <Button variant='outline' className="w-7 h-7 p-0">
                            <LiaSave />
                        </Button>                
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Hold Transaction</p>
                    </TooltipContent>
                </Tooltip>
                <h5>Cart detail (5)</h5>

                <Tooltip delayDuration={100}>
                    <TooltipTrigger>
                        <Button variant='outline' className="w-7 h-7 p-0">
                            <HiOutlineTrash />
                        </Button>                
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Cancel Transaction</p>
                    </TooltipContent>
                </Tooltip>
            </div>

            <ScrollArea className="mb-5 pr-4 -mr-4">
                <div className="flex flex-col gap-y-2 w-full">
                    {arrFrom(15, i => (
                        <CartItemCard key={i} />
                    ))}
                </div>
            </ScrollArea>

            <BillCard details={[
                {
                    label: "Subtotal",
                    value: '12.000'
                },
                {
                    label: "Discount",
                    value: '-2.000'
                },
                {
                    label: "Tax",
                    value: '500'
                }
            ]} />

            <Button className="mx-auto bg-primary w-full">
                Continue to payment
            </Button>
        </div>
    )
}
