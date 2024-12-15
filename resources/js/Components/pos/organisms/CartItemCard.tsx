import CounterBtn from "@/Components/atoms/CounterBtn";
import PriceDiscount from "@/Components/molecules/PriceDiscount";
import { productMap } from "@/states/store/dataPOS";
import usePOSCartStore, { POSCartStore } from "@/states/store/usePOSCartStore";

type CartItemCardProps = {
    item: POSCartStore
}

export default function CartItemCard({item}: CartItemCardProps) {
    const product = productMap.get(item.productId)!
    const classSize = "text-dark bg-transparent border-0"

    const { updateQtyFromCart } = usePOSCartStore()

    return (
        <div className="flex items-center w-full rounded-xl border p-2 cursor-pointer select-none">
            <img src={product.img} alt="product image"className="w-11 h-11 squ rounded-lg object-cover border shadow-sm"  />

            <div className="ml-2 w-full flex flex-col relative">
                <p className="text-ellipsis w-full text-sm mb-1 line-clamp-1">{product.name}</p>
                <div className="flex justify-between items-end w-full">
                    <small>
                        <strong>
                            <PriceDiscount value={product.price} discount={product.discount} />
                        </strong>
                        <span className="pl-1">x{item.qty}</span>
                    </small>
                    <div>
                        <CounterBtn 
                            className={classSize} 
                            Icon='min' 
                            onClick={() => updateQtyFromCart(item.productId, 'decrement')} 
                        />
                        <CounterBtn 
                            className={classSize} 
                            Icon='plus' 
                            onClick={() => updateQtyFromCart(item.productId, 'increment')} 
                        />
                    </div>
                </div>
            </div>

        </div>
    )
}
