import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/Components/ui/alert-dialog";
import { Button } from "@/Components/ui/button";
import { cn, textEllipses } from "@/lib/utils";
import usePOSCartStore from "@/states/store/usePOSCartStore";
import { IconType } from "react-icons";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useRecoilState } from "recoil";
import { Dialog, dialogState, useDialog } from "../templates/Dialog";
import { BsCartX } from "react-icons/bs";
import Price from "@/Components/atoms/Price";

type ProductCardProps = {
    id: string
    currency?: string
    name: string
    unit: string
    price: number
    img: string
}

export default function ProductCard({ id, currency = 'Rp', price, name, unit, img }: ProductCardProps) {
    const { addToCart, updateQtyFromCart, removeFromCart, cart } = usePOSCartStore()
    const { dialog } = useDialog()

    const isAddedToCart = cart.has(id)
    const item = cart.get(id)

    return (
        <div className={cn("p-2 w-44 h-full rounded-xl shadow-lg border border-gray-200 bg-white relative z-0 cursor-default flex flex-col", {
            "border-primary": isAddedToCart
        })}>
            <Dialog />
            <figure >
                <img src={img} alt="product image" className="aspect-[16/11] overflow-hidden w-full object-cover rounded-lg" />
            </figure>
            <div className="pt-2 flex flex-col h-full justify-between">
                <div>
                    <p className="text-sm font-medium text-center max-h-10 text-ellipsis overflow-hidden">{textEllipses(name, 43)}</p>
                </div>
                <div>
                    <div className="text-xs py-2">
                        <Price value={price} />
                        <span className="ml-0.5">/{unit}</span>
                    </div>

                    {item ? (
                        <div className="bg-gray-100 p-1 rounded-lg">
                            <Counter value={item.qty} onChange={type => {
                                if (item.qty <= 1 && type === 'decrement') {
                                    return dialog(true, (
                                        <DialogConfirmRemove
                                            onConfirm={() => {removeFromCart(id)}}
                                        />
                                    ))
                                }
                                updateQtyFromCart(id, type)
                            }} />
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

function Counter({ value, onChange }: {
    value: number
    onChange: (type: 'increment' | 'decrement') => void
}) {
    return (
        <div className="flex items-center w-full justify-between">
            <CounterBtn Icon={FaMinus} onClick={() => onChange('decrement')} />
            <div className="text-center border-b-2 px-2 border-primary">{value}</div>
            <CounterBtn Icon={FaPlus} onClick={() => onChange('increment')} />
        </div>
    )
}

function CounterBtn({ Icon, onClick }: { Icon: IconType, onClick: () => void }) {
    return (
        <Button variant='outline' className="w-7 h-7 p-0 text-gray-800 bg-primary text-primary-foreground hover:bg-primary/80 hover:text-white" onClick={onClick}>
            <Icon />
        </Button>
    )
}

export function DialogConfirmRemove({onConfirm}: {
    onConfirm?: () => void
}) {
    const [open, setOpen] = useRecoilState(dialogState);

    return (
        <AlertDialog open={open}>
            <AlertDialogContent className="max-w-80">
                <AlertDialogHeader>
                    <BsCartX className="mx-auto text-4xl mb-3" />
                    <AlertDialogTitle className="text-center">
                        Drop from Cart?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-center">
                        drop this item from cart?
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