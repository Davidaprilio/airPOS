import Price from "@/Components/atoms/Price";
import PriceDiscount from "@/Components/molecules/PriceDiscount";
import { textEllipses } from "@/lib/utils";
import { productMap } from "@/states/store/dataPOS";
import { POSCartStore } from "@/states/store/usePOSCartStore";

type CartItemCardProps = {
    item: POSCartStore
}

export default function CartItemCard({item}: CartItemCardProps) {

    const product = productMap.get(item.productId)!

    return (
        <div className="flex items-center w-full rounded-xl border p-2 cursor-pointer">
            <img src={product.img} alt="product image"className="w-11 h-11 squ rounded-lg object-cover border shadow-sm"  />

            <div className="ml-2 w-full flex flex-col relative">
                <p className="text-ellipsis w-full text-sm mb-1">{textEllipses(product.name, 35)}</p>
                <div className="flex justify-between items-end w-full">
                    <small>
                        <strong>
                            <PriceDiscount value={product.price} discount={product.discount} />
                        </strong>
                        <span className="pl-1">x{item.qty}</span>
                    </small>
                    <small>
                        <Price value={((product.discount ?? product.price) * item.qty)} />
                    </small>
                </div>
            </div>

        </div>
    )
}
