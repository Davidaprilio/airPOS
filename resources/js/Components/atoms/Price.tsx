import { cn } from '@/lib/utils'

export default function Price({ value, currency = 'Rp', lineThrough = false}: {
    value: string
    lineThrough?: boolean
    currency?: string
}) {
    return (
        <span className={cn('font-semibold', {
            "line-through text-gray-600 font-normal": lineThrough
        })}>
            <sup className="mr-0.5">{currency}</sup>
            {value}
        </span>
    )
}
