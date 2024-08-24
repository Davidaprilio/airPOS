import { cn } from '@/lib/utils'

type BillItem = {
    label: string
    value: string
}

type BillCardProps = {
    details: BillItem[]
}

export default function BillCard({details}: BillCardProps) {
    return (
        <div className="bg-secondary p-4 rounded-xl my-6 relative mt-auto">
            <div className="bg-white rounded-full w-7 h-7 absolute bottom-11 -left-3.5"></div>
            <div className="bg-white rounded-full w-7 h-7 absolute bottom-11 -right-3.5"></div>
            {details.map((detail, i) => (
                <BillRow key={i} 
                    label={detail.label} 
                    value={detail.value} 
                />
            ))}
            <hr className="my-3 border-dashed border-b-2 border-0" />
            <BillRow label="Total" value="70.500" className="text-lg" />
        </div>
    )
}

function BillRow({ label, value, className }: { 
    label: string
    value: string
    className?: string 
}) {
    return (
        <div className="flex justify-between text-primary">
            <strong className={cn("text-sm", className)}>{label}</strong>
            <span><sup className="mr-1">Rp</sup>{value}</span>
        </div>
    )
}
