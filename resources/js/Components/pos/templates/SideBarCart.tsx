import BillCard from "@/Components/organisms/cards/BillCard";
import { Button } from "@/Components/ui/button";
import { ScrollArea } from "@/Components/ui/scroll-area";
import { arrFrom } from "@/lib/utils";
import CartItemCard from "@/Components/pos/organisms/CartItemCard";

export default function SideBarCart() {
    return (
        <div className="border-l min-w-[350px] px-5 py-3 relative flex flex-col pb-10 bg-white">
            <div className="flex justify-between mb-2">
                <h5>Cart</h5>
                <small>5 Items</small>                
            </div>

            <ScrollArea className="mb-5 pr-4 -mr-2">
                <div className="flex flex-col gap-y-2">
                    {arrFrom(5, i => (
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
