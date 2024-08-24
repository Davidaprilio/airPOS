import Price from "@/Components/atoms/Price"

export default function PriceDiscount({value, discount, currency = 'Rp'}: {
    value: string
    discount?: string
    currency?: string
}) {
    return (
        <>
            <Price value={value} currency={currency} lineThrough={discount !== undefined} />
            {discount && (
                <Price value={discount} currency={currency} />
            )}
        </>
    )
}