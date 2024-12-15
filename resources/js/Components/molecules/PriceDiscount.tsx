import Price from "@/Components/atoms/Price"

export default function PriceDiscount({value, discount, currency = 'Rp'}: {
    value: number
    discount?: number
    currency?: string
}) {
    return (
        <>
            <Price value={value} currency={currency} lineThrough={discount !== undefined} short={discount !== undefined} />
            {discount && (
                <Price value={discount} currency={currency} />
            )}
        </>
    )
}