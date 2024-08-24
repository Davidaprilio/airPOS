import Price from "@/Components/atoms/Price";
import PriceDiscount from "@/Components/molecules/PriceDiscount";

export default function CartItemCard() {
    return (
        <div className="flex items-center w-full rounded-xl border p-2 cursor-pointer">
            <figure className="rounded-lg overflow-hidden aspect-square w-14">
                <img src="https://via.placeholder.com/100" alt="product image" />
            </figure>

            <div className="ml-2 w-full flex flex-col relative">
                <p className="text-ellipsis w-full text-sm mb-1">Lorem ipsum dolor</p>
                <div className="flex justify-between items-end w-full">
                    <small>
                        <strong>
                            <PriceDiscount value="10.000" discount='9.000' />
                        </strong>
                        <span className="pl-1">x1</span>
                    </small>
                    <small>
                        <Price value="9.000" />
                    </small>
                </div>
            </div>

        </div>
    )
}
