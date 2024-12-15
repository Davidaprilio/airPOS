import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { cn } from "@/lib/utils";
import usePOSCartStore from "@/states/store/usePOSCartStore";
import { useRecoilState } from "recoil";
import { Dialog, dialogState } from "../templates/Dialog";
import { BsCartX } from "react-icons/bs";
import Price from "@/Components/atoms/Price";
import Counter from "@/Components/organisms/forms/Counter";

type ProductCardProps = {
    id: string
    currency?: string
    name: string
    unit: string
    price: number
    img: string
}

export default function ProductCard({ id, currency = 'Rp', price, name, unit, img }: ProductCardProps) {
    const { addToCart, updateQtyFromCart, cart } = usePOSCartStore()

    const isAddedToCart = cart.has(id)
    const item = cart.get(id)

    return (
        <div className={cn("p-2 min-w-44 h-full rounded-xl shadow-lg border border-gray-200 bg-white relative z-0 cursor-default flex flex-col", {
            "border-primary": isAddedToCart
        })}>
            <Dialog />
            <figure >
                <img src={img} alt="product image" className="aspect-[16/11] overflow-hidden w-full object-cover rounded-lg" />
            </figure>
            <div className="pt-2 flex flex-col h-full justify-between">
                <div>
                    <p className="text-sm font-medium text-center max-h-10 max-w-max text-ellipsis line-clamp-2 overflow-hidden">{name}</p>
                </div>
                <div>
                    <div className="text-xs py-2">
                        <Price value={price} />
                        <span className="ml-0.5">/{unit}</span>
                    </div>

                    {item ? (
                        <div className="bg-gray-100 p-1 rounded-lg">
                            <Counter value={item.qty} onChange={type => {updateQtyFromCart(id, type)}} />
                        </div>
                    ) : (
                        <Button
                            className="h-7 w-full bg-primary"
                            onClick={() => { addToCart(id) }}
                        >
                            Add to cart
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}

export function DialogConfirmRemove({onConfirm, title, description}: {
    title?: string
    description?: string
    onConfirm?: () => void
}) {
    const [open, setOpen] = useRecoilState(dialogState);

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="max-w-80">
                <AlertDialogHeader>
                    <BsCartX className="mx-auto text-4xl mb-3" />
                    <AlertDialogTitle className="text-center">
                        {title ?? 'Drop from Cart?'}
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        {description??'drop this item from cart?'}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="justify-center sm:justify-center">
                    <AlertDialogCancel className="w-1/2" onClick={() => {
                        setOpen(false)
                    }}>Cancel</AlertDialogCancel>
                    <AlertDialogAction className="w-1/2" onClick={() => {
                        setOpen(false)
                        onConfirm && onConfirm()
                    }}>Drop</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}