import { cn, numberSparator, shortNum } from '@/lib/utils'

export default function Price({ value, currency = 'Rp', lineThrough = false, short = false}: {
    value: number
    lineThrough?: boolean
    currency?: string
    short?: boolean
}) {
    return (
        <span className={cn('font-semibold', {
            "line-through text-gray-600 font-normal": lineThrough
        })}>
            <sup className="mr-0.5">{currency}</sup>
            {short ? shortNum(value) : numberSparator(value)}
        </span>
    )
}
