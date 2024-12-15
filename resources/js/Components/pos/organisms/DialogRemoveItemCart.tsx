import usePOSCartStore from "@/states/store/usePOSCartStore"
import { useDialog } from "@/Components/pos/templates/Dialog"
import { DialogConfirmRemove } from "./ProductCard"
import { useEffect } from "react"
import { products } from "@/states/store/dataPOS"

export default function DialogRemoveItemCart() {
    const { dialog } = useDialog()

    const { lastEditedItem, cart, removeFromCart } = usePOSCartStore()

    useEffect(() => {
        const [id, newQty] = lastEditedItem
        if (id) {
            const item = cart.get(id)
            if (item !== undefined && newQty < 1) {
                const product = products.find(a => a.id === item.productId)
                return dialog(true, (
                    <DialogConfirmRemove 
                        description={`drop item ${product?.name}`}
                        onConfirm={() => {removeFromCart(item.productId)}} 
                    />
                ))
            }

        }
    }, [cart, lastEditedItem])

    return <></>
}